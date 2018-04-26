<template>
  <div id="content">
    <!-- loading -->
    <div class="loading" v-if="loading">
    </div>
    <!-- error -->
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <nv-head :head-txt="'文章'"></nv-head>
    <div class="article" v-if="topic">
      <h2 class="article__title">
        {{topic.title}}
      </h2>
      <div class="article__info">
        <div class="author">
          <img class="avatar" :src="topic.author.avatar_url"/>
          <div class="logname-pubtime">
            <p class="logname">{{topic.author.loginname}}</p>
            <p class="pubtime">发布于:{{$utils.goodTime(topic.create_at)}}</p>
          </div>
        </div>
        <div class="other">
          <p class="tag" :class="[topic.tab, {top: topic.top, good: topic.good}]">{{$utils.getTagTxt(topic.tab,topic.top,topic.good)}}</p>
          <p class="visit-count">{{topic.visit_count}}次浏览</p>
        </div>
      </div>
      <div class="article__content markdown-body" v-html="topic.content"></div>
      <div class="reply-box">
        <div class="reply-box__count">
          <span class="count">{{topic.reply_count}}</span>
          <span class="txt">回复</span>
        </div>
        <ul class="reply-list">
          <li class="reply-item" v-for="reply in topic.replies" :key="reply.id">
            <div class="reply-info">
              <div class="author">
                <img class="avatar avatar--m" :src="reply.author.avatar_url"/>
                <div class="logname-pubtime">
                    <p class="logname">{{reply.author.loginname}}</p>
                    <p class="pubtime">发布于:{{$utils.goodTime(reply.create_at)}}</p>
                </div>
              </div>
              <div class="like-replyto">
                <span class="like">
                  <i class="icon iconfont">&#xe608;</i>
                  <span class="like-count">{{reply.ups.length}}</span>
                </span>
                <span class="replyto icon iconfont">&#xe609;</span>
              </div>
            </div>
            <div class="reply-content markdown-body" v-html="reply.content"></div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import nvHead from '../components/header'
export default{
  components: {
    nvHead
  },
  props: ['id'],
  data () {
    return {
      topic: null,
      loading: false,
      error: null
    }
  },
  created () {
    this.fetchData(this.id)
  },
  methods: {
    fetchData (id) {
      this.error = this.topic = null
      this.loading = true
      this.$api.get('topic/' + id, null, data => {
        this.loading = false
        this.topic = data.data
      }, (error) => {
        this.loading = false
        this.error = error
      })
    }
  }
}
</script>
