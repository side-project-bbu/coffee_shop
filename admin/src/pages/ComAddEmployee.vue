<template>
  <div class="fixed inset-0 flex items-center justify-center z-50" style="background-color: rgba(0,0,0,0.4);">
    <div class="bg-white p-6 rounded-lg shadow-lg w-[400px]">
      <h2 class="text-xl font-bold mb-4">
        {{ mode === 'edit' ? 'Edit Employee' : 'Add New Employee' }}
      </h2>
      <form @submit.prevent="submitForm">
        <input type="text" v-model="firstName" placeholder="First Name" class="border px-3 py-2 w-full mb-3" />
        <input type="text" v-model="lastName" placeholder="Last Name" class="border px-3 py-2 w-full mb-3" />
        <input type="text" v-model="role" placeholder="Role" class="border px-3 py-2 w-full mb-3" />

        <div class="flex items-center mb-4">
          <input type="checkbox" id="isActive" v-model="isActive" class="mr-2">
          <label for="isActive">Is Active</label>
        </div>
        
        <div class="flex justify-end">
          <button type="button" @click="$emit('close')" class="mr-2 px-4 py-2 bg-red-500 text-white rounded">Cancel</button>
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
  employee: {
    type: Object,
    default: null
  },
  mode: {
    type: String,
    default: 'add' // or 'edit'
  }
})

const emit = defineEmits(['close', 'submitted'])

const firstName = ref('')
const lastName = ref('')
const role = ref('')
const isActive = ref(false)

watch(() => props.employee, (newVal) => {
  if (props.mode === 'edit' && newVal) {
    firstName.value = newVal.first_name
    lastName.value = newVal.last_name
    role.value = newVal.role
    isActive.value = newVal.is_active
  }
}, { immediate: true })

const submitForm = async () => {
  if (!firstName.value.trim() || !lastName.value.trim() || !role.value.trim()) {
    alert('Please input data')
    return
  }

  const data = {
    first_name: firstName.value,
    last_name: lastName.value,
    role: role.value,
    is_active: isActive.value
  }

  try {
    if (props.mode === 'edit') {
      await axios.put(`http://localhost:8000/api/employees/${props.employee.id}`, data)
    } else {
      await axios.post('http://localhost:8000/api/employees', data)
    }

    emit('submitted')
    emit('close')
  } catch (error) {
    console.error('Failed to submit:', error)
  }
}
</script>
