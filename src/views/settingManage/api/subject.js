import request from '@/utils/request'

export function page (obj) {
  return request({
    url: '/api/tax/meSubject/findTaxSubject',
    method: 'post',
    data: obj
  })
}

export function addObj (obj) {
  return request({
    url: '/api/tax/meSubject/addTaxSubject',
    method: 'post',
    data: obj
  })
}

export function delObj (obj) {
  return request({
    url: '/api/tax/meSubject/deleteTaxSubject',
    method: 'post',
    data: obj
  })
}

export function editObj (obj) {
  return request({
    url: '/api/tax/meSubject/updateTaxSubject',
    method: 'post',
    data: obj
  })
}

/**
 * @despition 查询科目类别
 */
export function findParentTaxSubject () {
  return request({
    url: '/api/tax/meSubject/findParentTaxSubject',
    method: 'post'
  })
}

/**
 * @despition 查询科目级联信息
 * */
export function findTaxSubjectCascade (id) {
  return request({
    url: '/api/tax/meSubject/findTaxSubjectCascade/' + id,
    method: 'post'
  })
}

/**
 * @despition 新增发票
 * */
export function addTaxInvoice (obj) {
  return request({
    url: '/api/tax/invoiceAccount/addTaxInvoice',
    method: 'post',
    data: obj
  })
}
