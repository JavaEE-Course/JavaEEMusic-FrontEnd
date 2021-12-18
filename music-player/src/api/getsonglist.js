import request from '@/utils/request'

export function getmyplaylistAPI (params) {
  return request({
    url: '/api/song/get/my/playlist',
    method: 'get',
    params
  })
}
export function getotherplaylistAPI (params) {
  return request({
    url: '/api/song/get/other/playlist',
    method: 'get',
    params
  })
}
export function getdailyplaylistAPI (params) {
  return request({
    url: '/api/song/get/daily/playlist',
    method: 'get',
    params
  })
}
