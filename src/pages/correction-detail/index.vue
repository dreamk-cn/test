<script setup lang="ts">
import type { ECOption } from '~/widgets/guodu-echarts/echarts'

// 得分率echarts配置
const chartData1 = ref<ECOption>({
  series: [
    {
      type: 'gauge',
      pointer: {
        show: false,
      },
      itemStyle: {
        color: 'white',
      },
      progress: {
        show: true,
        width: 6,
        roundCap: true,
      },
      axisLine: {
        show: true,
        roundCap: true,
        lineStyle: {
          width: 6,
          color: [[0, '#1d8c66'], [100, '#1d8c66']],
        },
      },
      radius: '40px',
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      anchor: {
        show: false,
      },
      detail: {
        show: true,
        valueAnimation: true,
        fontSize: '14',
        offsetCenter: ['0%', '0%'],
        color: 'white',
        formatter(value) {
          return `${value}%`
        },
      },
      data: [
        {
          value: 90,
        },
      ],
    },
  ],
})

// 数据统计echarts配置
const data2 = [[40, 6], [30, 6], [20, 2], [80, 60], [50, 3], [30, 15]]
const chartData2 = ref<ECOption>({
  legend: {
    data: [
      {
        name: '正确人数',
        itemStyle: {
          color: '#fff',
          borderWidth: 2,
          borderColor: '#00a76f',
        },
      },
      {
        name: '错误人数',
        itemStyle: {
          color: '#fff',
          borderWidth: 2,
          borderColor: '#fe485f',
        },
      },
    ],
    textStyle: {
      color: '#8F9AA8',
      fontSize: '22rpx',
    },
    align: 'left',
    bottom: '0%',
    left: 'center',
    itemWidth: 6,
    itemHeight: 6,
    icon: 'circle',
    itemStyle: {
      color: '#',
    },
  },
  xAxis: {
    type: 'category',
    boundaryGap: true,
    axisTick: {
      show: false,
    },
    nameTextStyle: {

    },
    data: ['第1题', '第2题', '第3题', '第4题', '第5题', '第6题'],
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: '{value}',
    },
    splitLine: {
      lineStyle: {
        type: 'dashed',
      },
    },
  },
  grid: {
    left: 30,
    right: 35,
    top: 20,
    bottom: 30,
    containLabel: true,
  },
  series: [
    {
      name: '正确人数',
      type: 'bar',
      barGap: '0.3',
      color: ['#00A76E'],
      barWidth: '8rpx',
      data: data2.map(item => item[0]),
      itemStyle: {
        borderRadius: 20,
      },
    },
    {
      name: '错误人数',
      type: 'bar',
      color: ['#FF485E'],
      barWidth: '8rpx',
      data: data2.map(item => item[1]),
      itemStyle: {
        borderRadius: 20,
      },
    },
  ],
})

const tabs = ref(['有错', '全对', '部分批改', '未批改'])
const curTab = ref(0)

// 返回上一页
function handleClickBack() {
  uni.navigateBack()
}
</script>

