<template>
  <div id="novel">
    <van-cell-group v-for="item in list" :key="item.novelName" :title="item.novelName" border>
      <van-cell value="目录" is-link @click="openChapter(item.novelName)"/>
      <van-cell v-for="chapter in item.novelChapterVos" :key="chapter.id" :value="chapter.title" is-link @click="openNovel(chapter.id)"/>
    </van-cell-group>
  </div>
</template>

<script>

import Vue from 'vue'
import { Cell, CellGroup } from 'vant'
import { loadNovel } from '@/api/novel'
import 'vant/lib/index.css'

Vue.use(Cell)
Vue.use(CellGroup)

export default {
  name: 'Novel',
  data () {
    return {
      list: {}
    }
  },
  created () {
    this.loadMore(10, 0)
  },
  methods: {
    loadMore (limit, skip) {
      var param = {
        'limit': limit,
        'skip': skip
      }
      loadNovel(param).then(response => {
        this.list = response.data
      }).catch(err => {
        Toast({
          message: error.message,
          position: 'center',
          duration: 5 * 1000
        })
      })
    }, 
    openNovel(id) {
      this.$router.push({path:`/novelContent/${id}`})
    },
    openChapter(novelName){
      this.$router.push({path:`/novelChapter/${novelName}`})
    }
  }
}
</script>

<style>
#novel {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}

</style>
