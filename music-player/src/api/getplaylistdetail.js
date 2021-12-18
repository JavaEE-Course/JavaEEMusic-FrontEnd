import request from '@/utils/request'

export function getplaylistdetailAPI (params) {
  return request({
    url: '/api/song/get/playlist/information',
    method: 'get',
    params
  })
}