<template>
  <view class="bg-[#f5f5f9]">
    <view class="px-30rpx bg-[#00A76E] color-white h-[540rpx] w-[750rpx]">
      <view class="mb-45rpx">
        <custom-nav-bar>
          <template #icon>
            <view class="i-carbon-chevron-left h-35rpx w-35rpx" @tap="handleClickBack" />
          </template>
          <template #content>
            <view class="text-32rpx font-bold text-white">
              批改详情
            </view>
          </template>
        </custom-nav-bar>
      </view>
      <view class="mb-20rpx flex items-center">
        <view class="mr-20rpx text-32rpx font-bold text-white">
          10/07·初中数学
        </view>
        <view class="b b-1 b-[#fff] rounded-22rpx b-solid text-20rpx font-bold flex-center h-44rpx w-120rpx">
          基础作业
        </view>
      </view>
      <view class="flex justify-between">
        <view class="text-24rpx text-white">
          <view class="my-37rpx">
            班级：五年级一班 数学
          </view>
          <view>
            辅码：一人一码
          </view>
          <view class="my-37rpx">
            时间：10/10 12:00 - 10/20 12:00
          </view>
        </view>
        <view>
          <view class="h-165rpx w-165rpx">
            <GuoduEcharts
              :options="chartData1" canvas-id="chartData1"
            />
          </view>
          <view class="text-22rpx text-center text-white">
            平均得分率
          </view>
        </view>
      </view>
    </view>
    <view class="transform-translate-y-[-25rpx]">
      <!-- 柱状图 -->
      <view class="pb-35rpx pt-50rpx mb-25rpx bg-white rounded-30rpx">
        <view class="px-30rpx flex justify-between items-center">
          <view class="text-30rpx font-bold text-[#000333]">
            数据统计
          </view>
          <view class="text-22rpx text-[#8F9AA8]">
            左右滑动可查看更多数据~
          </view>
        </view>
        <view class="h-430rpx w-full">
          <GuoduEcharts
            :options="chartData2" canvas-id="chartData2"
          />
        </view>
      </view>
      <!-- 最高得分率 -->
      <view class="px-30rpx pb-35rpx pt-35rpx mb-25rpx bg-white rounded-30rpx">
        <view class="mb-35rpx flex justify-between items-center">
          <view class="text-30rpx font-bold text-[#000333]">
            最高得分率
          </view>
          <view class="text-38rpx font-bold text-#00A76E relative">
            75%
            <view class="bg-#E7F3EF absolute h-6rpx bottom-4rpx left-0 right-0" />
          </view>
        </view>
        <view class="grid grid-cols-3 gap-150rpx gap-y-40rpx">
          <view v-for="item in 2" :key="item" class="flex items-center">
            <view class="i-carbon-user-filled text-27rpx text-#A9BCD3" />
            <view class="ml-18rpx text-28rpx text-#465A7B">
              小陈{{ item }}
            </view>
          </view>
        </view>
      </view>
      <!-- 最低得分率 -->
      <view class="px-30rpx pb-35rpx pt-35rpx mb-25rpx bg-white rounded-30rpx">
        <view class="mb-35rpx flex justify-between items-center">
          <view class="text-30rpx font-bold text-[#000333]">
            最低得分率
          </view>
          <view class="text-38rpx font-bold text-#FC5260 relative">
            35%
            <view class="bg-#F6E6E8 absolute h-6rpx bottom-4rpx left-0 right-0" />
          </view>
        </view>
        <view class="grid grid-cols-3 gap-150rpx gap-y-40rpx">
          <view v-for="item in 3" :key="item" class="flex items-center">
            <view class="i-carbon-user-filled text-27rpx text-#A9BCD3" />
            <view class="ml-18rpx text-28rpx text-#465A7B">
              小陈{{ item }}
            </view>
          </view>
        </view>
      </view>
      <!-- 批改状态 -->
      <view class="px-30rpx pb-100rpx pt-35rpx bg-white rounded-30rpx rounded-b-none">
        <view class="mb-40rpx flex gap-40rpx items-center">
          <view v-for="(item, index) in tabs" :key="item" class="text-28rpx font-bold transition-opacity" :class="[curTab === index ? 'text-#00A76E' : '']" @click="curTab = index">
            {{ item }}
            <view class="mx-auto mt-15rpx bg-#00A76E rounded-3rpx h-6rpx w-80% transition-opacity" :class="[curTab === index ? '' : 'opacity-0']" />
          </view>
        </view>
        <view class="py-22rpx b b-b-#E8EAF1 b-none b-solid b-l-none b-r-none b-t-none text-24rpx text-#8F9AA8 flex justify-between">
          <view class="flex-1">
            学生姓名
          </view>
          <view class="flex-1">
            批改状态
          </view>
          <view class="text-center w-130rpx">
            正确率
          </view>
        </view>
        <view class="py-28rpx b b-b-#E8EAF1 b-none b-solid b-l-none b-r-none b-t-none text-24rpx text-#000333 flex justify-between">
          <view class="flex-1">
            周小虎
          </view>
          <view class="flex-1">
            鲁迅
          </view>
          <view class="text-center text-#00A76E w-130rpx">
            10%
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
