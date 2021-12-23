import request from '@/utils/request'

export function getallalbumAPI (params) {
  return request({
    url: '/api/album/get/all/album',
    method: 'get',
    params
  })
}
