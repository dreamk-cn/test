<script setup lang="ts">
const props = withDefaults(defineProps<{
  title?: string
  accuracy?: string
  colorType: 1 | 2
}>(), {
  title: '得分率',
  accuracy: '80%',
  colorType: 1,
})

// const styleMap = {
//   1: { text: 'text-#00A76E', bg: 'bg-#E7F3EF' },
//   2: { text: 'text-#FC5260', bg: 'bg-#F6E6E8' },
// }
</script>

<template>
  <div class="mb-35rpx flex justify-between items-center">
    <div class="text-30rpx font-bold text-[#000333]">
      {{ props.title }}
    </div>
    <div class="text-38rpx font-bold relative" :class="[colorType === 1 ? 'text-#00A76E' : 'text-#FC5260']">
      {{ accuracy }}
      <div class="absolute h-6rpx bottom-4rpx left-0 right-0" :class="[colorType === 1 ? 'bg-#E7F3EF' : 'bg-#F6E6E8']" />
    </div>
  </div>
</template>
