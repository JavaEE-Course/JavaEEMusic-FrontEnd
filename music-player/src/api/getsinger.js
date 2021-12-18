import request from '@/utils/request'

export function getsingerAPI (params) {
  return request({
    url: '/api/singer',
    method: 'get',
    params
  })
}
