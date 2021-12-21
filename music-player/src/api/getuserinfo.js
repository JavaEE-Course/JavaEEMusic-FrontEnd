import request from '@/utils/request'
export function getuserinfoAPI (params) {
  return request({
    url: '/api/user/getInfo',
    method: 'get',
    params
  })
}
export function edituserinfoAPI (params) {
  return request({
    url: '/api/user/modify',
    method: 'post',
    data: params
  })
}
