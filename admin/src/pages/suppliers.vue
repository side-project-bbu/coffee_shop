<template>
  <div class="flex flex-col items-center justify-center h-full text-center">
    <div class="flex justify-between items-center mb-6 w-full px-10">
      <h1 class="text-3xl font-extrabold text-gray-800">Suppliers</h1>
    </div>

    <div class="overflow-x-auto w-full h-full px-10">
      <table class="table-auto border-collapse w-full text-left bg-white shadow-md rounded-lg">
        <thead>
          <tr class="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th class="py-3 px-6 border-b">ID</th>
            <th class="py-3 px-6 border-b">Name</th>
            <th class="py-3 px-6 border-b">Phone Number</th>
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
                @click="deleteProduct(product.id)" 
                class="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 w-20 rounded">
                Delete
              </button>
              <button 
                @click="openEditForm(product)" 
                class="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 w-20 rounded">
                Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "Suppliers",
  data() {
    return {
      suppliers: []
    }
  },
  methods: {
    fetchSuppliers() {
      axios.get("http://localhost:8000/api/suppliers")
        .then(response => {
          this.suppliers = response.data
        })
    },
    editSupplier(supplier) {
      // ...existing code...
    },
    deleteSupplier(supplier) {
      // ...existing code...
    }
  },
  mounted() {
    this.fetchSuppliers()
  }
}
</script>

<style scoped>
/* ...existing code... */
</style>