<template>
  <!-- Show only login page -->
  <div v-if="hideLayout">
    <router-view />
  </div>

  <!-- Show layout for other pages -->
  <div v-else class="min-h-screen h-screen flex">
    <!-- Sidebar -->
    <div class="w-[220px] h-full bg-gray-500">
      <Sidebar />
    </div>

    <!-- Main area -->
    <div class="w-full h-full">
      <!-- Header -->
      <div class="h-[70px] bg-gray-100">
        <Header :pageTitle="pageTitle" />
      </div>

      <!-- Content -->
      <div class="h-[calc(100%-70px)] bg-gray-300 overflow-auto">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from './components/sidebar.vue'
import Header from './components/header.vue'

const route = useRoute()

// Hide layout on login page
const hideLayout = computed(() => route.name === 'Login')

// Dynamic page title
const pageTitle = computed(() => {
  switch (route.name) {
    case 'Employee':
      return 'Employee Management'
    case 'Products':
      return 'Product Management'
    case 'Dashboard':
      return 'Dashboard'
    case 'Suppliers':
      return 'Supplier Management'
    case 'Add':
      return 'Add New Item'
    default:
      return 'Wecome to the Coffee Shop Admin Panel!'
  }
})
</script>
