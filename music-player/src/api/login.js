import request from '@/utils/request'

export function loginAPI (params) {
  return request({
    url: '/api/user/login',
    method: 'post',
    params
  })
}
