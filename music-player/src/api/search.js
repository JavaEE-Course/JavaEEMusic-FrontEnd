import request from '@/utils/request'
export function searchAPI (params) {
  return request({
    url: '/api/search',
    method: 'get',
    params
  })
}
