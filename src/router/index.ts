import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/novel'
  },
  {
    path: '/novel',
    name: 'Novel',
    component: () => import('@/views/novel/Novel.vue')
  },
  {
    path: '/novelContent/:id',
    name: 'NovelContent',
    component: () => import('@/views/novel/NovelContent.vue')
  },
  {
    path: '/novelChapter/:novelName',
    name: 'NovelChapter',
    component: () => import('@/views/novel/NovelChapter.vue')
  },
  {
    path: '/novelMark',
    name: 'NovelMark',
    component: () => import('@/views/novel/NovelMark.vue')
  },
  {
    path: '/novelSearchResult/:novelName',
    name: 'NovelSearchResult',
    component: () => import('@/views/novel/NovelSearchResult.vue')
  },
  {
    path: '/novelBookcase',
    name: 'NovelBookcase',
    component: () => import('@/views/novel/NovelBookcase.vue')
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
