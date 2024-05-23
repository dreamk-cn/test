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
  <div class="grid" :style="{ gridTemplateColumns }">
    <slot />
  </div>
</template>
