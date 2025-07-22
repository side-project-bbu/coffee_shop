<template>
  <div class="max-w-4xl mx-auto py-8 flex space-x-8">
    <!-- Add Role Form + its list -->
    <div class="w-1/2">
      <h2 class="text-xl font-semibold mb-2">Add New Role</h2>
      <div class="flex">
        <input
          v-model="roleName"
          type="text"
          placeholder="Role name"
          class="flex-1 px-3 py-2 border rounded"
        />
        <button
          @click="createRole"
          class="ml-2 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Add Role
        </button>
      </div>
      <div class="py-4">
        <h3 class="text-lg font-semibold mb-2">Existing Roles</h3>
        <ul class="list-disc list-inside">
          <li v-for="role in roles" :key="role.id">{{ role.name }}</li>
        </ul>
      </div>
    </div>

    <!-- Add Category Form + its list -->
    <div class="w-1/2">
      <h2 class="text-xl font-semibold mb-2">Add New Category</h2>
      <div class="flex">
        <input
          v-model="categoryName"
          type="text"
          placeholder="Category name"
          class="flex-1 px-3 py-2 border rounded"
        />
        <button
          @click="createCategory"
          class="ml-2 px-4 py-2 bg-green-600 text-white rounded"
        >
          Add Category
        </button>
      </div>
      <div class="py-4">
        <h3 class="text-lg font-semibold mb-2">Existing Categories</h3>
        <ul class="list-disc list-inside">
          <li v-for="cat in categories" :key="cat.id">{{ cat.name }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const roleName = ref('')
const categoryName = ref('')
const roles = ref([])
const categories = ref([])

async function fetchRoles() {
  const res = await axios.get('http://localhost:8000/api/roles')
  roles.value = res.data
}

async function fetchCategories() {
  const res = await axios.get('http://localhost:8000/api/categories')
  categories.value = res.data
}

async function createRole() {
  if (!roleName.value) return
  try {
    await axios.post('http://localhost:8000/api/roles', { name: roleName.value })
    roleName.value = ''
    fetchRoles()
    alert('Role added successfully')
  } catch (err) {
    console.error(err)
    alert('Error adding role')
  }
}

async function createCategory() {
  if (!categoryName.value) return
  try {
    await axios.post('http://localhost:8000/api/categories', { name: categoryName.value })
    categoryName.value = ''
    fetchCategories()
    alert('Category added successfully')
  } catch (err) {
    console.error(err)
    alert('Error adding category')
  }
}

onMounted(() => {
  fetchRoles()
  fetchCategories()
})
</script>

<style scoped>
/* Add any custom styles here if needed */
</style>
