<template>
  <div id="app">
    <router-view/>
  </div>
</template>


<script>
import Fingerprint2 from 'fingerprintjs2'

export default {
  async created() {
    var uuid = window.localStorage.getItem('uuid')
    var store =  this.$store
    if(uuid == undefined || uuid === ''){
      if (window.requestIdleCallback) {
        requestIdleCallback(function () {
          Fingerprint2.get(function(components) {
            const values = components.map(function(component,index) {
              if (index === 0) { //把微信浏览器里UA的wifi或4G等网络替换成空,不然切换网络会ID不一样
                return component.value.replace(/\bNetType\/\w+\b/, '')
              }
              return component.value
            })
            // 生成最终id murmur   
            const muuuidrmur = Fingerprint2.x64hash128(values.join(''), 31)
            window.localStorage.setItem('uuid', muuuidrmur)
            store.dispatch("setUUID", muuuidrmur)
          })
        })
      }
    } else {
      store.dispatch("setUUID", uuid)
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
