<template>
  <div>
    <nv-head ref="head" :head-txt="$utils.getTabInfo(serchKey.tab)"></nv-head>
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
              <div class="author">
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
    this.serchKey.tab = to.query.tab
    this.post = []
    this.fetchData({tab: to.query.tab, page: 1, limit: 20, mdrender: true})
    next()
  },
  beforeRouteLeave (to, from, next) {
    // 如果跳转到详情页则记录相关数据，方便从详情页跳转回来时加载之前的数据
    if (to.name === 'Content') {
      window.sessionStorage.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      window.sessionStorage.post = JSON.stringify(this.post)
      window.sessionStorage.serchKey = JSON.stringify(this.serchKey)
      window.sessionStorage.tab = from.query.tab || 'all'
    }
    next()
  },
  beforeRouteEnter (to, from, next) {
    if (from.name !== 'Content') {
      // 页面切换移除之前记录的数据集
      if (window.sessionStorage.tab) {
        window.sessionStorage.removeItem('post')
        window.sessionStorage.removeItem('searchKey')
        window.sessionStorage.removeItem('tab')
      }
    }
    next()
  },
  data () {
    return {
      loading: false,
      post: [],
      error: null,
      serchKey: {
        tab: 'all',
        page: 1,
        limit: 20,
        mdrender: true
      }
    }
  },
  created () {
    if (this.$route.query && this.$route.query.tab) {
      this.serchKey.tab = this.$route.query.tab
    }
    // 如果页面返回前有对应的查询条件和参数，则渲染之前的数据
    if (window.sessionStorage.serchKey && window.sessionStorage.tab === this.serchKey.tab) {
      this.post = JSON.parse(window.sessionStorage.post)
      this.serchKey = JSON.parse(window.sessionStorage.serchKey)
      this.$nextTick(() => { window.scrollTop = window.sessionStorage.scrollTop })
    } else {
      this.fetchData(this.serchKey)
    }
  },
  mounted () {
    this.$nextTick(() => {
      window.addEventListener('scroll', this.$utils.throttle(this.getScrollData, 300, 1000))
    })
  },
  methods: {
    fetchData ({tab, page, limit, mdrender}) {
      this.error = null
      this.loading = true
      this.$api.get('topics', {tab: tab, page: page, limit: limit, mdrender: mdrender}, data => {
        this.loading = false
        this.scroll = true
        this.post.push(...data.data)
      }, (error) => {
        this.loading = false
        this.error = error
      })
    },
    getScrollData () {
      let scrollHeight = parseInt(document.documentElement.scrollHeight)
      let clientHeight = parseInt(document.documentElement.clientHeight || window.innerHeith || document.body.clientHeight, 15)
      let scrollTop = parseInt(document.documentElement.scrollTop || document.body.scrollTop, 15)
      if (scrollHeight - clientHeight - scrollTop <= 200) {
        this.serchKey.page++
        this.fetchData(this.serchKey)
      }
    }
  }
}
</script>
