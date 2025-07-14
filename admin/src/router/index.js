import { createRouter, createWebHistory } from 'vue-router'
import Employee from '../pages/employee.vue'
import Products from '../pages/products.vue'
import Welcome from '../pages/welcome.vue'
import Dashboard from '../pages/dashboard.vue'
import Suppliers from '../pages/suppliers.vue'
import Add from '../pages/add.vue'

const routes = [
  { path: '/', name: 'Welcome', component: Welcome },
  { path: '/employee', name: 'Employee', component: Employee },
  { path: '/products', name: 'Products', component: Products },
  { path: '/suppliers', name: 'Suppliers', component: Suppliers },
  { path: '/add', name: 'Add', component: Add },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
