import request from '@/utils/request'

export function sendemailAPI (params) {
  return request({
    url: '/api/user/sendEmail',
    method: 'post',
    params
  })
}
