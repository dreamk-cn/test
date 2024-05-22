<script setup lang="ts">
</script>

<template>
  <div class="top-bg p-30rpx">
    <div class="my-60rpx text-xl font-bold tracking-10rpx text-center">
      我的积分
    </div>
    <div class="b-2rpx b-#ccd0d9 b-solid text-center grid grid-cols-3 grid-rows-3">
      <div v-for="item in 9" :key="item" class="b-2rpx b-#ccd0d9 b-solid flex-center aspect-ratio-square">
        {{ item }}
      </div>
    </div>
    <div class="my-30rpx">
      <button @tap="handleBackPage()">
        返回
      </button>
    </div>
  </div>
</template>
