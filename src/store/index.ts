import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    uuid: undefined
  },
  getters: {
    getUUID(state){
      return state.uuid
    }
  },
  mutations: {
    SET_UUID(state, u){
      state.uuid = u
    }
  },
  actions: {
    setUUID({commit,state}, name){
      // 调用mutaions里面的方法
      commit("SET_UUID", name);
    }
  },
  modules: {
  }
})
