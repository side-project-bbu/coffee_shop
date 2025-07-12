<template>
  <div class="flex flex-col items-center justify-center h-full text-center">
    <h1 class="text-3xl font-extrabold text-gray-800 mb-6">Product List</h1>

    <!-- Add Product Button -->
    <button 
      @click="openAddForm" 
      class="mb-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
      Add New Product
    </button>

    <!-- Product Table -->
    <div class="overflow-x-auto w-full h-full px-10">
      <table class="table-auto border-collapse w-full text-left bg-white shadow-md rounded-lg">
        <thead>
          <tr class="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th class="py-3 px-6 border-b">ID</th>
            <th class="py-3 px-6 border-b">Name</th>
            <th class="py-3 px-6 border-b">Price</th>
            <th class="py-3 px-6 border-b">Category</th>
            <th class="py-3 px-6 border-b">Available</th>
            <th class="py-3 px-6 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id" class="hover:bg-gray-50">
            <td class="py-3 px-6 border-b">{{ product.id }}</td>
            <td class="py-3 px-6 border-b">{{ product.name }}</td>
            <td class="py-3 px-6 border-b">${{ product.price }}</td>
            <td class="py-3 px-6 border-b">{{ product.category }}</td>
            <td class="py-3 px-6 border-b">{{ product.is_available ? 'Yes' : 'No' }}</td>
            <td class="py-3 px-6 border-b flex gap-2">
              <button 
                @click="deleteProduct(product.id)" 
                class="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded">
                Delete
              </button>
              <button 
                @click="openEditForm(product)" 
                class="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded">
                Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Product Modal -->
    <ComAddproduct
      v-if="showModal"
      :product="selectedProduct"
      :mode="formMode"
      @close="showModal = false"
      @submitted="handleFormSubmit"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import ComAddproduct from './ComAddproduct.vue'

const products = ref([])
const showModal = ref(false)
const selectedProduct = ref(null)
const formMode = ref('add')

const fetchProducts = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/products')
    products.value = response.data
  } catch (error) {
    console.error('Error fetching products:', error)
  }
}

const deleteProduct = async (id) => {
  if (confirm('Are you sure you want to delete this product?')) {
    try {
      await axios.delete(`http://localhost:8000/api/products/${id}`)
      fetchProducts()
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }
}

const openAddForm = () => {
  selectedProduct.value = null
  formMode.value = 'add'
  showModal.value = true
}

const openEditForm = (product) => {
  selectedProduct.value = { ...product }
  formMode.value = 'edit'
  showModal.value = true
}

const handleFormSubmit = () => {
  fetchProducts()
  showModal.value = false
  selectedProduct.value = null
  formMode.value = 'add'
}

onMounted(fetchProducts)
</script>
