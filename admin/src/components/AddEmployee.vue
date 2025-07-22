<template>
  <div class="fixed inset-0 flex items-center justify-center z-50" style="background-color: rgba(0,0,0,0.4);">
    <div class="bg-white p-6 rounded-lg shadow-lg w-[400px]">
      <h2 class="text-xl font-bold mb-4">
        {{ mode === 'edit' ? 'Edit Employee' : 'Add Employee' }}
      </h2>
      <form @submit.prevent="submitForm">
        <p class="flex items-center mb-2">First Name</p>
        <input type="text" v-model="firstName" placeholder="First Name" class="border border-gray-400 px-3 py-2 w-full mb-3" />
        <p class="flex items-center mb-2">Last Name</p>
        <input type="text" v-model="lastName" placeholder="Last Name" class="border border-gray-400 px-3 py-2 w-full mb-3" />
        <p class="flex items-center mb-2">Select Role</p>
        <select v-model="role" class="border border-gray-400 px-3 py-2 w-full mb-3">
          <option value="" disabled>Select Role</option>
          <option v-for="r in roles" :key="r.id" :value="r.id">{{ r.name }}</option>
        </select>

        <div class="flex items-center mb-4">
          <input type="checkbox" id="isActive" v-model="isActive" class="mr-2">
          <label for="isActive">Is Active</label>
        </div>
        
        <div class="grid grid-cols-12 gap-2">
          <template v-if="props.mode === 'edit'">
            <button
              type="button"
              @click="$emit('close')"
              class="col-span-6 px-4 py-2 bg-red-500 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="col-span-6 px-4 py-2 bg-green-600 text-white rounded"
            >
              Update
            </button>
          </template>
          <template v-else>
            <button
              type="button"
              @click="$emit('close')"
              class="col-span-6 px-4 py-2 bg-red-500 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="col-span-6 px-4 py-2 bg-green-500 text-white rounded"
            >
              Save
            </button>
          </template>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
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
const roles = ref([])

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:8000/api/roles')
    roles.value = res.data
  } catch (e) {
    console.error('Failed to load roles:', e)
  }
})

watch(() => props.employee, (newVal) => {
  if (props.mode === 'edit' && newVal) {
    firstName.value = newVal.first_name
    lastName.value = newVal.last_name
    role.value = newVal.role_id    // use role_id
    isActive.value = newVal.is_active
  }
}, { immediate: true })

const submitForm = async () => {
  if (!firstName.value.trim() || !lastName.value.trim() || !role.value) {  // check role.value directly
    alert('Please input data')
    return
  }

  const data = {
    first_name: firstName.value,
    last_name: lastName.value,
    role_id: role.value,
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

const deleteEmployee = async () => {
  if (confirm('Are you sure you want to delete this employee?')) {
    try {
      await axios.delete(`http://localhost:8000/api/employees/${props.employee.id}`)
      emit('submitted')
      emit('close')
    } catch (error) {
      console.error('Failed to delete:', error)
    }
  }
}
</script>
