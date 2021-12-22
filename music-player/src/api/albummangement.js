import request from '@/utils/request'

export function albumaddAPI (params) {
  return request({
    url: '/api/album/add',
    method: 'post',
    data: params
  })
}
