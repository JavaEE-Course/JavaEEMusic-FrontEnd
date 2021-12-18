import request from '@/utils/request'

export function getuserinfoAPI (params) {
  return request({
    url: '/api/user/getInfo',
    method: 'get',
    params
  })
}
