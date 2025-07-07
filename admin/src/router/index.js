import { createRouter, createWebHistory } from 'vue-router'
import Employee from '../pages/employee.vue'
import Products from '../pages/products.vue'
import Welcome from '../pages/welcome.vue'
import Dashboard from '../pages/dashboard.vue'

const routes = [
  { path: '/', name: 'Welcome', component: Welcome },
  { path: '/employee', name: 'Employee', component: Employee },
  { path: '/products', name: 'Products', component: Products },
   { path: '/dashboard', name: 'Dashboard', component: Dashboard },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
