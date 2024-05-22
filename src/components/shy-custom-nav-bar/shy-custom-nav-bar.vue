<script setup lang="ts">
const tops = ref(0)
const height = ref(0)
onBeforeMount(() => {
  uni.getSystemInfo({
    success: (e) => {
      tops.value = e.statusBarHeight || 0
      let custom = {
        top: 0,
        height: 40,
      }
      // #ifndef H5||APP-PLUS
      custom = uni.getMenuButtonBoundingClientRect()
      // #endif
      height.value = custom.height + (custom.top - (e.statusBarHeight || 0)) * 2
    },
  })
})
</script>

<template>
  <div>
    <div :style="[tops ? `height:${tops}px` : `height: ${height}rpx`]" />
    <div class="flex justify-between" :style="[height ? `height:${height}px; line-height: ${height}px` : `height: auto; line-height: normal`]">
      <slot />
    </div>
  </div>
</template>
