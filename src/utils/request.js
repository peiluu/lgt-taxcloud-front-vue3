import axios from "axios";
// import qs from "qs";
import { ElMessage, ElMessageBox, ElLoading } from "element-plus";
import store from "../store";
import cookies from "@/utils/cookies";
import { baseURL } from "@/config";

// 创建axios实例

let loading = null;
const service = axios.create({
  baseURL, // api的base_url
  timeout: 60000, // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json; charset=utf-8";
    // if (config.method === 'get' || config.method === 'post') {
    // 	config.data = qs.stringify({
    // 		...config.data,
    // 	});
    // }
    // 加载接口时显示loading
    if (!config.hideLoading) {
      loading = ElLoading.service({
        lock: true,
        // text: "Loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
    }

    // 在请求发送之前做一些处理
    if (!/^https:\/\/|http:\/\//.test(config.url)) {
      const token = cookies.get("token");
      if (token && token !== "undefined") {
        // 让每个请求携带token-- ['Authorization']为自定义key 请根据实际情况自行修改
        config.headers["Authorization"] = "Bearer " + token;
      }
    }
    return config;
  },
  (error) => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// respone拦截器
service.interceptors.response.use(
  (response) => {
    if (loading) {
      setTimeout(() => {
        loading.close();
      }, 1000);
    }

    /**
     * statusCode为非200是抛错 可结合自己业务进行修改
     */
    const res = response.data;
    if (res.statusCode !== 200) {
      ElMessage({
        message: res.message,
        type: "error",
        duration: 5 * 1000,
      });

      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (
        res.statusCode === 50008 ||
        res.statusCode === 50012 ||
        res.statusCode === 50014
      ) {
        ElMessageBox.confirm(
          "你已被登出，可以取消继续留在该页面，或者重新登录",
          "确定登出",
          {
            confirmButtonText: "重新登录",
            cancelButtonText: "取消",
            type: "warning",
          }
        ).then(() => {
          store.dispatch("FedLogOut").then(() => {
            location.reload(); // 为了重新实例化vue-router对象 避免bug
          });
        });
      }
      return Promise.reject("error");
    } else {
      return response.data.data;
    }
  },
  (error) => {
    loading.close();
    console.log("err" + error); // for debug
    ElMessage({
      message: error.message,
      type: "error",
      duration: 5 * 1000,
    });
    // token错误或者token过期，退出返回首页，清除token信息
    if (error.response.status === 401) {
      window.location.replace('#/login')
      cookies.remove("token");
    }
    
    return Promise.reject(error);
  }
);

export default service;
