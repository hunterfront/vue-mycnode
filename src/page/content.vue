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
        <div class="lf-info">
        </div>
        <div class="rt-info"></div>
      </div>
      <div class="article__content"></div>
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
