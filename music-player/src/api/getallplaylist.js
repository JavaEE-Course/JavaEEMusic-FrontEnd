import request from '@/utils/request'

export function getallplaylistAPI (params) {
  return request({
    url: '/api/song/get/all/playlist',
    method: 'get',
    params
  })
}
