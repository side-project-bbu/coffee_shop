<template>
  <div class="fixed inset-0 flex items-center justify-center z-50" style="background-color: rgba(0,0,0,0.4);">
    <div class="bg-white p-6 rounded-lg shadow-lg w-[400px]">
      <h2 class="text-xl font-bold mb-4">
        {{ mode === 'edit' ? 'Edit Product' : 'Add New Product' }}
      </h2>
      <form @submit.prevent="submitForm">
        <input
          type="text"
          v-model="name"
          placeholder="Product Name"
          class="border px-3 py-2 w-full mb-3"
        />
        <input
          type="number"
          v-model="price"
          placeholder="Price"
          class="border px-3 py-2 w-full mb-3"
        />
        <input
          type="text"
          v-model="category"
          placeholder="Category"
          class="border px-3 py-2 w-full mb-3"
        />

        <div class="flex items-center mb-4">
          <input type="checkbox" id="isAvailable" v-model="isAvailable" class="mr-2" />
          <label for="isAvailable">Available</label>
        </div>

        <div class="flex justify-end">
          <button
            type="button"
            @click="$emit('close')"
            class="mr-2 px-4 py-2 bg-red-500 text-white rounded"
          >
            Cancel
          </button>
          <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">
            {{ mode === 'edit' ? 'Update' : 'Save' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
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
const category = ref('')
const isAvailable = ref(false)

watch(
  () => props.product,
  (newVal) => {
    if (props.mode === 'edit' && newVal) {
      name.value = newVal.name || ''
      price.value = newVal.price || ''
      category.value = newVal.category || ''
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
  if (!name.value.trim() || !price.value || !category.value.trim()) {
    alert('Please input all required fields')
    return
  }

  const data = {
    name: name.value,
    price: parseFloat(price.value),
    category: category.value,
    is_available: isAvailable.value
  }

  try {
    if (props.mode === 'edit' && props.product?.id) {
      await axios.put(`http://localhost:8000/api/products/${props.product.id}`, data)
    } else {
      await axios.post('http://localhost:8000/api/products', data)
    }

    emit('submitted')
    emit('close')
  } catch (error) {
    console.error('Error saving product:', error)
  }
}
</script>
