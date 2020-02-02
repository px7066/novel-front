<template>
  <div id="novel">
    <div id="title">
      <h2>
        {{title}}
      </h2>
    </div>
    <div id="content">
      <p v-for="(item, index) in content" :key="index">{{ item }}</p>
    </div>
    <van-tabbar v-model="selected" :fixed=true @change="onChange">
      <van-tabbar-item name="prev">
        <van-icon class-prefix="icon-iconfontzuo" class="iconfont" name="prev" slot="icon" />
        <span>上一章</span>
      </van-tabbar-item>
      <van-tabbar-item name="catalog">
        <van-icon class-prefix="iconfont icon-sort" name="catalog" slot="icon"/>
        <span>目录</span>
      </van-tabbar-item>
      <van-tabbar-item name="next" icon='catalog'>
        <van-icon class-prefix="iconfont icon-xiayiye" name="next" slot="icon"/>
        <span>下一章</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>

</template>


<script>

import Vue from 'vue'
import { Tabbar, TabbarItem, Icon, Toast  } from 'vant'
import { loadContent, nextPage, prevPage } from '@/api/novel'
import 'vant/lib/index.css'
import '@/assets/font/font_1624842_n0l1k14xqc/iconfont.css'

Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Icon)
Vue.use(Toast)

export default {
  name: 'NovelContent',
  created() {
    let id = this.$route.params.id
    this.fetchData(id)
  },
  data () {
    return {
      selected: undefined,
      content: [],
      novelName: '',
      pageNum: undefined,
      title: ''
    }
  },
  methods : {
    fetchData(id) {
      var params = {
        'id': id
      }
      loadContent(params).then(response => {
        this.content = response.data.content
        this.novelName = response.data.novelName
        this.pageNum = response.data.pageNum
        this.title = response.data.title
      }).catch(error => {
        Toast.fail(error.message)
      })
    },
    next() {
      var params = {
        'novelName': this.novelName,
        'pageNum': this.pageNum
      }
      nextPage(params).then(response => {
        if(response.data === null){
          Toast({
            message: '下一章没有了',
            position: 'center',
            duration: 5 * 1000
          })
        }else {
          let id = response.data.id
          this.fetchData(id)
          this.selected = undefined
        }
      }).catch(error => {
        Toast.fail(error.message)
      })
    },
    prev() {
      var params = {
        'novelName': this.novelName,
        'pageNum': this.pageNum
      }
      prevPage(params).then(response => {
        if(response.data === null){
          Toast({
            message: '上一章没有了',
            position: 'center',
            duration: 5 * 1000
          })
        }else {
          let id = response.data.id
          this.fetchData(id)
          this.selected = undefined
        }
      }).catch(error => {
        Toast({
          message: error.message,
          position: 'center',
          duration: 5 * 1000
        })
      })
    },
    catalog(){
      this.$router.push({path: `/novelChapter/${this.novelName}`})
    },
    onChange(index) {
      if('next' === index) {
        this.next()
      } else if('prev' === index) {
        this.prev()
      } else if('catalog' == index) {
        this.catalog()
      }
    }
  }
}
</script>

<style>
#novel {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#novel #content p {
  text-align: left
}

</style>
