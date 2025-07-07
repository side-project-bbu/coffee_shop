<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from './components/sidebar.vue'
import Header from './components/header.vue'

const route = useRoute()
const pageTitle = computed(() => {
  switch (route.name) {
    case 'Employee':
      return 'Employee Management'
    case 'Products':
      return 'Product Management'
    case 'Dashboard':
      return 'Dashboard'
    default:
      return 'Wecome to the Coffee Shop Admin Panel!'
  }
})
</script>

<template>
  <div class="min-screen h-screen flex">
    <!-- Sidebar -->
    <div class="w-[220px] h-full bg-gray-500">
      <Sidebar />
    </div>
    <div class="w-full h-full">
      <!-- Header -->
      <div class="h-[70px] bg-gray-100">
        <Header :pageTitle="pageTitle" />
      </div>
      <!-- Main Content -->
      <div class="h-[calc(100%-70px)] bg-gray-300">
        <router-view />
      </div>
    </div>
  </div>
</template>