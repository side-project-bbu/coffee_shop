<template> 
  <!-- Left side - Page title -->
    <div class="flex flex-col items-center justify-center h-full text-center">
      <h1 class="text-2xl font-semibold text-gray-800">{{ pageTitle }}</h1>
    </div> 
</template>

<script setup>
const props = defineProps({
  pageTitle: {
    type: String,
    default: 'Dashboard'
  }
})
</script>
