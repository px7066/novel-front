import request from '@/utils/request'

export function selectNovelLikeNovelName (param) {
  return request({
    url: '/md-resource-api/novel/selectNovelLikeNovelName',
    method: 'get',
    params: param
  })
}