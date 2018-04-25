<template>
  <div id="login">
    <nv-header :head-txt="'登录'"></nv-header>
    <alert :alert-txt="alertTxt" :is-on="isOn"></alert>
    <div class="loginbar">
      <div class="loginbar__input">
        <input type="text" maxlength="36" placeholder="access token" v-model.trim="accesstoken">
        <div class="line"></div>
      </div>
      <button class="loginbar__button" @click="login(accesstoken)">登录</button>
    </div>
  </div>
</template>
<script>
import nvHeader from '../components/header.vue'
import alert from '../components/alert.vue'
export default {
  components: {
    nvHeader,
    alert
  },
  data () {
    return {
      accesstoken: '',
      isOn: false, // alert添加动画
      alertTxt: ''
    }
  },
  methods: {
    login (accesstoken) {
      if (accesstoken === '') {
        return false
      }
      this.$api.post(
        'accesstoken',
        {accesstoken: accesstoken},
        data => {
          let user = {
            loginname: data.loginname,
            avatar_url: data.avatar_url,
            userId: data.id,
            accesstoken: accesstoken
          }
          window.sessionStorage.user = JSON.stringify(user)
          this.$store.dispatch('setUserInfo', user)
          let redirect = decodeURIComponent(this.$route.query.redirect || '/')
          this.$router.push({
            path: redirect
          })
        }
      )
    }
  }
}
</script>
