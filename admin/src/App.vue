<script setup>
import { ref } from 'vue'
import Sidebar from './components/sidebar.vue'
import Employee from './pages/employee.vue'
import Products from './pages/products.vue'

const currentPage = ref('employee')

const handleNavigation = (page) => {
  currentPage.value = page
}
</script>

<template>
  <div style="display: flex;">
    <Sidebar @navigate="handleNavigation" :current-page="currentPage" />
    <div style="margin-left: 200px; width: 100%; padding: 2rem;">
      <Employee v-if="currentPage === 'employee'" />
      <Products v-if="currentPage === 'products'" />
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
