<template>
  <div id="side-bar">
    <userinfo></userinfo>
    <div class="menu">
      <router-link class="menu__item" :to="{name:'Topics',query:{tab:'all'}}">
        <i class="iconfont icon-quanbu"></i>
        <span>全部</span>
      </router-link>
      <router-link class="menu__item" :to="{name:'Topics',query:{tab:'good'}}">
        <i class="iconfont icon-hao"></i>
        <span>精华</span>
      </router-link>
      <router-link class="menu__item" :to="{name:'Topics',query:{tab:'share'}}">
        <i class="iconfont icon-fenxiang"></i>
        <span>分享</span>
      </router-link>
      <router-link class="menu__item" :to="{name:'Topics',query:{tab:'ask'}}">
        <i class="iconfont icon-wenda"></i>
        <span>问答</span>
      </router-link>
      <router-link class="menu__item" :to="{name:'Topics',query:{tab:'job'}}">
        <i class="iconfont icon-zhaopin"></i>
        <span>招聘</span>
      </router-link>
    </div>
    <div class="msg-about-box">
      <router-link class="message" :to="{name:'Message'}" >
        <i class="iconfont icon-xiaoxi"></i>
        <span>消息</span>
      </router-link>
      <router-link class="about" :to="{name:'About'}">
        <i class="iconfont icon-about"></i>
        <span>关于</span>
      </router-link>
    </div>
  </div>
</template>
<script>
import userinfo from './userinfo.vue'
export default {
  components: {userinfo}
}
</script>
