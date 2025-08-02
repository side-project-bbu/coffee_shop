<template> 
  <div class="relative flex items-center justify-between h-16 px-4 shadow">
    <!-- Left spacer (invisible) -->
    <div></div>

    <!-- Center title (positioned absolutely) -->
    <h1 class="absolute left-1/2 transform -translate-x-1/2 text-2xl font-semibold text-gray-800">
      {{ pageTitle }}
    </h1>

    <!-- Right content -->
    <UserProfile />
  </div>
</template>



<script setup>
import UserProfile from "@/components/UserProfile.vue"
const props = defineProps({
  pageTitle: {
    type: String,
    default: 'Dashboard'
  }
})
</script>
