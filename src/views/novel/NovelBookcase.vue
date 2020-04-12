<template>
  <div id="bookcase">
    <van-nav-bar
      :title="title"
      @click-left="back()"
      @click-right="home()"
    >
      <van-icon class-prefix="icon-fanhui" class="iconfont"  slot="left"/>
      <van-icon class-prefix="icon-shouye" class="iconfont"  slot="right"/>
    </van-nav-bar>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in dataList" :key="item.id" :title="item.novelName"  @click="openChapter(item.novelName)" size="large"/>
    </van-list>
  </div>
</template>

<script>

import Vue from 'vue'
import { Cell, NavBar, Icon, List } from 'vant'
import { selectBookcases } from '@/api/novelBookcase.js'
import 'vant/lib/index.css'

Vue.use(Cell)
Vue.use(NavBar)
Vue.use(Icon)
Vue.use(List)

export default {
  name: 'NovelBookcase',
  methods: {
    fetchData(){
      var uuid = this.$store.getters.getUUID
      var params = {
        skip: this.skip,
        limit: this.limit,
        marking: uuid
      }
      selectBookcases(params).then(response => {
        if(response.data === '' || response.data == undefined){
          this.finished = true
        }else{
          for(const bookcase of response.data){
            this.dataList.push(bookcase)
          }
        }
      }).catch(error => {
        Toast.fail(error.message)
      })
    },
    back() {
      this.$router.go(-1)
    },
    home() {
      this.$router.push({path:'/novel'})
    },
    onLoad() {
      if(this.skip == undefined){
        this.skip = 0
      }else {
        this.skip += this.limit
      }
      this.skip == undefined? 0: (this.skip + this.limit)
      this.fetchData()
      this.loading = false
    },
    openChapter(novelName) {
      this.$router.push({path:`/novelChapter/${novelName}`}) 
    }
  },
  data() {
    return {
      skip: undefined,
      limit: 10,
      title: '我的书架',
      loading: false,
      finished: false,
      dataList: []
    }
  }
}
</script>

<style scoped>
#marking {
  margin-top: 5px;
}
</style>