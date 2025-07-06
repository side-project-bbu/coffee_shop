<template>
  <div class="sidebar">
    <h2>Admin Panel</h2>
    <ul>
      <li><a href="#" @click.prevent="navigate('employee')" :class="{ active: currentPage === 'employee' }">Employee</a></li>
      <li><a href="#" @click.prevent="navigate('products')" :class="{ active: currentPage === 'products' }">Product</a></li>
      
    </ul>
  </div>
</template>

<script setup>
// Sidebar for admin navigation
const props = defineProps({
  currentPage: {
    type: String,
    default: 'employee'
  }
})

const emit = defineEmits(['navigate'])

const navigate = (page) => {
  emit('navigate', page)
}
</script>

<style scoped>
.sidebar {
  width: 200px;
  height: 100vh;
  background: #2c3e50;
  color: #fff;
  padding: 2rem 1rem;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.sidebar h2 {
  margin-bottom: 2rem;
  font-size: 1.5rem;
}
.sidebar ul {
  list-style: none;
  padding: 0;
  width: 100%;
}
.sidebar li {
  margin-bottom: 1.5rem;
}
.sidebar a {
  color: #fff;
  text-decoration: none;
  font-size: 1.1rem;
  transition: color 0.2s;
}
.sidebar a:hover {
  color: #42b883;
}
.sidebar a.active {
  color: #42b883;
  font-weight: bold;
  background: rgba(66, 184, 131, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  margin-left: -1rem;
}
</style>
