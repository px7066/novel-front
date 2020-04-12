<template>
  <div id="searchResult">
    <van-nav-bar
      title="查询结果"
      left-text="返回"
      @click-left="back()"
    >
      <van-icon class-prefix="icon-fanhui" class="iconfont"  slot="left" />
    </van-nav-bar>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item.id" :title="item.novelName"  @click="openNovel(item.novelName)" size="large"/>
    </van-list>
  </div>
</template>

<script>

import Vue from 'vue'
import { Cell, CellGroup, NavBar, Icon, List } from 'vant'
import { selectNovelLikeNovelName } from '@/api/novelInfo.js'
import 'vant/lib/index.css'

Vue.use(Cell)
Vue.use(NavBar)
Vue.use(Icon)
Vue.use(List)

export default {
  name: 'novelSearchResult',
  created() {
    this.novelName = this.$route.params.novelName
  },
  methods: {
    loadData(novelName) {
      var params = {
        limit: this.limit,
        skip: this.skip,
        novelName: this.novelName
      }
      selectNovelLikeNovelName(params).then(response => {
        if(response.data == undefined || response.data.length === 0){
          this.finished = true
        }else{
          for(const novel of response.data){
            this.list.push(novel)
          }
        }
      }).catch(err => {
        Toast({
          message: error.message,
          position: 'center',
          duration: 5 * 1000
        })
      })
    },
    back() {
      this.$router.go(-1)
    },
    onLoad() {
      if(this.skip == undefined){
        this.skip = 0
      }else {
        this.skip += this.limit
      }
      this.loading = false
      this.loadData()
    },
    openNovel(novelName) {
      this.$router.push({'path': `/novelChapter/${novelName}`})
    }
  },
  data() {
    return {
      limit: 10,
      skip: undefined,
      loading: false,
      finished: false,
      novelName: '',
      list: []
    }
  }
}
</script>