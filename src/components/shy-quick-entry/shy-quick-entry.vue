<script setup lang="ts">
const quickEntryList = [
  { name: '发布作业', imgUrl: `../../static/icon/index-setion/section1.png`, page: 'publishHomework' },
  { name: '批改作业', imgUrl: `../../static/icon/index-setion/section2.png`, page: '' },
  { name: '发布学习计划', imgUrl: `../../static/icon/index-setion/section3.png`, page: '' },
  { name: '共性错题分析', imgUrl: `../../static/icon/index-setion/section4.png`, page: '' },
  { name: '离线批改', imgUrl: `../../static/icon/index-setion/section5.png`, page: '' },
  { name: '学情分析', imgUrl: `../../static/icon/index-setion/section6.png`, page: '' },
  { name: '挑题组卷', imgUrl: `../../static/icon/index-setion/section7.png`, page: '' },
  { name: '我的积分', imgUrl: `../../static/icon/index-setion/section8.png`, page: '' },
]
function handleTo(name: string) {
  if (name === '') {
    uni.showToast({
      title: '页面暂未开放',
      icon: 'error',
    })
    return
  }

  handleToPage(name)
}
</script>

<template>
  <!-- 中间功能模块 -->
  <div class="grid grid-cols-4 gap-y-30rpx">
    <div v-for="(item, index) in quickEntryList" :key="index" @tap="handleTo(item.page)">
      <div class="mx-auto h-100 w-120">
        <image class="h-full w-full" :src="item.imgUrl" mode="aspectFill" />
      </div>
      <div class="mt-17rpx text-22rpx text-center text-[#000333]">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>
