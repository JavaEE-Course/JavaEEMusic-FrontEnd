import request from '@/utils/request'

export function commitSongScoreAPI (params) {
  return request({
    url: '/api/song/commit/score',
    method: 'post',
    params
  })
}

export function getSongScoreAPI (params) {
  return request({
    url: '/api/song/get/score',
    method: 'get',
    params
  })
}
