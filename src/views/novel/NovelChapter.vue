<template>
  <div id="chapter">
    <van-nav-bar
      :title="novelName"
      @click-left="back()"
      @click-right="home()"
    >
      <van-icon class-prefix="icon-fanhui" class="iconfont"  slot="left"/>
      <van-icon class-prefix="icon-shouye" class="iconfont"  slot="right"/>
    </van-nav-bar>
    <van-cell v-for="item in list" :key="item.title" :value="item.title" @click="openContent(item.id)" is-link/>
    <van-pagination 
      v-model="currentPage" 
      :total-items="totalItem" 
      :items-per-page="20"
      force-ellipses
      @change="onChange"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import { loadChapter, selectNovelChapterNumber } from '@/api/novel'
import { Pagination, Cell, NavBar, Icon } from 'vant'
import 'vant/lib/index.css'

Vue.use(Pagination)
Vue.use(Cell)
Vue.use(NavBar)
Vue.use(Icon)

export default {
  name : 'NovelChapter',
  created(){
    this.novelName = this.$route.params.novelName
    this.loadTotalItem()
    this.loadData()
    this.uuid = this.$store.getters.getUUID
  },
  methods: {
    loadTotalItem() {
      let novelNameParam = this.novelName
      var params = {
        'novelName': novelNameParam
      }
      selectNovelChapterNumber(params).then(response => {
        this.totalItem = response.data
      }).catch(error => {
        Toast.fail(error.message)
      })
    },
    loadData(){
      var skip = (this.currentPage-1) * 20
      var limit = 20
      var params = {
        'skip': skip,
        'limit': limit,
        'novelName': this.novelName
      }
      loadChapter(params).then(response => {
        this.list = response.data
      }).catch(error => {
        Toast.fail(error.message)
      })
    },
    onChange() {
      this.loadData()
    },
    openContent(id) {
      this.$router.push({path:`/novelContent/${id}`})
    },
    back() {
      this.$router.go(-1)
    },
    home() {
      this.$router.push({path:'/novel'})
    }
  },
  data() {
    return {
      currentPage: 1,
      novelName: '',
      totalItem: undefined,
      uuid: undefined,
      list: []
    }
  }
}
</script>