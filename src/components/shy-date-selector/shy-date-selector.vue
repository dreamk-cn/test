<!-- DateSelector.vue -->
<script setup lang="ts">
const emit = defineEmits(['dateChange', 'classChange'])
const currentDate = ref(getDate(''))
const selectedClassIndex = ref(0)
const classList = ref(['全部班级', '一班', '二班'])
const selectedClassName = computed(() => classList.value[selectedClassIndex.value])

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

function onDateChange(e: { detail: { value: string } }) {
  const [year, month] = e.detail.value.split('-')
  currentDate.value = `${year}/${month}`
  emit('dateChange', currentDate.value)
}

function onClassChange(e: { detail: { value: number } }) {
  selectedClassIndex.value = e.detail.value
  emit('classChange', classList.value[selectedClassIndex.value])
}
</script>

<template>
  <div class="flex-between">
    <picker class="h-full" mode="date" :value="selectDate" :start="getDate('start')" :end="getDate('end')" fields="month" @change="onDateChange">
      <div class="flex relative items-center">
        <text class="text-38 font-bold color-[#000333]">
          {{ currentDate }}
        </text>
        <div class="i-carbon-chevron-down ml-17rpx text-28 text-[#778496]" />
      </div>
    </picker>
    <div class="p-x-23rpx bg-[#ffffff66] b b-2px border-[#fff] rounded-18rpx border-solid h-70 w-250 box-border">
      <picker mode="selector" :value="selectedClassName" :range="classList" @change="onClassChange">
        <div class="flex-between h-66">
          <text class="text-26">
            {{ selectedClassName }}
          </text>
          <div class="i-carbon-chevron-down text-20 text-[#778496]" />
        </div>
      </picker>
    </div>
  </div>
</template>
