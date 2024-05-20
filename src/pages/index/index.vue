<script setup lang="ts">
import { Fetch } from '~/utils/fetch'
import { api } from '~/config/api'
import type { DayType, HomeworkDetailType } from '~/types/homework'

// 自定义头部
const tops = ref(0)
const height = ref(0)
onReady(() => {
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

const currentDate = ref(getDate(''))
const { list: homeworkList, isLoading, isLoadAll, load, clear, next } = useFetchPage<HomeworkDetailType>(api.getHomeworkList)
// 当前天数下标
const curDayIndex = ref(0)
const scrollToDayId = ref('')
const dayList = ref<Array<DayType>>([])
// 今日作业数量
const todayHomeworkCount = computed(() => {
  // 检查dayList是否有值并且curDay的值是一个有效的索引
  if (dayList.value.length > 0 && curDayIndex.value >= 0 && curDayIndex.value < dayList.value.length) {
    // 确保访问的是一个已定义的对象且有count属性
    return dayList.value[curDayIndex.value].count
  }
  else {
    return 0
  }
})
// 选择年月
function onDateChange(e: string) {
  const [year, month] = e.split('-')
  currentDate.value = `${year}/${month}`
  fetchDays()
}
// 选择天
function onDayChange(index: number) {
  // 说明是通过选择年月转到此函数
  if (index < 0) {
    curDayIndex.value = 0
    if (todayHomeworkCount.value === 0)
      homeworkList.value = []
  }

  // 如果点击的天数没变化，return
  if (curDayIndex.value !== index) {
    // 如果点击的天数不同，赋值
    curDayIndex.value = index
    // 如果所选的天数下没有作业，清空作业列表&&return
    if (todayHomeworkCount.value === 0)
      homeworkList.value = []
  }
}
// 获取年/月下的天数及作业数量
function fetchDays() {
  uni.showLoading()
  const [year, month] = currentDate.value.split('/')
  Fetch<Array<DayType>>(api.getHomeworkDays, { method: 'GET', data: { year, month } }).then((data) => {
    dayList.value = data
    // 获取天下面的作业列表
    onDayChange(-1)
    // dom更新完毕
    nextTick(() => {
      const curYear = new Date().getFullYear().toString()
      const curMonth = new Date().getMonth() + 1
      if (curYear !== year || curMonth !== Number(month))
        curDayIndex.value = 0
      else
        curDayIndex.value = new Date().getDate() - 1
      scrollToDayId.value = `day-${curDayIndex.value}`
      uni.hideLoading()
    })
  }).catch(() => {
    uni.hideLoading()
    uni.showToast({
      title: `获取${currentDate.value}下的天数失败`,
    })
  })
}

// 监听当天天数的变化，重新进行请求
watch(curDayIndex, () => {
  // 判断今天有无作业，如果有在请求
  if (todayHomeworkCount.value > 0) {
    clear()
    load({ day: curDayIndex.value + 1, count: todayHomeworkCount.value })
  }
})

// 下拉刷新，重置请求参数
onPullDownRefresh(() => {
  if (todayHomeworkCount.value) {
    clear()
    load()?.then(() => {
      uni.stopPullDownRefresh()
    })
  }
  else {
    uni.stopPullDownRefresh()
  }
})
// 到达底部，加载更多
onReachBottom(() => {
  if (todayHomeworkCount.value)
    next()
})

// 加载页面时获取当前月份的作业
onLoad(() => {
  fetchDays()
})
</script>

<template>
  <div class="page-index top-bg pb-30rpx bg-[#f5f5f9] relative min-h-100vh">
    <!-- 顶部日期部分 -->
    <div>
      <!-- 自定义头部导航栏 -->
      <div class="px-30rpx mb-25rpx">
        <div :style="[tops ? `height:${tops}px` : `height: 95rpx`]" />
        <div class="text-40 font-bold h-38" :style="[height ? `height:${height}px; line-height: ${height}px` : `height: auto; line-height: normal`]">
          智慧作业教师端
        </div>
      </div>
      <!-- 选择年月 -->
      <div class="px-30rpx mb-30rpx">
        <shy-date-selector :current-date="currentDate" @date-change="onDateChange" />
      </div>
      <!-- 选择天 -->
      <div class="mb-30rpx">
        <shy-day-selector :day-list="dayList" :selected-day-index="curDayIndex" :scroll-to-day-id="scrollToDayId" @select-day="onDayChange" />
      </div>
    </div>
    <!-- 中间功能模块-快捷入口 -->
    <shy-quick-entry class="px-30rpx mb-35rpx" />
    <!-- 底部作业列表模块 -->
    <div class="px-30rpx">
      <div v-show="todayHomeworkCount">
        <div v-for="item in homeworkList" :key="item.id" class="mb-30rpx">
          <shy-card-homework
            :title="item.title" :type="item.type" :status="item.status" :start-time="item.start_time"
            :end-time="item.end_time"
            @tap="handleToPage('correction-detail')"
          >
            <div class="mb-10rpx text-26rpx font-bold text-[#000333]">
              <text class="text-36rpx text-[#00A76E]">
                {{ item.done }}
              </text>/{{ item.total }}
            </div>
            <div class="text-22rpx text-[#000333]">
              已批改人数
            </div>
          </shy-card-homework>
        </div>
      </div>
      <shy-load-more v-show="todayHomeworkCount" :is-loading="isLoading" :is-load-all="isLoadAll" @more="() => next()" />
      <GuoduEmpty v-show="!todayHomeworkCount" message="今天没有布置作业" />
    </div>
    <div class="h-40" />
  </div>
</template>
