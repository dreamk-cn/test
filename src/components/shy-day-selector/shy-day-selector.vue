<!-- DayPicker.vue -->
<script setup lang="ts">
interface DayItemType {
  id: number
  day: string
  count?: number // 作业数量
}

const props = withDefaults(defineProps<{
  dayList: DayItemType[]
  selectedDayIndex: number
  scrollToDayId: string
}>(), {
  dayList: () => [],
  selectedDayIndex: 0,
})

const emits = defineEmits(['selectDay'])

function selectDay(index: number) {
  emits('selectDay', index)
}
</script>

<template>
  <scroll-view class="whitespace-nowrap" scroll-x :show-scrollbar="false" :scroll-into-view="props.scrollToDayId" scroll-with-animation>
    <div class="px-20rpx h-full w-full whitespace-nowrap">
      <div v-for="({ id, day, count }, index) in props.dayList" :id="`day-${index}`" :key="id" class="day-item px-10rpx inline-block" @tap="selectDay(index)">
        <div :class="[selectedDayIndex === index ? 'bg-[#00A76E] text-white font-bold' : 'bg-transparent text-[#000333]'] " class="mx-auto rounded-20rpx text-36rpx line-height-66rpx text-center h-66rpx w-66rpx transition-opacity">
          {{ day }}
        </div>
        <div class="mx-auto bg-[#00A76E] rounded-1/2 h-12rpx w-12rpx transition-opacity" :class="[(count && props.selectedDayIndex !== index) ? '' : 'opacity-0']" />
        <div class="text-22rpx line-height-34rpx text-center text-[#000333] transition-opacity" :class="[(count && props.selectedDayIndex === index) ? '' : 'opacity-0']">
          {{ count }}份作业
        </div>
      </div>
    </div>
  </scroll-view>
</template>
