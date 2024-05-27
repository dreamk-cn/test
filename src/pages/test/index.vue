<script setup lang="ts">
function getName(): Promise<string> {
  return new Promise((reslove, reject) => {
    const isSuccess = Math.random() > 0.5
    setTimeout(() => {
      if (isSuccess)
        return reslove('dreamk')
      else
        return reject(new Error('很遗憾，获取name失败了'))
    }, 2000)
  })
}

getName().finally(() => {
  console.warn('结束了')
})
</script>

<template>
  <div class="p-3">
    <div class="mt-50rpx text-45 font-bold text-center text-black">
      Welcome to test page
    </div>
  </div>
</template>
