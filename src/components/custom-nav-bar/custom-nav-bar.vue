<script setup lang="ts">
const tops = ref(0)
const height = ref(0)
onReady(() => {
  uni.getSystemInfo({
    success: (e) => {
      tops.value = e.statusBarHeight || 0
      const custom = uni.getMenuButtonBoundingClientRect()
      height.value = custom.height + (custom.top - (e.statusBarHeight || 0)) * 2
    },
  })
})
</script>

<template>
  <view>
    <view :style="[tops ? `height:${tops}px` : `height: 95rpx`]" />
    <view class="flex justify-between" :style="[height ? `height:${height}px; line-height: ${height}px` : `height: auto; line-height: normal`]">
      <view class="flex w-250 items-center">
        <slot name="icon" />
      </view>
      <view class="text-center w-250">
        <slot name="content" />
      </view>
      <view class="w-250" />
    </view>
  </view>
</template>
