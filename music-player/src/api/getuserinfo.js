import request from '@/utils/request'

export function getuserinfoAPI (params) {
  return request({
    url: '/api/user/getInfo/6',
    method: 'get',
    params
  })
}
