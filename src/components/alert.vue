<template>
  <div class="alert" :class="{on: isOn}">
    <span class="txt">{{alertTxt}}</span>
  </div>
</template>
<script>
export default {
  props: ['alertTxt', 'isOn']
}
</script>
