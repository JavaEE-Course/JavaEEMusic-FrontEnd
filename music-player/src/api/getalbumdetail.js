import request from '@/utils/request'

export function getalbumdetailAPI (params) {
  return request({
    url: '/api/album/get/albumDetails',
    method: 'get',
    params
  })
}
