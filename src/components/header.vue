<template>
  <div>
    <header id="hd" :class="{open: isOpen}">
      <div class="page-cover" v-show="isOpen" @click="closeMenu"></div>
      <div class="nv-bar">
        <div class="nv-bar__menu-btn" @click="openMenu"></div>
        <span class="nv-bar__txt">{{headTxt}}</span>
        <div class="nv-bar__add">
          <router-link to="/add">
            <i class="iconfont add-icon">&#xe60f;</i>
          </router-link>
        </div>
      </div>
      <nvMenu></nvMenu>
    </header>
  </div>
</template>

<script>
import nvMenu from './nvMenu.vue'
export default{
  components: {
    nvMenu
  },
  props: {
    headTxt: String
  },
  data () {
    return {
      isOpen: false
    }
  },
  methods: {
    openMenu () {
      this.isOpen = true
    },
    closeMenu () {
      this.isOpen = false
    }
  }
}
</script>
