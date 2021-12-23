import request from '@/utils/request'

export function getplaylistdetailAPI (params) {
  return request({
    url: '/api/song/get/playlist/information',
    method: 'get',
    params
  })
}

export function getPlaylistInfoAPI (params) {
  return request({
    url: '/api/song/get/playlist/information',
    method: 'get',
    params
  })
}
export function playlistsongremoveAPI (params) {
  return request({
    url: '/api/song/remove/playlist/song',
    method: 'post',
    params
  })
}

export function followPlaylistAPI (params) {
  return request({
    url: '/api/song/follow/playlist',
    method: 'get',
    params
  })
}

export function unfollowPlaylistAPI (params) {
  return request({
    url: '/api/song/unfollow/playlist',
    method: 'get',
    params
  })
}
