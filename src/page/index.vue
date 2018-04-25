<template>
  <div>
    <img src="static/image/index.png" class="index" alt="">
  </div>
</template>
<script>
export default {
  mounted () {
    setTimeout(() => {
      this.$router.push({
        name: 'Topics'
      })
    }, 2000)
  }
}
</script>
<style lang="scss">
.index {
  width: 100%;
  background-color: #fff;
  margin-top: 40%;
}
</style>
