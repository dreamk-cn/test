<script setup lang="ts">
import { Fetch } from '~/utils/fetch'
import { api } from '~/config/api'

interface DayType {
  id: string
  day: number
  count: number
}
interface HomeworkDetailType {
  id: string
  type: number
  total: number
  title: string
  status: number
  start_time: number
  end_time: number
  done: number
}

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

/// / 选择年月代码逻辑
function getDate(type: string) {
  const date = new Date()
  let year = date.getFullYear()
  const month = date.getMonth() + 1
  if (type === 'start')
    year = year - 60
  else if (type === 'end')
    year = year + 2
  return `${year}/${month > 9 ? month : `0${month}`}`
}
const selectDate = ref(getDate(''))
function handleSelectDate(e: { detail: { value: string } }) {
  // 拆解出年月
  const [year, month] = e.detail.value.split('-')
  // 更新页面数据
  selectDate.value = `${year}/${month}`
}

// 选择选择天代码逻辑 && 获取某天下家庭作业list
const { list: homeworkList, isLoading, isLoadAll, load, clear, next } = useFetchPage<HomeworkDetailType>(api.getHomeworkList)
const dayList = ref<Array<DayType>>([])
const curDay = ref(0)
const scrollToDay = ref('')

// 今日作业数量
const todayHomeworkCount = computed(() => {
  // 检查dayList是否有值并且curDay的值是一个有效的索引
  if (dayList.value.length > 0 && curDay.value >= 0 && curDay.value < dayList.value.length) {
    // 确保访问的是一个已定义的对象且有count属性
    return dayList.value[curDay.value].count
  }
  else {
    return 0
  }
})

// 选择天数
function handleSelectDay(index: number) {
  // 说明是通过选择年月转到此函数
  if (index < 0)
    return
  // 如果点击的天数没变化，return
  if (curDay.value !== index) {
    // 如果点击的天数不同，赋值
    curDay.value = index
    // 如果所选的天数下没有作业，清空作业列表&&return
    if (todayHomeworkCount.value === 0)
      homeworkList.value = []
  }
}

// 获取年/月下的天数及作业数量
function fetchDays() {
  uni.showLoading()
  const [year, month] = selectDate.value.split('/')
  Fetch<Array<DayType>>(api.getHomeworkDays, { method: 'GET', data: { year, month } }).then((data) => {
    dayList.value = data
    // 获取天下面的作业列表
    handleSelectDay(-1)
    // dom更新完毕
    nextTick(() => {
      const curYear = new Date().getFullYear().toString()
      const curMonth = new Date().getMonth() + 1
      if (curYear !== year || curMonth !== Number(month))
        curDay.value = 0
      else
        curDay.value = new Date().getDate() - 1
      scrollToDay.value = `day-${curDay.value}`
      uni.hideLoading()
    })
  }).catch(() => {
    uni.hideLoading()
    uni.showToast({
      title: `获取${selectDate.value}下的天数失败`,
    })
  })
}

/// / 选择班级代码逻辑（没对接接口）
const selectClass = ref('全部班级')
const classList = ref<Array<string>>(['全部班级', '一班', '二班'])
function handleSelectClass(e: { detail: { value: number } }) {
  selectClass.value = classList.value[e.detail.value]
}

// 监听当天天数的变化，重新进行请求
watch(curDay, () => {
  // 判断今天有无作业，如果有在请求
  if (todayHomeworkCount.value > 0) {
    clear()
    load({ day: curDay.value + 1, count: todayHomeworkCount.value })
  }
})

// 监听日期的变化，进行请求
watch(selectDate, () => {
  fetchDays()
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
          智慧作业教师端{{ todayHomeworkCount }}
        </div>
      </div>
      <!-- 选择年月 -->
      <div class="px-30rpx mb-30rpx flex-between">
        <picker class="h-full" mode="date" :value="selectDate" :start="getDate('start')" :end="getDate('end')" fields="month" @change="handleSelectDate">
          <div class="flex relative items-center">
            <text class="text-38 font-bold color-[#000333]">
              {{ selectDate }}
            </text>
            <div class="i-carbon-chevron-down ml-17rpx text-28 text-[#778496]" />
          </div>
        </picker>
        <div class="p-x-23rpx bg-[#ffffff66] b b-2px border-[#fff] rounded-18rpx border-solid h-70 w-250 box-border">
          <picker mode="selector" :value="selectClass" :range="classList" @change="handleSelectClass">
            <div class="flex-between h-66">
              <text class="text-26">
                {{ selectClass }}
              </text>
              <div class="i-carbon-chevron-down text-20 text-[#778496]" />
            </div>
          </picker>
        </div>
      </div>
      <!-- 选择天 -->
      <div class="mb-30rpx">
        <scroll-view class="whitespace-nowrap" scroll-x :show-scrollbar="false" :scroll-into-view="scrollToDay" scroll-with-animation>
          <div class="day-item inline-block opacity-0">
            <div class="mx-auto rounded-20rpx text-36rpx line-height-66rpx text-center h-66rpx w-1rpx transition-opacity">
              |
            </div>
            <div class="mx-auto bg-[#00A76E] rounded-1/2 h-12rpx w-12rpx transition-opacity" />
            <div class="text-22rpx line-height-34rpx text-center text-[#000333] transition-opacity">
              |
            </div>
          </div>
          <div v-for="({ id, day, count }, index) in dayList" :id="`day-${index}`" :key="id" class="day-item px-10rpx inline-block" @tap="handleSelectDay(index)">
            <div :class="[curDay === index ? 'bg-[#00A76E] text-white font-bold' : 'bg-transparent text-[#000333]'] " class="mx-auto rounded-20rpx text-36rpx line-height-66rpx text-center h-66rpx w-66rpx transition-opacity">
              {{ day }}
            </div>
            <div class="mx-auto bg-[#00A76E] rounded-1/2 h-12rpx w-12rpx transition-opacity" :class="[(count && curDay !== index) ? '' : 'opacity-0']" />
            <div class="text-22rpx line-height-34rpx text-center text-[#000333] transition-opacity" :class="[(count && curDay === index) ? '' : 'opacity-0']">
              {{ count }}份作业
            </div>
          </div>
          <div class="day-item inline-block opacity-0">
            <div class="mx-auto rounded-20rpx text-36rpx line-height-66rpx text-center h-66rpx w-1rpx transition-opacity">
              |
            </div>
            <div class="mx-auto bg-[#00A76E] rounded-1/2 h-12rpx w-12rpx transition-opacity" />
            <div class="text-22rpx line-height-34rpx text-center text-[#000333] transition-opacity">
              |
            </div>
          </div>
        </scroll-view>
      </div>
    </div>
    <!-- 中间功能模块 -->
    <shy-quick-entry class="px-30rpx mb-30rpx" />
    <!-- 底部作业列表模块 -->
    <div class="px-30rpx">
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
      <shy-load-more v-show="todayHomeworkCount" :is-loading="isLoading" :is-load-all="isLoadAll" @more="() => next()" />
      <GuoduEmpty v-show="!todayHomeworkCount" message="今天没有布置作业" />
    </div>
    <div class="h-40" />
  </div>
</template>

<style lang="scss">

</style>
