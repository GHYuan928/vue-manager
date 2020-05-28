import request from '@/utils/request'

export function transactionList(query) {
  return request({
    method: 'GET',
    url: '/vue-element-admin/transaction/list',
    params: { query }
  })
}
