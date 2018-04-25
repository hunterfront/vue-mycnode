<template>
  <div id="msg-box">
    <nv-head :head-txt="'消息'"></nv-head>
    <div class="msg">
      <div class="tabbox">
        <div class="tab">
          <a :class="{active:isActiveA}" @click.prevent="tabA=true;tabB=false">已读消息</a>
          <a :class="{active:isActiveB}" @click.prevent="tabB=true;tabA=false">未读消息</a>
        </div>
        <ul class="has-read" v-show="isActiveA" v-if="messages">
          <li v-for="item in messages.has_read_messages" :key="item.id">
            <div class="reply-user-box">
              <div class="reply-user">
                <img class="avatar" :src="item.author.avatar_url" alt="">
                <span class="logname">{{item.author.loginname}}</span>
                在恢复中@了您
              </div>
              <div class="reply-time">{{$utils.goodTime(item.create_at)}}</div>
            </div>
            <div class="reply-content" v-html="item.reply.content"></div>
            <router-link :to="{name:'Content',params:{id:item.topic.id}}">
              <h3 class="reply-topic">{{item.topic.title}}</h3>
            </router-link>
          </li>
        </ul>
        <ul class="hasnot-read" v-show="isActiveB"  v-if="messages">
          <li v-for="item in messages.hasnot_read_messages" :key="item.id">
            <div class="reply-user-box">
              <div class="reply-user">
                <img class="avatar" :src="item.author.avatar_url" alt="">
                <span class="logname">{{item.author.loginname}}</span>
                在恢复中@了您
              </div>
              <div class="reply-time">{{$utils.goodTime(item.create_at)}}</div>
            </div>
            <div class="reply-content" v-html="item.reply.content"></div>
            <router-link :to="{name:'Content',params:{id:item.topic.id}}">
              <h3 class="reply-topic">{{item.topic.title}}</h3>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import nvHead from '../components/header'
export default {
  components: {
    nvHead
  },
  data () {
    return {
      tabA: true,
      tabB: false,
      messages: null
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
  mounted () {
    this.getMessages()
  },
  methods: {
    getMessages () {
      let accesstoken = this.$store.getters.getUserInfo.accesstoken
      this.$api.get(
        'messages',
        {accesstoken: accesstoken},
        res => {
          this.messages = res.data
        }
      )
    }
  }
}
</script>
