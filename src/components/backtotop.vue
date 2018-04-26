<template>
  <div class="iconfont icon-top" v-show="show" @click="toTop">
    &#xe6c9;
  </div>
</template>
<script>
export default {
  data () {
    return {
      show: false
    }
  },
  mounted () {
    window.addEventListener('scroll', () => {
      let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
      if (scrollTop > 270) {
        this.show = true
      } else {
        this.show = false
      }
    })
  },
  methods: {
    toTop () {
      if (document.body.scrollTop) {
        document.body.scrollTop = 0
      } else {
        document.documentElement.scrollTop = 0
      }
    }
  }
}
</script>
<style lang="scss">
.icon-top {
  position: fixed;
  right: 10px;
  bottom: 80px;
  font-size: 50px;
  z-index: 999;
  color: #41B883;
}
</style>
