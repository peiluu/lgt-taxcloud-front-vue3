import request from "@/utils/request";

/**
 * @desption 查询记账凭证
 */
export function page(obj) {
  return request({
    url: "/api/tax/taxsby/findAccountVoucher",
    method: "post",
    data: obj,
  });
}
/**
 * @desption 录入记账凭证
 */
export function addObj(obj) {
  return request({
    url: "/api/tax/taxsby/addAccountVoucher",
    method: "post",
    data: obj,
  });
}
/**
 * @desption 删除记账凭证
 */
export function delObj(obj) {
  return request({
    url: "/api/tax/taxsby/deleteAccountVoucher",
    method: "post",
    data: obj,
  });
}
/**
 * @desption 修改记账凭证
 */
export function editObj(obj) {
  return request({
    url: "/api/tax/taxsby/updateAccountVoucher",
    method: "post",
    data: obj,
  });
}

/**
 * @desption 获取行业业务场景
 */
export function findTaxMetierScene(obj) {
  return request({
    url: "/api/tax/meSubject/findTaxMetierScene",
    method: "post",
    data: obj,
  });
}
/**
 * @desption 获取科目列表
 */
export function findTaxSubject (obj) {
  return request({
    url: '/api/tax/meSubject/findTaxSubject',
    method: 'post',
    data: obj
  })
}
