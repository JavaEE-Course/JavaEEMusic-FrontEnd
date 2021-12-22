import request from '@/utils/request'

export function getallplaylistAPI (params) {
  return request({
    url: '/api/song/get/all/playlist',
    method: 'get',
    params
  })
}

export function gettypeplaylistAPI (params) {
  return request({
    url: '/api/song/get/type/playlist',
    method: 'get',
    params
  })
}
export function deleteplaylistAPI (params) {
  return request({
    url: '/api/song/remove/playlist',
    method: 'get',
    params
  })
}
