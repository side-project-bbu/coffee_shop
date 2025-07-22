<template>
  <div class="fixed inset-0 flex items-center justify-center z-50" style="background-color: rgba(0,0,0,0.4);">
    <div class="bg-white p-6 rounded-lg shadow-lg w-[400px]">
      <h2 class="text-xl font-bold mb-4">
        {{ mode === 'edit' ? 'Edit Product' : 'Add Product' }}
      </h2>
      <form @submit.prevent="submitForm">
        <p class="flex items-center mb-2">Product Name</p>
        <input
          type="text"
          v-model="name"
          placeholder="Product Name"
          class="border px-3 py-2 w-full mb-3"
        />
        <p class="flex items-center mb-2">Price</p>
        <input
          type="number"
          v-model="price"
          placeholder="Price"
          class="border px-3 py-2 w-full mb-3"
        />
        <p class="flex items-center mb-2">Select Category</p>
        <select v-model="category" class="border px-3 py-2 w-full mb-3">
          <option value="" disabled>Select Category</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.name }}
          </option>
        </select>

        <div class="flex items-center mb-4">
          <input type="checkbox" id="isAvailable" v-model="isAvailable" class="mr-2" />
          <label for="isAvailable">Available</label>
        </div>

        <div class="flex gap-2">
          <button
            type="button"
            @click="$emit('close')"
            class="flex-1 px-4 py-2 bg-red-500 text-white rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="flex-1 px-4 py-2 bg-green-600 text-white rounded"
          >
            {{ mode === 'edit' ? 'Update' : 'Save' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'

const props = defineProps({
  product: {
    type: Object,
    default: null
  },
  mode: {
    type: String,
    default: 'add' // 'add' or 'edit'
  }
})

const emit = defineEmits(['close', 'submitted'])

const name = ref('')
const price = ref('')
const category = ref('')        // holds selected category ID
const isAvailable = ref(false)
const categories = ref([])      // fetched category list

// fetch categories on component mount
const fetchCategories = async () => {
  try {
    const res = await axios.get('http://localhost:8000/api/categories')
    categories.value = res.data
  } catch (err) {
    console.error('Failed to load categories:', err)
  }
}
onMounted(fetchCategories)

// populate form when editing
watch(
  () => props.product,
  (newVal) => {
    if (props.mode === 'edit' && newVal) {
      name.value = newVal.name || ''
      price.value = newVal.price || ''
      category.value = newVal.category?.id || ''
      isAvailable.value = newVal.is_available || false
    } else {
      name.value = ''
      price.value = ''
      category.value = ''
      isAvailable.value = false
    }
  },
  { immediate: true }
)

const submitForm = async () => {
  if (!name.value.trim() || !price.value || !category.value) {
    alert('Please input all required fields')
    return
  }
  const data = {
    name: name.value,
    price: parseFloat(price.value),
    category_id: category.value,
    is_available: isAvailable.value
  }
  try {
    if (props.mode === 'edit' && props.product?.id) {
      await axios.put(`http://localhost:8000/api/products/${props.product.id}`, data)
      alert('Product updated successfully')
    } else {
      await axios.post('http://localhost:8000/api/products', data)
      alert('Product added successfully')
    }
    emit('submitted')
    emit('close')
  } catch (err) {
    console.error('Error saving product:', err)
    alert('Error saving product')
  }
}

async function deleteProduct() {
  if (!props.product?.id) return
  if (!confirm('Are you sure you want to delete this product?')) return
  try {
    await axios.delete(`http://localhost:8000/api/products/${props.product.id}`)
    alert('Product deleted successfully')
    emit('submitted')
    emit('close')
  } catch (err) {
    console.error('Error deleting product:', err)
    alert('Error deleting product')
  }
}
</script>
