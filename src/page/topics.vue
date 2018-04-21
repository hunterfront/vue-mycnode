<template>
  <div>
    <nv-head ref="head" :head-txt="$utils.getTabInfo(query)"></nv-head>
    <div id="topics">
      <!-- loading -->
      <div class="loading" v-if="loading">
      </div>
      <!-- error -->
      <div v-if="error" class="error">
        {{ error }}
      </div>
      <ul v-if="post" class="post">
        <router-link v-for="item in post" :key="item.id" :to="{name: 'Content',params: {id: item.id}}" >
          <li class="post__item">
            <div class="post__head">
              <h3 class="post__title">
                <span class="post__tag" :class="[item.tab, {top: item.top, good: item.good}]">
                  {{$utils.getTagTxt(item.tab,item.top,item.good)}}
                </span>{{item.title}}
              </h3>
            </div>
            <div class="post__info">
              <div class="post__author">
                <img class="avatar" :src="item.author.avatar_url"/>
                <div class="logname-pubtime">
                  <p class="logname">{{item.author.loginname}}</p>
                  <p class="pubtime">{{$utils.goodTime(item.create_at)}}</p>
                </div>
              </div>
              <div class="post__other">
                <p>
                  <span class="reply-count">{{item.reply_count}}</span>
                  /
                  <span class="visit-count">{{item.visit_count}}</span>
                </p>
                <p class="last-replay-time">{{$utils.goodTime(item.last_reply_at)}}</p>
              </div>
            </div>
          </li>
        </router-link>
      </ul>
    </div>
    <backtotop></backtotop>
  </div>
</template>
<script>
import nvHead from '../components/header.vue'
import backtotop from '../components/backtotop.vue'
export default{
  components: {
    nvHead,
    backtotop
  },
  beforeRouteUpdate (to, from, next) {
    // 路由更新改变head状态
    this.$refs.head.isOpen = false
    this.fetchData(to.query.tab)
    next()
  },
  // 路由props：query
  props: ['query'],
  data () {
    return {
      loading: false,
      post: null,
      error: null
    }
  },
  created () {
    this.fetchData('all')
  },
  methods: {
    fetchData (query) {
      this.error = this.post = null
      this.loading = true
      this.$api.get('topics', {tab: query}, data => {
        this.loading = false
        this.post = data.data
        console.log(this.post)
      }, (error) => {
        this.loading = false
        this.error = error
      })
    }
  }
}
</script>
