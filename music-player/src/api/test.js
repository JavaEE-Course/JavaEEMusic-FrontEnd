import request from '@/utils/request'

export function testAPI (params) {
  return request({
    url: '/api/test/songTest',
    method: 'GET',
    params
  })
}
