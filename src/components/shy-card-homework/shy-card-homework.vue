<script setup lang="ts">
const props = withDefaults(defineProps<{
  title?: string
  type?: 1 | 2 | 3
  status?: 1 | 2 | 3
  startTime?: number
  endTime?: number
  showIcon?: boolean
}>(), {
  title: '标题',
  type: 1,
  status: 3,
  startTime: new Date().getTime() / 1000,
  endTime: (new Date().getTime() + 24 * 60 * 60 * 1000) / 1000,
  showIcon: true,
})

const emits = defineEmits(['detail', 'report'])

// 状态映射对象
const statusMap = {
  1: { message: '已批改', styleClass: 'i-carbon-checkmark text-green' },
  2: { message: '未批改', styleClass: 'i-carbon-help-filled text-yellow' },
  3: { message: '部分批改', styleClass: 'i-carbon-hourglass text-[#8ca0c6]' },
}

const statusMessage = computed(() => statusMap[props.status].message)
const statusStyle = computed(() => statusMap[props.status].styleClass)

const typeMap = {
  1: { message: '基础', style: 'color: var(--guodu-color-blue-500);background-color:var(--guodu-color-blue-100)' },
  2: { message: '分组', style: 'color: var(--guodu-color-yellow-500); background-color:var(--guodu-color-yellow-100)' },
  3: { message: '分层', style: 'color: var(--guodu-color-green-500); background-color:var(--guodu-color-green-100)' },
}

const typeMessage = computed(() => typeMap[props.status].message)
const typeStyle = computed(() => typeMap[props.status].style)

// // 计算type
// const typeMessage = computed(() => {
//   if (props.type === 1)
//     return '基础'
//   else if (props.type === 2)
//     return '分组'
//   else
//     return '分层'
// })
</script>

<template>
  <div class="px-25rpx py-30rpx bg-white rounded-20rpx">
    <div class="mb-30rpx flex justify-between">
      <div class="flex">
        <div class="px-20rpx py-10rpx rounded-20rpx text-20rpx font-bold" :style="[typeStyle]">
          {{ typeMessage }}
        </div>
        <div class="ml-19rpx text-30rpx font-bold text-[#000333]">
          {{ title }}
        </div>
      </div>
      <div class="flex items-center" :class="{ 'opacity-0': !showIcon }">
        <div class="h-24rpx w-24rpx" :class="[statusStyle]" />
        <div class="ml-12rpx text-22rpx text-[#000333]">
          {{ statusMessage }}
        </div>
      </div>
    </div>
    <div class="text-24rpx flex h-92rpx justify-between">
      <div>
        <text class="text-[#000333]">
          发布日期:
        </text>
        <text class="text-[#8F9AA8]">
          {{ useDateFormat(new Date(startTime * 1000), 'YYYY-MM-DD').value }}
        </text>
      </div>
      <div>
        <text class="text-[#000333]">
          批改结束:
        </text>
        <text class="text-[#8F9AA8]">
          {{ useDateFormat(new Date(endTime * 1000), 'YYYY-MM-DD').value }}
        </text>
      </div>
    </div>
    <div class="flex justify-between items-center">
      <div>
        <slot />
      </div>
      <div class="flex">
        <button class="uno-btn" @tap="$emit('detail', title)">
          作业详情
        </button>
        <button class="uno-btn ml-20rpx btn-green" @tap="$emit('report', title)">
          学情报告
        </button>
      </div>
    </div>
  </div>
</template>
