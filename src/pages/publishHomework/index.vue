<script setup lang="ts">
/// / 发布班级
const showHomeworkClass = ref(false)
const rawHomeworkClass = [{ id: 'class-1', name: '五年级1班数学' }, { id: 'class-2', name: '五年级3班数学' }, { id: 'class-4', name: '五年级6班数学' }]
const homeworkClass = ref(rawHomeworkClass.map((item) => {
  return { ...item, checked: false }
}))
// 存储选中的班级id
const selectedHomeworkClass = ref<Array<string>>([])
// 选择班级事件
function handleSelectHomeworkClass(e: { detail: { value: Array<string> } }) {
  selectedHomeworkClass.value = e.detail.value
  homeworkClass.value.forEach((item, index) => {
    if (selectedHomeworkClass.value.includes(item.id))
      homeworkClass.value[index].checked = true
    else
      homeworkClass.value[index].checked = false
  })
}
// 通过选择的id列表过滤出对应的name，方便展示
const selectedHomeworkClassMessage = computed(() => {
  return homeworkClass.value.filter(item => selectedHomeworkClass.value.includes(item.id)).map((item) => {
    return item.name
  })
})
// 作业类型
const homeworkType = ['基础', '分组', '分层']
const curHomeworkType = ref(0)
function changeHomeworkType(index: number) {
  curHomeworkType.value = index
}

// 预计时常
const time = ref(30)
function changeTime(num: number) {
  if (time.value + num <= 0) {
    uni.showToast({
      title: `不能低于${time.value}分钟`,
      icon: 'error',
    })
    return
  }
  time.value += num
}

// 发布时间 && 批改结束时间
function getDate(type: string) {
  const date = new Date()
  let year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  if (type === 'start')
    year = year - 60
  else if (type === 'end')
    year = year + 2

  return `${year}-${month > 9 ? month : `0${month}`}-${day > 9 ? day : `0${day}`}`
}
const startTime = ref(getDate(''))
const endTime = ref(getDate(''))
function handleSelectStartTime(e: { detail: { value: string } }) {
  startTime.value = e.detail.value
}
function handleSelectEndTime(e: { detail: { value: string } }) {
  endTime.value = e.detail.value
}

/// / 设置成绩
const isScore = ref(false)
function handleSetScore(e: Event) {
  const event = e as CustomEvent<{ value: boolean }>
  isScore.value = event.detail.value
}

// 批改类型 && 铺码方式
const correctionType = ref(-1)
const codingMethod = ref(-1)
function handleChangeCorrectionType(e: { detail: { value: number } }) {
  correctionType.value = e.detail.value
  if (correctionType.value === 0)
    codingMethod.value = 0
  else
    codingMethod.value = 1
}
function handleChangeCodingMethod(e: { detail: { value: number } }) {
  codingMethod.value = e.detail.value
}
const correctionTypeMessage = computed(() => {
  if (correctionType.value === -1)
    return '请选择'
  else if (correctionType.value === 0)
    return '批改框批改'
  else
    return '采集卡批改'
})
const codingMethodMessage = computed(() => {
  if (codingMethod.value === -1)
    return '请选择'
  else if (codingMethod.value === 0)
    return '整班铺码(印刷教辅专用)'
  else
    return '一人一码(打印作业专用)'
})

/// / 发布作业
function handlePublishHomework() {
  uni.showModal({
    title: '提示',
    content: `
      class-id:${selectedHomeworkClass.value};
      homework-type:${curHomeworkType.value};
      start-time:${startTime.value};
      end-time:${endTime.value};
      issetScore:${isScore.value};
      
    `,
  })
}
</script>

