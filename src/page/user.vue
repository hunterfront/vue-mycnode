<template>
  <div id="pageuser">
    <nv-header :head-txt="'用户信息'"></nv-header>
    <div class="user" v-if="user">
      <div class="wraper">
        <img class="avatar" :src="user.avatar_url"/>
        <div class="loginname">{{user.loginname}}</div>
        <div class="score">积分:{{user.score}}</div>
      </div>
      <div class="tabbox">
        <div class="tab">
          <a :class="{active:isActiveA}" @click.prevent="tabA=true;tabB=false">最新发布</a>
          <a :class="{active:isActiveB}" @click.prevent="tabB=true;tabA=false">最近回复</a>
        </div>
        <ul class="recent-topics" v-show="isActiveA">
          <router-link v-for="item in user.recent_topics" :key="item.id" :to="{name:'Content',params:{id:item.id}}">
            <li class="recent-topics__item">
              <img class="avatar" :src="item.author.avatar_url" alt="">
              <div class="bar">
                <h3 class="title">{{item.title}}</h3>
                <div class="logname-pubtime">
                  <span class="logname">{{item.author.loginname}}</span>
                  <span class="pubtime">{{$utils.goodTime(item.last_reply_at)}}</span>
                </div>
              </div>
            </li>
          </router-link>
        </ul>
        <ul class="recent-replies" v-show="isActiveB">
          <router-link v-for="item in user.recent_replies" :key="item.id" :to="{name:'Content',params:{id:item.id}}">
            <li class="recent-replies__item">
              <img class="avatar" :src="item.author.avatar_url" alt="">
              <div class="bar">
                <h3 class="title">{{item.title}}</h3>
                <div class="logname-pubtime">
                  <span class="logname">{{item.author.loginname}}</span>
                  <span class="pubtime">{{$utils.goodTime(item.last_reply_at)}}</span>
                </div>
              </div>
            </li>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import nvHeader from '../components/header'
export default {
  components: {
    nvHeader
  },
  data () {
    return {
      user: null,
      tabA: true,
      tabB: false
    }
  },
  computed: {
    isActiveA () {
      return this.tabA && !this.tabB
    },
    isActiveB () {
      return this.tabB && !this.tabA
    }
  },
  methods: {
    getUserDetail () {
      let loginname = this.$route.params.loginname
      this.$api.get(
        'user/' + loginname,
        null,
        res => {
          this.user = res.data
        }
      )
    }
  },
  created () {
    this.getUserDetail()
  }
}
</script>
