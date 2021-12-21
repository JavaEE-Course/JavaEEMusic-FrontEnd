import request from '@/utils/request'

export function getalluserAPI (params) {
  return request({
    url: '/api/user/get/all',
    method: 'get',
    params
  })
}
