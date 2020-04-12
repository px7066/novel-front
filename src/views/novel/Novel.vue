<template>
  <div id="novel">
    <van-nav-bar
      title="首页"
      left-text="返回"
      @click-left="back()"
      @click-right="showSearch()"
    >
      <van-icon class-prefix="icon-fanhui" class="iconfont"  slot="left" />
      <van-icon name="search" slot="right" />
    </van-nav-bar>
    <van-search 
      v-show="searchShow"
      v-model="searchName" 
      placeholder="请输入小说名称" 
      shape="round"
      show-action
      @search="onSearch"
      @cancel="onCancel"
    />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell-group v-for="item in list" :key="item.novelName"  border>
        <template slot="title">
          <span class="custom-title">{{item.novelName}}</span>
          <van-icon class-prefix="icon-jiarushujia" class="iconfont custom-icon"  slot="left-icon" @click="addBook(item.novelName)" />
        </template>
        <van-cell value="目录" is-link @click="openChapter(item.novelName)"/>
        <van-cell v-for="chapter in item.novelChapterVos" :key="chapter.id" :value="chapter.title" is-link @click="openNovel(chapter.id)"/>
      </van-cell-group>
    </van-list>
    <van-tabbar v-model="selected" :fixed=true @change="onChange" >
      <van-tabbar-item name="marking">
        <van-icon class-prefix="icon-shuqian" class="iconfont" name="marking" slot="icon" />
        <span>我的书签</span>
      </van-tabbar-item>
      <van-tabbar-item name="bookcase">
        <van-icon class-prefix="iconfont icon-shujia" name="bookcase" slot="icon"/>
        <span>我的书架</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

import Vue from 'vue'
import { Cell, CellGroup, NavBar, Icon, Tabbar, TabbarItem, List, Search, Toast } from 'vant'
import { loadNovel } from '@/api/novel'
import { addBookcase } from '@/api/novelBookcase'
import 'vant/lib/index.css'

Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(NavBar)
Vue.use(Icon)
Vue.use(List)
Vue.use(Search)
Vue.use(Toast)

export default {
  name: 'Novel',
  data () {
    return {
      selected: undefined,
      loading: false,
      finished: false,
      skip: undefined,
      searchName: '',
      searchShow: false,
      limit: 5,
      list: []
    }
  },
  created () {
    // this.loadMore(this.limit, 0)
  },
  methods: {
    loadMore (limit, skip) {
      var param = {
        'limit': limit,
        'skip': skip
      }
      loadNovel(param).then(response => {
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
    openNovel(id) {
      this.$router.push({path:`/novelContent/${id}`})
    },
    openChapter(novelName){
      this.$router.push({path:`/novelChapter/${novelName}`})
    },
    back() {
      this.$router.go(-1)
    },
    showSearch() {
      this.searchShow = true
    },
    onChange(index) {
      if('marking' === index) {
        this.openMark()
      } else if('bookcase' === index) {
        this.openBookcase()
      }
    },
    openMark() {
      this.$router.push({path: '/novelMark'})
    },
    openBookcase() {
      this.$router.push({path:'/novelBookcase'})
    },
    onLoad() {
      if(this.skip == undefined){
        this.skip = 0
      }else {
        this.skip += this.limit
      }
      this.loadMore(this.limit, this.skip)
      this.loading = false
    },
    onSearch(val) {
      this.$router.push({'path': `/novelSearchResult/${val}`})
    },
    onCancel() {
      this.searchName == ''
      this.searchShow = false
    },
    addBook(novelName) {
      var uuid = this.$store.getters.getUUID
      var params = {
        marking : uuid,
        novelName: novelName
      }
      addBookcase(params).then(response => {
        if(response.data){
          Toast.success('加入成功')
        }else{
          Toast.success('已加入书架')
        }
      }).catch(error => {
        Toast({
          message: error.message,
          position: 'center',
          duration: 5 * 1000
        })
      })
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
.custom-icon{
  float: right
}

</style>
