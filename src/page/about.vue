<template>
  <div id="about">
    <nv-head ref="head" :head-txt="'关于'"></nv-head>
    <div class="about-info">
      <div class="desc">
        <h3>关于项目</h3>
        <p>该项目是以cnode官方提供的api为基础，用vue2写的webapp</p>
      </div>
      <div class="address">
        <h3>源码地址</h3>
        <a href="https://github.com/HunterFront/vue-mycnode">https://github.com/HunterFront/vue-mycnode</a>
      </div>
      <div class="version">
        <h3>Vue版本</h3>
        <p>vue 2.9.3</p>
      </div>
    </div>
  </div>
</template>
<script>
import nvHead from '../components/header.vue'
export default {
  components: {
    nvHead
  }
}
</script>
