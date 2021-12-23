import request from '@/utils/request'

export function albumaddAPI (params) {
  return request({
    url: '/api/album/add',
    method: 'post',
    data: params
  })
}
export function albumeditAPI (params) {
  return request({
    url: '/api/album/edit',
    method: 'post',
    data: params
  })
}
export function albumdeleteAPI (params) {
  return request({
    url: '/api/album/delete',
    method: 'delete',
    params
  })
}
export function albumaddsongAPI (params) {
  return request({
    url: '/api/album/add/song',
    method: 'post',
    data: params
  })
}
export function albumeditsongAPI (params) {
  return request({
    url: '/api/song/edit',
    method: 'post',
    data: params
  })
}
export function albumdeletesongAPI (params) {
  return request({
    url: '/api/album/remove/song',
    method: 'post',
    params
  })
}
