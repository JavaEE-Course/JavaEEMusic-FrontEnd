import request from '@/utils/request'

export function registerAPI (params) {
  return request({
    url: '/api/user/register',
    method: 'post',
    params
  })
}
