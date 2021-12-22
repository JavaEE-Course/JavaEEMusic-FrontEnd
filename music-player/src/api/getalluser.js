import request from '@/utils/request'

export function getalluserAPI (params) {
  return request({
    url: '/api/user/all',
    method: 'get',
    params
  })
}
export function useraddAPI (params) {
  return request({
    url: '/api/user/add',
    method: 'post',
    params
  })
}
