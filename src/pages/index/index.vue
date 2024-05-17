<script setup lang="ts">
import { Fetch } from '~/utils/fetch'
import { api } from '~/config/api'

// 自定义头部
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

interface DayList {
  id: string
  day: number
  count: number
}
interface HomeworkDetail {
  id: string
  type: number
  total: number
  title: string
  status: number
  start_time: number
  end_time: number
  done: number
}
interface HomeworkList {
  count: number
  list: Array<HomeworkDetail>
  page_no: number
  page_size: number
}

// 选择年月代码逻辑
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
const startDate = computed(() => getDate('start'))
const endDate = computed(() => getDate('end'))
function handleSelectDate(e: { detail: { value: string } }) {
  const [year, month] = e.detail.value.split('-')
  selectDate.value = `${year}/${month}`
  getDays(year, month)
}

// 选择选择天代码逻辑
const dayList = ref<Array<DayList>>([])
const curDay = ref(new Date().getDate() - 1)
const homeworkList = ref<Array<HomeworkDetail>>([])
async function handleSelectDay(index: number | undefined) {
  if (curDay.value === index)
    return
  if (typeof index === 'number' && index !== curDay.value)
    curDay.value = index

  if (dayList.value[curDay.value].count === 0) {
    homeworkList.value = []
    return
  }
  // 发送请求渲染数据
  uni.showLoading()
  Fetch<HomeworkList>(api.getHomeworkDetail, { method: 'GET', data: { day: curDay.value + 1, count: dayList.value[curDay.value].count } }).then((data) => {
    homeworkList.value = data.list
    uni.hideLoading()
  }).catch(() => {
    uni.showToast({
      title: `获取${selectDate.value}下的天数失败`,
    })
  })
}
// 获取年/月下的天数及作业数量
async function getDays(year: string, month: string) {
  uni.showLoading()
  Fetch<Array<DayList>>(api.getHomeworkList, { method: 'GET', data: { year, month } }).then((data) => {
    curDay.value = 0
    dayList.value = data
    uni.hideLoading()
    handleSelectDay(undefined)
  }).catch(() => {
    uni.showToast({
      title: `获取${selectDate.value}下的天数失败`,
    })
  })
}

// 选择班级代码逻辑
const selectClass = ref('全部班级')
const classList = ref<Array<string>>(['全部班级', '一班', '二班'])
function handleSelectClass(e: { detail: { value: number } }) {
  selectClass.value = classList.value[e.detail.value]
}

// 跳转页面
function handleTo(name: string) {
  uni.navigateTo({
    url: `/pages/${name}/index`,
  })
}

// 加载页面时获取当前月份的作业
onLoad(() => {
  const [year, month] = selectDate.value.split('/')
  getDays(year, month)
})
</script>

