<script setup lang="ts">
const props = defineProps({
  columns: {
    type: Number,
    default: 3,
  },
})

const gridTemplateColumns = computed(() =>
  `repeat(${props.columns}, minmax(0, 1fr))`,
)
</script>

<template>
  <div>
    <div class="py-22rpx b b-b-#E8EAF1 b-none b-solid b-l-none b-r-none b-t-none text-24rpx text-#8F9AA8 flex grid justify-between" :style="{ gridTemplateColumns }">
      <slot name="header" />
    </div>
    <slot />
  </div>
</template>

<style>
</style>
