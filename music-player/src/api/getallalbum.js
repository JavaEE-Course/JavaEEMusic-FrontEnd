import request from '@/utils/request'

export function getallalbumAPI (params) {
  return request({
    url: '/api/song/get/all/album',
    method: 'get',
    params
  })
}
