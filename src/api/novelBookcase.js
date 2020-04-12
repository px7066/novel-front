import request from '@/utils/request'

export function addBookcase(data) {
  return request({
    url: '/md-resource-api/novel/addBookcase',
    method: 'post',
    data
  })
}

export function selectBookcases (param) {
  return request({
    url: '/md-resource-api/novel/selectBookcases',
    method: 'get',
    params: param
  })
}
