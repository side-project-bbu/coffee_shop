<script setup>
import { defineProps, useSlots, computed } from 'vue'

const props = defineProps({
  row: Boolean,
  column: Boolean,
  gap: {
    type: String,
    default: '10px' // Can be '1rem' or 'gap-3'
  },
  equal: Boolean,
  inline: Boolean,
  itemClass: {
    type: String,
    default: ''
  }
})

const slots = useSlots()

const isGrid = computed(() => props.row && props.itemClass !== '')
const isFlexRow = computed(() => props.row && props.itemClass === '')
const isFlexColumn = computed(() => props.column || (!props.row && !props.column))

const containerClass = computed(() => {
  const classes = []
  if (isGrid.value) {
    classes.push('grid')
    if (props.gap.startsWith('gap-')) {
      classes.push(props.gap)
    }
  } else {
    classes.push('flex')
    classes.push(isFlexRow.value ? 'flex-row' : 'flex-column')
    if (props.inline && isFlexRow.value) classes.push('flex-wrap')
  }
  return classes
})

const containerStyle = computed(() => {
  if (!isGrid.value && props.gap && !props.gap.startsWith('gap-')) {
    return { gap: props.gap }
  }
  return {}
})
</script>

<template>
  <div :class="containerClass" :style="containerStyle">
    <template v-for="(child, index) in slots.default?.() || []" :key="index">
      <div
        :class="isGrid ? itemClass : ''"
        :style="(!isGrid && equal) ? { flex: 1 } : {}"
      >
     
        <component :is="child" />
      </div>
    </template>
  </div>
</template>
