import request from '@/utils/request'

export function singeraddAPI (params) {
  return request({
    url: '/api/singer/add',
    method: 'post',
    params
  })
}
export function singereditAPI (params) {
  return request({
    url: '/api/singer/edit',
    method: 'post',
    params
  })
}
export function singerdeleteAPI (params) {
  return request({
    url: '/api/singer/delete' + params,
    method: 'delete',
    params
  })
}
