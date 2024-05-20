<script setup lang="ts">
const props = defineProps<{
  currentDate: string
}>()
const emit = defineEmits(['dateChange', 'classChange'])
const selectedClassIndex = ref(0)
const classList = ref(['全部班级', '一班', '二班'])
const selectedClassName = computed(() => classList.value[selectedClassIndex.value])
const rowCurrentDate = computed(() => {
  const [year, month] = props.currentDate.split('/')
  return `${year}-${month}`
})

function onDateChange(e: { detail: { value: string } }) {
  emit('dateChange', e.detail.value)
}

function onClassChange(e: { detail: { value: number } }) {
  selectedClassIndex.value = e.detail.value
  emit('classChange', classList.value[selectedClassIndex.value])
}
</script>

<template>
  <div class="flex-between">
    <picker class="h-full" mode="date" :value="rowCurrentDate" :start="getDate('start')" :end="getDate('end')" fields="month" @change="onDateChange">
      <div class="flex relative items-center">
        <text class="text-38 font-bold color-[#000333]">
          {{ currentDate }}
        </text>
        <div class="i-carbon-chevron-down ml-17rpx text-28 text-[#778496]" />
      </div>
    </picker>
    <div class="p-x-23rpx bg-[#ffffff66] b b-2px border-[#fff] rounded-18rpx border-solid flex-center h-70 w-250 box-border">
      <picker class="w-full" mode="selector" :value="selectedClassName" :range="classList" @change="onClassChange">
        <div class="flex-between">
          <text class="text-26 text-#000333">
            {{ selectedClassName }}
          </text>
          <div class="i-carbon-chevron-down text-20 text-[#778496]" />
        </div>
      </picker>
    </div>
  </div>
</template>
