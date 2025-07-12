<template>
  <div class="flex flex-col items-center justify-center h-full text-center">
    <div class="flex justify-between items-center mb-6 w-full px-10">
      <h1 class="text-3xl font-extrabold text-gray-800">Employee List</h1>
      <button @click="addNewEmployee" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
        Add New Employee
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
            <td class="py-3 px-6 border-b">{{ employee.first_name }} {{ employee.last_name }}</td>
            <td class="py-3 px-6 border-b">{{ employee.role }}</td>
            <td class="py-3 px-6 border-b">{{ employee.is_active ? 'Active' : 'Inactive' }}</td>
            <td class="py-3 px-6 border-b"></td>
            <td class="py-3 px-6 border-b flex gap-2">
              <button @click="confirmDelete(employee.id)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                Delete
              </button>
              <button @click="editEmployee(employee)" class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">
                Edit
              </button>
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
import ComAddEmployee from './ComAddEmployee.vue'

const showModal = ref(false)
const employees = ref([])
const selectedEmployee = ref(null)
const formMode = ref('add')

const fetchEmployees = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/employees')
    employees.value = response.data
  } catch (error) {
    console.error('Error fetching employees:', error)
  }
}

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

onMounted(fetchEmployees)
</script>
