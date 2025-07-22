<template>
  <div class="flex flex-col items-center justify-center h-full text-center">
    <div class="flex justify-between items-center mb-6 w-full px-10">
      <h1 class="text-3xl font-extrabold text-gray-800">Suppliers</h1>
    </div>
    <button
      @click="openAddForm"
      class="fixed bottom-8 right-8 z-50 bg-blue-500 hover:bg-blue-600 text-white font-bold w-16 h-16 flex items-center justify-center text-4xl rounded-full shadow-lg p-0"
    >
      <span class="w-full h-full flex items-center justify-center mb-2">+</span>
    </button>

    <div class="overflow-x-auto w-full h-full px-10">
      <table class="table-auto border-collapse w-full text-left bg-white shadow-md rounded-lg">
        <thead>
          <tr class="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th class="py-3 px-6 border-b">ID</th>
            <th class="py-3 px-6 border-b">Name</th>
            <th class="py-3 px-5 border-b">Phone Number</th>
            <th class="py-3 px-6 border-b">Email Address</th>
            <th class="py-3 px-6 border-b">Address</th>
            <th class="py-3 px-6 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="supplier in suppliers" :key="supplier.id">
            <td class="py-3 px-6 border-b">{{ supplier.id }}</td>
            <td class="py-3 px-6 border-b">{{ supplier.name }}</td>
            <td class="py-3 px-6 border-b">{{ supplier.phone_number }}</td>
            <td class="py-3 px-6 border-b">
              <button 
                @click="deleteSupplier(supplier.id)" 
                class="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 w-20 rounded">
                Delete
              </button>
              <button 
                @click="editSupplier(supplier)" 
                class="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 w-20 rounded">
                Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <ComAddsuppliers
      v-if="showModal"
      :product="selectedProduct"
      :mode="formMode"
      @close="showModal = false"
      @submitted="handleFormSubmit"
    />
</template>

<script setup>
import ComAddsuppliers from './ComAddsuppliers.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'
const selectedProduct = ref(null)
const formMode = ref('add')
const suppliers = ref([])
const showModal = ref(false)


const fetchSuppliers = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/suppliers")
    suppliers.value = response.data
  } catch (error) {
    console.error("Error fetching suppliers:", error)
  }
}

const deleteSupplier = async (id) => {
  try {
    await axios.delete(`http://localhost:8000/api/suppliers/${id}`)
    suppliers.value = suppliers.value.filter(s => s.id !== id)
  } catch (error) {
    console.error("Error deleting supplier:", error)
  }
}

const openAddForm = () => {
  selectedProduct.value = null
  formMode.value = 'add'
  showModal.value = true
  
}

// const openEditForm = (product) => {
//   selectedProduct.value = { ...product }
//   formMode.value = 'edit'
//   showModal.value = true
// }

// const handleFormSubmit = () => {
//   fetchProducts()
//   showModal.value = false
//   selectedProduct.value = null
//   formMode.value = 'add'
// }

const editSupplier = (supplier) => {
  // Open modal or set supplier to be edited
  console.log("Edit supplier:", supplier)
}

onMounted(() => {
  fetchSuppliers()
})
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
