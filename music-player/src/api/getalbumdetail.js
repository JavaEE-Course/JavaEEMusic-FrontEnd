import request from '@/utils/request'

export function getalbumdetailAPI (params) {
  return request({
    url: '/api/song/get/albumDetails',
    method: 'get',
    params
  })
}