<template>
  <view class="page-index top-bg pb-30rpx bg-[#f5f5f9] relative min-h-100vh">
    <!-- 顶部日期部分 -->
    <view>
      <!-- 自定义头部导航栏 -->
      <view class="px-30rpx mb-25rpx">
        <view :style="[tops ? `height:${tops}px` : `height: 95rpx`]" />
        <view class="text-40 font-bold h-38" :style="[height ? `height:${height}px; line-height: ${height}px` : `height: auto; line-height: normal`]">
          智慧作业教师端
        </view>
      </view>
      <!-- 选择年月 -->
      <view class="px-30rpx mb-30rpx flex justify-between items-center">
        <picker class="h-full" mode="date" :value="selectDate" :start="startDate" :end="endDate" fields="month" @change="handleSelectDate">
          <view class="flex relative items-center">
            <text class="text-38 font-bold color-[#000333]">
              {{ selectDate }}
            </text>
            <view class="i-carbon-chevron-down ml-17rpx text-28 text-[#778496]" />
          </view>
        </picker>
        <view class="p-x-23rpx bg-[#ffffff66] b b-2px border-[#fff] rounded-18rpx border-solid h-70 w-250 box-border">
          <picker mode="selector" :value="selectClass" :range="classList" @change="handleSelectClass">
            <view class="flex h-66 justify-between items-center">
              <text class="text-26">
                {{ selectClass }}
              </text>
              <view class="i-carbon-chevron-down text-20 text-[#778496]" />
            </view>
          </picker>
        </view>
      </view>
      <!-- 选择天 -->
      <view class="mb-30rpx">
        <scroll-view class="whitespace-nowrap" scroll-x :show-scrollbar="false">
          <view v-for="({ id, day, count }, index) in dayList" :key="id" class="day-item mx-10rpx inline-block" @tap="handleSelectDay(index)">
            <view :class="[curDay === index ? 'bg-[#00A76E] text-white font-bold' : 'bg-transparent text-[#000333]'] " class="mx-auto rounded-20rpx text-36rpx line-height-66rpx text-center h-66rpx w-66rpx transition-opacity">
              {{ day }}
            </view>
            <view class="mx-auto bg-[#00A76E] rounded-1/2 h-12rpx w-12rpx transition-opacity" :class="[(count && curDay !== index) ? '' : 'opacity-0']" />
            <view class="text-22rpx line-height-34rpx text-center text-[#000333] transition-opacity" :class="[(count && curDay === index) ? '' : 'opacity-0']">
              {{ count }}份作业
            </view>
          </view>
        </scroll-view>
      </view>
      <view />
    </view>
    <!-- 中间功能模块 -->
    <view class="px-30rpx mb-30rpx grid grid-cols-4 gap-y-30rpx">
      <view @tap="handleTo('publish-homework')">
        <view class="mx-auto h-100 w-120">
          <image class="h-full w-full" src="..\..\static\icon\index-setion\section1.png" mode="aspectFill" />
        </view>
        <view class="mt-17rpx text-22rpx text-center text-[#000333]">
          发布作业
        </view>
      </view>
      <view>
        <view class="mx-auto h-100 w-120">
          <image class="h-full w-full" src="..\..\static\icon\index-setion\section2.png" mode="aspectFill" />
        </view>
        <view class="mt-17rpx text-22rpx text-center text-[#000333]">
          批改作业
        </view>
      </view>
      <view>
        <view class="mx-auto h-100 w-120">
          <image class="h-full w-full" src="..\..\static\icon\index-setion\section3.png" mode="aspectFill" />
        </view>
        <view class="mt-17rpx text-22rpx text-center text-[#000333]">
          发布学习计划
        </view>
      </view>
      <view>
        <view class="mx-auto h-100 w-120">
          <image class="h-full w-full" src="..\..\static\icon\index-setion\section4.png" mode="aspectFill" />
        </view>
        <view class="mt-17rpx text-22rpx text-center text-[#000333]">
          共性错题分析
        </view>
      </view>
      <view>
        <view class="mx-auto h-100 w-120">
          <image class="h-full w-full" src="..\..\static\icon\index-setion\section5.png" mode="aspectFill" />
        </view>
        <view class="mt-17rpx text-22rpx text-center text-[#000333]">
          离线批改
        </view>
      </view>
      <view>
        <view class="mx-auto h-100 w-120">
          <image class="h-full w-full" src="..\..\static\icon\index-setion\section6.png" mode="aspectFill" />
        </view>
        <view class="mt-17rpx text-22rpx text-center text-[#000333]">
          学情分析
        </view>
      </view>
      <view>
        <view class="mx-auto h-100 w-120">
          <image class="h-full w-full" src="..\..\static\icon\index-setion\section7.png" mode="aspectFill" />
        </view>
        <view class="mt-17rpx text-22rpx text-center text-[#000333]">
          挑题组卷
        </view>
      </view>
      <view>
        <view class="mx-auto h-100 w-120">
          <image class="h-full w-full" src="..\..\static\icon\index-setion\section8.png" mode="aspectFill" />
        </view>
        <view class="mt-17rpx text-22rpx text-center text-[#000333]">
          我的积分
        </view>
      </view>
    </view>
    <!-- 底部作业列表模块 -->
    <view class="px-30rpx">
      <view v-for="item in homeworkList" :key="item.id" class="mb-30rpx">
        <card-homework
          :title="item.title" :type="item.type" :status="item.status" :start-time="item.start_time"
          :end-time="item.end_time"
          @tap="handleTo('correction-detail')"
        >
          <view class="mb-10rpx text-26rpx font-bold text-[#000333]">
            <text class="text-36rpx text-[#00A76E]">
              {{ item.done }}
            </text>/{{ item.total }}
          </view>
          <view class="text-22rpx text-[#000333]">
            已批改人数
          </view>
        </card-homework>
      </view>
      <GuoduEmpty v-show="!homeworkList.length" message="今天没有布置作业" />
    </view>
  </view>
</template>

<style lang="scss">
.page-index {
  .day-item {
    &:first-child {
      margin-left: 30rpx;
    }
    &:last-child {
      margin-right: 30rpx;
    }
  }
  scroll-view::-webkit-scrollbar {
    display: none; /* 隐藏滚动条 */
    width: 0;
    height: 0;
    color: transparent;
  }
}
</style>
