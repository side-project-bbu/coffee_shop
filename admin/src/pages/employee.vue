<template>
  <div class="flex flex-col items-center justify-center h-full text-center">
    <div class="flex justify-between items-center mb-6 w-full px-10">
      <h1 class="text-3xl font-extrabold text-gray-800">Employee List</h1>
      <button @click="addNewEmployee" class="fixed bottom-8 right-8 z-50 bg-blue-500 hover:bg-blue-600 text-white font-bold w-16 h-16 flex items-center justify-center text-4xl rounded-full shadow-lg p-0">
        <span class="w-full h-full flex items-center justify-center mb-2">+</span>
      </button>
    </div>

    <div class="overflow-x-auto w-full h-full px-10">
      <table class="table-auto border-collapse w-full text-left bg-white shadow-md rounded-lg">
        <thead>
          <tr class="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th class="py-3 px-6 border-b">ID</th>
            <th class="py-3 px-6 border-b">Name</th>
            <th class="py-3 px-6 border-b">Role</th>
            <th class="py-3 px-6 border-b">Active</th>
            <th class="py-3 px-6 border-b"></th>
            <th class="py-3 px-6 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="employee in employees" :key="employee.id" class="hover:bg-gray-50">
            <td class="py-3 px-6 border-b">{{ employee.id }}</td>
            <td class="py-3 px-6 border-b">{{ employee.last_name }} {{ employee.first_name }}</td>
            <td class="py-3 px-6 border-b">{{ employee.roleName }}</td>
            <td class="py-3 px-6 border-b">{{ employee.is_active ? 'Active' : 'Inactive' }}</td>
            <td class="py-3 px-6 border-b"></td>
            <td class="py-3 px-6 border-b">
              <div class="flex gap-2">
                 <button @click="editEmployee(employee)" class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 w-20 rounded">
                  Edit
                </button>
                <button @click="confirmDelete(employee.id)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 w-20 rounded">
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <ComAddEmployee
      v-if="showModal"
      :employee="selectedEmployee"
      :mode="formMode"
      @close="showModal = false"
      @submitted="handleFormSubmit"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import ComAddEmployee from '../components/AddEmployee.vue'

const showModal = ref(false)
const employees = ref([])
const roles = ref([])                             // added

const selectedEmployee = ref(null)
const formMode = ref('add')

// new: fetch all roles
const fetchRoles = async () => {
  try {
    const res = await axios.get('http://localhost:8000/api/roles')
    roles.value = res.data
  } catch (error) {
    console.error('Error fetching roles:', error)
  }
}

// modified: fetch employees and add roleName property
const fetchEmployees = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/employees')
    employees.value = response.data.map(emp => ({
      ...emp,
      roleName: (roles.value.find(r => r.id === emp.role_id) || {}).name || ''
    }))
  } catch (error) {
    console.error('Error fetching employees:', error)
  }
}

onMounted(async () => {
  await fetchRoles()
  fetchEmployees()
})

const deleteEmployee = async (id) => {
  try {
    await axios.delete(`http://localhost:8000/api/employees/${id}`)
    fetchEmployees()
  } catch (error) {
    console.error('Error deleting employee:', error)
  }
}

const confirmDelete = (id) => {
  if (confirm('Are you sure you want to delete this employee?')) {
    deleteEmployee(id)
  }
}

const addNewEmployee = () => {
  selectedEmployee.value = null
  formMode.value = 'add'
  showModal.value = true
}

const editEmployee = (employee) => {
  selectedEmployee.value = { ...employee }
  formMode.value = 'edit'
  showModal.value = true
}

const handleFormSubmit = () => {
  fetchEmployees()
  showModal.value = false
  selectedEmployee.value = null
  formMode.value = 'add'
}
</script>