<template>
  <div class="bg-#f5f5f9 min-h-100vh">
    <!-- 自定义nav-bar -->
    <div class="px-30rpx pb-60rpx bg-#00A76E">
      <shy-custom-nav-bar>
        <div class="flex w-250 items-center">
          <div class="i-carbon-chevron-left text-white h-35rpx w-35rpx" @tap="handleBackPage" />
        </div>
        <div class="text-center w-250">
          <div class="text-32rpx font-bold text-white">
            发布作业
          </div>
        </div>
        <div class="w-250" />
      </shy-custom-nav-bar>
    </div>
    <div class="transform-translate-y--25rpx">
      <!-- 作业名称 & 发布班级 -->
      <div class="px-30rpx pt-40rpx mb-25rpx bg-white rounded-30rpx">
        <div class="pb-35rpx mb-35rpx border-b b-#EBEBEB b-solid b-l-none b-r-none b-t-none flex">
          <div class="flex flex-1 flex-col justify-between">
            <div class="text-24rpx text-#000333">
              作业名称
            </div>
            <input class="placeholder-[#000333] text-32rpx text-#000333" placeholder="请输入作业名称">
          </div>
          <div class="h-107rpx w-126rpx">
            <image class="h-full w-full" src="../../static/icon/publish-homework/publish-homework.png" mode="aspectFill" />
          </div>
        </div>
        <div class="pb-35rpx flex justify-between">
          <div class="text-30rpx text-#000333">
            发布班级
          </div>
          <div class="text-right flex gap-15rpx items-center" @tap="showHomeworkClass = true">
            <div v-for="(item, index) in selectedHomeworkClassMessage" :key="index" class="px-18rpx py-12rpx bg-#E2F8F0 rounded-30rpx text-22rpx text-#00A76E">
              {{ item }}
            </div>
            <div v-show="selectedHomeworkClass.length === 0" class="text-30rpx text-#8F9AA8">
              请选择
            </div>
            <div class="i-carbon-chevron-right text-#B9C1D0" />
          </div>
        </div>
      </div>
      <!-- 发布时间、批改结束时间、作业类型 -->
      <div class="px-30rpx py-35rpx mb-25rpx bg-white rounded-30rpx">
        <div class="pb-35rpx mb-35rpx b-b b-b-#EBEBEB b-b-solid flex justify-between items-center">
          <div class="text-30rpx text-#000333">
            发布时间
          </div>
          <picker :value="startTime" mode="date" :start="getDate('start')" :end="getDate('end')" @change="handleSelectStartTime">
            <div class="flex gap-15rpx items-center">
              <div class="text-30rpx text-#8F9AA8">
                {{ startTime }}
              </div>
              <div class="i-carbon-chevron-right text-#B9C1D0" />
            </div>
          </picker>
        </div>
        <div class="pb-35rpx mb-35rpx b-b b-b-#EBEBEB b-b-solid flex justify-between items-center">
          <div class="text-30rpx text-#000333">
            批改结束时间
          </div>
          <picker :value="endTime" mode="date" :start="getDate('start')" :end="getDate('end')" @change="handleSelectEndTime">
            <div class="flex gap-15rpx items-center">
              <div class="text-30rpx text-#8F9AA8">
                {{ endTime }}
              </div>
              <div class="i-carbon-chevron-right text-#B9C1D0" />
            </div>
          </picker>
        </div>
        <div class="flex justify-between items-center">
          <div class="text-30rpx text-#000333">
            作业类型
          </div>
          <div class="text-right flex gap-30rpx items-center">
            <div v-for="(item, index) in homeworkType" :key="item" class="flex items-center" @tap="changeHomeworkType(index)">
              <div class="rounded-1/2 relative h-36rpx w-36rpx" :class="[curHomeworkType === index ? 'bg-#00A76E' : 'b-2 border-solid border-[#d4dce8]']">
                <div class="bg-white rounded-1/2 absolute h-16rpx w-16rpx left-50% top-50% transform-translate--50%" />
              </div>
              <div class="ml-15rpx text-30rpx text-#000333">
                {{ item }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 预计时常、批改类型、辅码方式 -->
      <div class="px-30rpx py-35rpx mb-25rpx bg-white rounded-30rpx">
        <div class="pb-35rpx mb-35rpx b-b b-b-#EBEBEB b-b-solid flex justify-between items-center">
          <div class="text-30rpx text-#000333">
            预计时常(分钟)
          </div>
          <div class="text-right flex gap-48rpx items-center">
            <div class="b-2 b-#ccd0d9 rounded-10rpx b-solid flex-center h-40rpx w-40rpx" @tap="changeTime(-5)">
              <div class="i-carbon-subtract text-#000333" />
            </div>
            <div class="text-30rpx font-bold text-#000333">
              {{ time }}
            </div>
            <div class="b-2 b-#ccd0d9 rounded-10rpx b-solid flex-center h-40rpx w-40rpx" @tap="changeTime(5)">
              <div class="i-carbon-add text-#000333" />
            </div>
          </div>
        </div>
        <div class="pb-35rpx mb-35rpx b-b b-b-#EBEBEB b-b-solid flex justify-between items-center">
          <div class="text-30rpx text-#000333">
            批改类型
          </div>
          <picker :range="['批改框批改', '采集卡批改']" :value="correctionType" @change="handleChangeCorrectionType">
            <div class="text-right flex gap-15rpx items-center">
              <div class="text-30rpx text-#8F9AA8">
                {{ correctionTypeMessage }}
              </div>
              <div class="i-carbon-chevron-right text-#B9C1D0" />
            </div>
          </picker>
        </div>
        <div class="flex justify-between items-center">
          <div class="text-30rpx text-#000333 flex items-center">
            <div class="text-30rpx">
              辅码方式
            </div>
            <div class="i-carbon-help ml-25rpx text-#adb8c8 h-30rpx w-30rpx" />
          </div>
          <picker :range="['整班铺码(印刷教辅专用)', '一人一码(打印作业专用)']" :disabled="correctionType === 1" @change="handleChangeCodingMethod">
            <div class="text-right flex gap-15rpx items-center">
              <div class="text-30rpx text-#8F9AA8">
                {{ codingMethodMessage }}
              </div>
              <div class="i-carbon-chevron-right text-#B9C1D0" />
            </div>
          </picker>
        </div>
      </div>
      <!-- 设置分数 py比较特殊 -->
      <div class="px-30rpx py-22rpx mb-25rpx bg-white rounded-30rpx">
        <div class="flex justify-between items-center">
          <div class="text-30rpx text-#000333">
            设置分数
          </div>
          <div class="flex-center">
            <switch color="#00A76E" :checked="isScore" @change="handleSetScore" />
          </div>
        </div>
      </div>
      <!-- 题目 -->
      <div class="px-30rpx py-35rpx mb-25rpx bg-white rounded-30rpx">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <div class="i-carbon-license-draft text-38rpx text-#00a76e" />
            <div class="ml-15rpx text-30rpx font-bold text-#000333">
              11.28 初中数学
            </div>
          </div>
          <div class="i-carbon-delete text-40rpx text-#fc5260" />
        </div>
        <div class="ml-40rpx mt-40rpx text-24rpx text-#000333 flex justify-between">
          <div>第1页，共9题</div>
          <div>第2页，共5题</div>
          <div>第3页，共10题</div>
        </div>
      </div>
      <!-- 题目 -->
      <div class="px-30rpx py-35rpx mb-25rpx bg-white rounded-30rpx">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <div class="i-carbon-license-draft text-38rpx text-#00a76e" />
            <div class="ml-15rpx text-30rpx font-bold text-#000333">
              11.28 初中英语
            </div>
          </div>
          <div class="i-carbon-delete text-40rpx text-#fc5260" />
        </div>
        <div class="ml-40rpx mt-40rpx text-24rpx text-#000333 flex justify-between">
          <div>第1页，共4题</div>
          <div>第2页，共5题</div>
          <div>第3页，共6题</div>
        </div>
      </div>
      <!-- 按钮区域 -->
      <div class="px-30rpx pb-65rpx mt-100rpx flex justify-between">
        <div class="bg-#FFFFFF rounded-20rpx flex-center h-100rpx w-320rpx">
          <div class="text-34rpx text-#000333">
            添加作业
          </div>
        </div>
        <div class="bg-#00A76E rounded-20rpx flex-center h-100rpx w-320rpx" @tap="handlePublishHomework()">
          <div class="i-carbon-send-alt-filled mr-14rpx text-32rpx text-#ffffff" />
          <div class="text-34rpx text-#ffffff">
            发布作业
          </div>
        </div>
      </div>
    </div>
    <!-- 抽屉 -->
    <GuoduDrawer
      :visible="showHomeworkClass"
      :mask-click="true"
      mode="bottom"
      size="40%"
      :radius="true"
      @close="showHomeworkClass = false"
    >
      <template #header>
        <GuoduDrawerHeader class="bg-#f5f5f9 rounded-20rpx" title="请选择班级" @close="showHomeworkClass = false" />
      </template>
      <div class="bg-#f5f5f9 h-full">
        <checkbox-group class="px-30rpx text-center text-#000333 grid grid-cols-2 gap-20rpx" @change="handleSelectHomeworkClass">
          <label v-for="item in homeworkClass" :key="item.id" class="p-20rpx bg-white rounded-15rpx text-32rpx flex items-center">
            <checkbox color="#00a76e" :value="item.id" :checked="item.checked" />{{ item.name }}
          </label>
        </checkbox-group>
      </div>
    </GuoduDrawer>
  </div>
</template>
