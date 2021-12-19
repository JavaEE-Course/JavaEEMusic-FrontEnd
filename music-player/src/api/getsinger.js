import request from '@/utils/request'

export function getsingerAPI (params) {
  return request({
    url: '/api/singer',
    method: 'get',
    params
  })
}

export function getFollowSingerAPI (params) {
  return request({
    url: '',
    method: '',
    params
  })
}

export function getSingerDetailAPI (params) {
  return request({
    url: `api/singer/detail`,
    method: 'get',
    params
  })
}
