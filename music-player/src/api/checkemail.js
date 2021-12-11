import request from '@/utils/request'

export function checkemailAPI (params) {
  return request({
    url: '/api/user/checkEmail',
    method: 'get',
    params
  })
}
