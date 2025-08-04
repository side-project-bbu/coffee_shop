<template>
  <div class="max-w-5xl mx-auto py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
    <!-- Add Role Form + list -->
    <section class="bg-white rounded-lg shadow p-6">
      <h2 class="text-2xl font-semibold mb-6 text-gray-800">{{ t('Add New Role') }}</h2>
      <form @submit.prevent="createRole" class="flex space-x-3 mb-6">
        <input
          v-model="roleName"
          type="text"
          :placeholder="t('Role Name')"
          class="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <button
          type="submit"
          class="px-5 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          :disabled="!roleName"
        >
          {{ t('Add Role') }}
        </button>
      </form>

      <div>
        <h3 class="text-lg font-semibold mb-3 text-gray-700">{{ t('Existing Roles') }}</h3>
       <ul class="divide-y divide-gray-200 border border-gray-100 rounded-md overflow-hidden">
  <li
    v-for="role in roles"
    :key="role.id"
    class="px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition cursor-default"
  >
    <span>{{ role.name }}</span>
    <button
      @click="deleteRole(role.id)"
      class="ml-4 px-3 py-1 text-red-500 transition"
    >
       <i class="fas fa-times"></i>
    </button>
  </li>
  <li v-if="roles.length === 0" class="px-4 py-3 text-gray-400 italic">
    {{ t('No roles found.') }}
  </li>
</ul>
      </div>
    </section>

    <!-- Add Category Form + list -->
    <section class="bg-white rounded-lg shadow p-6">
      <h2 class="text-2xl font-semibold mb-6 text-gray-800">{{ t('Add New Category') }}</h2>
      <form @submit.prevent="createCategory" class="flex space-x-3 mb-6">
        <input
          v-model="categoryName"
          type="text"
          :placeholder="t('Category Name')"
          class="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        />
        <button
          type="submit"
          class="px-5 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          :disabled="!categoryName"
        >
          {{ t('Add Category') }}
        </button>
      </form>

      <div>
        <h3 class="text-lg font-semibold mb-3 text-gray-700">{{ t('Existing Categories') }}</h3>
       <ul class="divide-y divide-gray-200 border border-gray-100 rounded-md overflow-hidden">
  <li
    v-for="cat in categories"
    :key="cat.id"
    class="px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition cursor-default"
  >
    <span>{{ cat.name }}</span>
    <button
      @click="deleteCategory(cat.id)"
      class="ml-4 px-3 py-1 text-red-500 transition"
    >
      <i class="fas fa-times"></i>
    </button>
  </li>
  <li v-if="categories.length === 0" class="px-4 py-3 text-gray-400 italic">
    {{ t('No categories found.') }}
  </li>
</ul>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()

const roleName = ref('')
const categoryName = ref('')
const roles = ref([])
const categories = ref([])

async function fetchRoles() {
  try {
    const res = await axios.get('http://localhost:8000/api/roles')
    roles.value = res.data
  } catch (e) {
    console.error('Error fetching roles:', e)
  }
}

async function fetchCategories() {
  try {
    const res = await axios.get('http://localhost:8000/api/categories')
    categories.value = res.data
  } catch (e) {
    console.error('Error fetching categories:', e)
  }
}

async function createRole() {
  if (!roleName.value.trim()) return
  try {
    await axios.post('http://localhost:8000/api/roles', { name: roleName.value.trim() })
    roleName.value = ''
    fetchRoles()
    alert('Role added successfully')
  } catch (err) {
    console.error(err)
    alert('Error adding role')
  }
}

async function createCategory() {
  if (!categoryName.value.trim()) return
  try {
    await axios.post('http://localhost:8000/api/categories', { name: categoryName.value.trim() })
    categoryName.value = ''
    fetchCategories()
    alert('Category added successfully')
  } catch (err) {
    console.error(err)
    alert('Error adding category')
  }
}
async function deleteRole(id) {
  if (!confirm('Are you sure you want to delete this role?')) return
  try {
    await axios.delete(`http://localhost:8000/api/roles/${id}`)
    fetchRoles()
    alert('Role deleted successfully')
  } catch (err) {
    console.error(err)
    alert('Error deleting role')
  }
}

async function deleteCategory(id) {
  if (!confirm('Are you sure you want to delete this category?')) return
  try {
    await axios.delete(`http://localhost:8000/api/categories/${id}`)
    fetchCategories()
    alert('Category deleted successfully')
  } catch (err) {
    console.error(err)
    alert('Error deleting category')
  }
}

onMounted(() => {
  fetchRoles()
  fetchCategories()
})
</script>

<style scoped>
/* No custom styles needed, Tailwind handles it */
</style>
