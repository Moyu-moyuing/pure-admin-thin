<script setup lang="ts">
defineOptions({
  name: "TextLoading"
});
</script>

<template>
  <div class="flex justify-around text-[#000] w-[40px] p-[10px]">
    <div class="dotsAnimation" />
    <div class="dotsAnimation" />
    <div class="dotsAnimation" />
  </div>
</template>

<style lang="scss" scoped>
//定义动画
@keyframes dots-beat {
  //关键帧定义，在50%时候颜色变透明缩小
  50% {
    opacity: 0.2;
    transform: scale(0.75);
  }
  //在100%回到正常状态
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.dotsAnimation {
  width: 3px;
  height: 3px;
  background-color: currentcolor;
  border: 0 solid currentcolor;
  border-radius: 100%;
  animation: dots-beat 0.7s -0.15s infinite linear;
}

.dotsAnimation:nth-child(2n-1) {
  animation-delay: -0.5s;
}
</style>
