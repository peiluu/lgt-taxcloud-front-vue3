import request from "@/utils/request";

// 查询记账凭证
export function page(obj) {
  return fetch({
    url: "/api/tax/taxsby/findAccountVoucher",
    method: "post",
    data: obj,
  });
}

// 录入记账凭证
export function addObj(obj) {
  return fetch({
    url: "/api/tax/taxsby/addAccountVoucher",
    method: "post",
    data: obj,
  });
}

// 删除记账凭证
export function delObj(obj) {
  return fetch({
    url: "/api/tax/taxsby/deleteAccountVoucher",
    method: "post",
    data: obj,
  });
}

// 修改记账凭证
export function editObj(obj) {
  return fetch({
    url: "/api/tax/taxsby/updateAccountVoucher",
    method: "post",
    data: obj,
  });
}


