import request from '@/utils/request'

export function saveMark(data) {
  return request({
    url: '/md-resource-api/novel/saveMark',
    method: 'post',
    data
  })
}

export function selectNovelMarks (param) {
  return request({
    url: '/md-resource-api/novel/selectNovelMarks',
    method: 'get',
    params: param
  })
}
