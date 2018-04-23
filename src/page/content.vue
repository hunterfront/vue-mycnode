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
      <div class="article__reply"></div>
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
        console.log(this.topic)
      }, (error) => {
        this.loading = false
        this.error = error
      })
    }
  }
}
</script>
