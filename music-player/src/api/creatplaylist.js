import request from '@/utils/request'

export function creatplaylistAPI (params) {
  return request({
    url: '/api/song/create/playlist',
    method: 'post',
    data: params
  })
}
