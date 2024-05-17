<script setup lang="ts">
import type { ECOption } from '~/widgets/guodu-echarts/echarts'

// 得分率echarts配置
const chartData1 = ref<ECOption>({
  grid: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    containLabel: true,
  },
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
      radius: '95%',
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
        fontSize: '18',
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
const data2 = [[40, 6], [30, 6], [50, 16], [80, 60], [50, 3], [30, 15]]
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
      fontSize: '13',
    },
    align: 'left',
    bottom: '-2%',
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
    left: 0,
    right: 0,
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
</script>

<template>
  <view class="bg-white">
    <view class="px-30rpx pb-70rpx pt-40rpx bg-[#00A76E] color-white w-750rpx">
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
          <view class="my-35rpx">
            班级：五年级一班 数学
          </view>
          <view>
            辅码：一人一码
          </view>
          <view class="my-35rpx">
            时间：10/10 12:00 - 10/20 12:00
          </view>
        </view>
        <view>
          <view class="h-160rpx w-175rpx">
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
    <view class="bg-[#f5f5f9] rounded-30rpx transform-translate-y--25rpx">
      <!-- 柱状图 -->
      <shy-card-correctiond-details class="mb-25rpx">
        <template #header>
          <view class="py-10rpx flex justify-between items-center">
            <view class="text-30rpx font-bold text-[#000333]">
              数据统计
            </view>
            <view class="text-22rpx text-[#8F9AA8]">
              左右滑动可查看更多数据~
            </view>
          </view>
        </template>
        <view class="h-430rpx w-full">
          <GuoduEcharts
            :options="chartData2" canvas-id="chartData2"
          />
        </view>
      </shy-card-correctiond-details>
      <!-- 最高得分率 -->
      <shy-card-correctiond-details class="mb-25rpx">
        <template #header>
          <shy-card-score-rate-head title="最高得分率" accuracy="80%" :color-type="1" />
        </template>
        <view class="grid grid-cols-3 gap-150rpx gap-y-40rpx">
          <view v-for="item in 4" :key="item" class="flex items-center">
            <view class="i-carbon-user-filled text-27rpx text-#A9BCD3" />
            <view class="ml-18rpx text-28rpx text-#465A7B">
              小陈{{ item }}
            </view>
          </view>
        </view>
      </shy-card-correctiond-details>
      <!-- 最低得分率 -->
      <shy-card-correctiond-details class="mb-25rpx">
        <template #header>
          <shy-card-score-rate-head title="最底得分率" accuracy="35%" :color-type="2" />
        </template>
        <view class="grid grid-cols-3 gap-150rpx gap-y-40rpx">
          <view v-for="item in 2" :key="item" class="flex items-center">
            <view class="i-carbon-user-filled text-27rpx text-#A9BCD3" />
            <view class="ml-18rpx text-28rpx text-#465A7B">
              小陈{{ item }}
            </view>
          </view>
        </view>
      </shy-card-correctiond-details>
      <!-- 批改状态 -->
      <view class="px-30rpx pb-100rpx pt-35rpx bg-white rounded-30rpx rounded-b-none">
        <view class="mb-20rpx flex gap-40rpx items-center">
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
