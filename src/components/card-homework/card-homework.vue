<script setup lang="ts">
const props = withDefaults(defineProps<{
  title?: string
  type?: 1 | 2 | 3
  status?: 1 | 2 | 3
  startTime?: number
  endTime?: number
}>(), {
  title: '标题',
  type: 1,
  status: 3,
  startTime: new Date().getTime() / 1000,
  endTime: (new Date().getTime() + 24 * 60 * 60 * 1000) / 1000,
})

// 状态映射对象
const statusMap = {
  1: { message: '已批改', styleClass: 'i-carbon-checkmark text-green' },
  2: { message: '未批改', styleClass: 'i-carbon-help-filled text-yellow' },
  3: { message: '待批改', styleClass: 'i-carbon-hourglass text-[#8ca0c6]' },
}

// 使用映射对象计算status的message和style
const statusMessage = computed(() => statusMap[props.status]?.message || '未知内容')
const statusStyle = computed(() => statusMap[props.status]?.styleClass || '未知样式')

// 计算type
const typeMessage = computed(() => {
  if (props.type === 1)
    return '基础'
  else if (props.type === 2)
    return '分组'
  else
    return '分层'
})
</script>

<template>
  <view class="px-25rpx py-30rpx bg-white rounded-20rpx">
    <view class="mb-30rpx flex justify-between">
      <view class="flex">
        <view class="px-20rpx py-10rpx bg-[#EBF6FF] rounded-20rpx text-20rpx font-bold text-[#0084FF]">
          {{ typeMessage }}
        </view>
        <view class="ml-19rpx text-30rpx font-bold text-[#000333]">
          {{ title }}
        </view>
      </view>
      <view class="flex items-center">
        <view class="h-24rpx w-24rpx" :class="[statusStyle]" />
        <view class="ml-12rpx text-22rpx text-[#000333]">
          {{ statusMessage }}
        </view>
      </view>
    </view>
    <view class="text-24rpx flex h-92rpx justify-between">
      <view>
        <text class="text-[#000333]">
          发布日期:
        </text>
        <text class="text-[#8F9AA8]">
          {{ new Date(startTime * 1000).toLocaleDateString() }}
        </text>
      </view>
      <view>
        <text class="text-[#000333]">
          批改结束:
        </text>
        <text class="text-[#8F9AA8]">
          {{ new Date(endTime * 1000).toLocaleDateString() }}
        </text>
      </view>
    </view>
    <view class="flex justify-between items-center">
      <view>
        <slot />
      </view>
      <view class="flex">
        <view class="bg-white b b-1 border-[#C9CED9] rounded-33rpx border-solid text-26rpx text-[#000333] flex-center h-66rpx w-170rpx">
          作业详情
        </view>
        <view class="ml-20rpx bg-[#00A76E] b b-1 border-transparent rounded-33rpx border-solid text-26rpx text-white flex-center h-66rpx w-170rpx">
          学情报告
        </view>
      </view>
    </view>
  </view>
</template>
