import request from '@/utils/request'

export function registerAPI (params) {
  return request({
    url: '/api/user/register',
    method: 'post',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    data: JSON.stringify(params)
  })
}

export function emailVerification (params) {
  return request({
    url: 'api/user/sendEmail',
    method: 'post',
    params
  })
}
