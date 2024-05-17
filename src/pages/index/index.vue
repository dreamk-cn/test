<script setup lang="ts">
import { Fetch } from '~/utils/fetch'
import { api } from '~/config/api'

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

/// / 功能快捷入口
const quickEntryList = [
  { name: '发布作业', imgUrl: `../../static/icon/index-setion/section1.png`, page: 'publish-homework' },
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

  uni.navigateTo({
    url: `/pages/${name}/index`,
  })
}

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
  // 发送请求
  getDays(year, month)
}

// 选择选择天代码逻辑 && 获取某天下家庭作业list
const dayList = ref<Array<DayList>>([])
const curDay = ref(new Date().getDate() - 1)
const scrollToDay = ref('')
const homeworkList = ref<Array<HomeworkDetail>>([])
function handleSelectDay(index: number | undefined) {
  // 如果点击的天数没变化，return
  if (curDay.value === index)
    return
  // 如果点击的天数不同，赋值
  if (typeof index === 'number' && index !== curDay.value)
    curDay.value = index

  // 如果所选的天数下没有作业，清空作业列表&&return
  if (dayList.value[curDay.value].count === 0) {
    homeworkList.value = []
    return
  }
  // 发送请求渲染数据
  uni.showLoading()
  Fetch<HomeworkList>(api.getHomeworkList, { method: 'GET', data: { day: curDay.value + 1, count: dayList.value[curDay.value].count } }).then((data) => {
    homeworkList.value = data.list
    uni.hideLoading()
  }).catch(() => {
    uni.showToast({
      title: `获取${selectDate.value}下的天数失败`,
    })
  })
}
// 获取年/月下的天数及作业数量
function getDays(year: string, month: string) {
  uni.showLoading()
  Fetch<Array<DayList>>(api.getHomeworkDays, { method: 'GET', data: { year, month } }).then((data) => {
    dayList.value = data
    uni.hideLoading()
    // 获取天下面的作业列表
    handleSelectDay(undefined)
    // dom更新完毕
    nextTick(() => {
      const curMonth = new Date().getMonth() + 1
      if (curMonth !== Number(month))
        curDay.value = 0
      scrollToDay.value = `day-${curDay.value}`
    })
  }).catch(() => {
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

// 加载页面时获取当前月份的作业
onLoad(() => {
  const [year, month] = selectDate.value.split('/')
  getDays(year, month)
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
      <div class="flex-between px-30rpx mb-30rpx">
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
          <div v-for="({ id, day, count }, index) in dayList" :id="`day-${index}`" :key="id" class="day-item px-10rpx inline-block" @tap="handleSelectDay(index)">
            <div :class="[curDay === index ? 'bg-[#00A76E] text-white font-bold' : 'bg-transparent text-[#000333]'] " class="mx-auto rounded-20rpx text-36rpx line-height-66rpx text-center h-66rpx w-66rpx transition-opacity">
              {{ day }}
            </div>
            <div class="mx-auto bg-[#00A76E] rounded-1/2 h-12rpx w-12rpx transition-opacity" :class="[(count && curDay !== index) ? '' : 'opacity-0']" />
            <div class="text-22rpx line-height-34rpx text-center text-[#000333] transition-opacity" :class="[(count && curDay === index) ? '' : 'opacity-0']">
              {{ count }}份作业
            </div>
          </div>
        </scroll-view>
      </div>
      <div />
    </div>
    <!-- 中间功能模块 -->
    <div class="px-30rpx mb-30rpx grid grid-cols-4 gap-y-30rpx">
      <div v-for="(item, index) in quickEntryList" :key="index" @tap="handleTo(item.page)">
        <div class="mx-auto h-100 w-120">
          <image class="h-full w-full" :src="item.imgUrl" mode="aspectFill" />
        </div>
        <div class="mt-17rpx text-22rpx text-center text-[#000333]">
          {{ item.name }}
        </div>
      </div>
    </div>
    <!-- 底部作业列表模块 -->
    <div class="px-30rpx">
      <div v-for="item in homeworkList" :key="item.id" class="mb-30rpx">
        <shy-card-homework
          :title="item.title" :type="item.type" :status="item.status" :start-time="item.start_time"
          :end-time="item.end_time"
          @tap="handleTo('correction-detail')"
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
      <GuoduEmpty v-show="!homeworkList.length" message="今天没有布置作业" />
    </div>
  </div>
</template>

<style lang="scss">
.page-index {
  .day-item {
    &:first-child {
      padding-left: 30rpx;
    }
    &:last-child {
      padding-right: 30rpx;
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
