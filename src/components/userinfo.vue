<template>
  <div class="user-info">
    <router-link :to="{name:'Login',query:{redirect: encodeURIComponent($route.path)}}" v-if="!userInfo.userId">
      <div class="login-no">
        <i></i>
        <span>登录</span>
      </div>
    </router-link>
    <router-link :to="{name:'User',params:{loginname: userInfo.loginname}}" v-if="userInfo.userId">
      <div class="login-yes">
        <img :src="userInfo.avatar_url" alt="avatar" class="avatar">
        <span class="username">{{userInfo.loginname}}</span>
        <i></i>
      </div>
    </router-link>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      isLogin: false
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'getUserInfo'
    })
  }
}
</script>
