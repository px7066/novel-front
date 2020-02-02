import request from '@/utils/request'

export function loadNovel (param) {
  return request({
    url: '/md-resource-api/novel/loadNovel',
    method: 'get',
    params: param
  })
}

export function loadChapter (param) {
  return request({
    url: '/md-resource-api/novel/loadChapter',
    method: 'get',
    params: param
  })
}

export function loadContent (param) {
  return request({
    url: '/md-resource-api/novel/loadContent',
    method: 'get',
    params: param
  })
}

export function nextPage (param) {
  return request({
    url: '/md-resource-api/novel/nextPage',
    method: 'get',
    params: param
  })
}

export function prevPage (param) {
  return request({
    url: '/md-resource-api/novel/prevPage',
    method: 'get',
    params: param
  })
}

export function selectNovelChapterNumber (param) {
  return request({
    url: '/md-resource-api/novel/selectNovelChapterNumber',
    method: 'get',
    params: param
  })
}
