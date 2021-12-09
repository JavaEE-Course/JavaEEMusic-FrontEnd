import request from '@/utils/request'

export function getsonglistAPI (params) {
  return request({
    url: '/api/song/get/my/playlist',
    method: 'get',
    params
  })
}
