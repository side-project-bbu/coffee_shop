import { createRouter, createWebHistory } from 'vue-router'
import Employee from '../pages/employee.vue'
import Products from '../pages/products.vue'
import Welcome from '../pages/welcome.vue'
import Dashboard from '../pages/dashboard.vue'
import Suppliers from '../pages/suppliers.vue'
import Add from '../pages/add.vue'
import Login from '../pages/FormLogin.vue'

const routes = [
  { path: '/', name: 'Login', component: Login },
  { path: '/welcome', name: 'Welcome', component: Welcome },
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

router.beforeEach((to, from, next) => {
  const publicPages = ['Login']  // Only login page is public
  const authRequired = !publicPages.includes(to.name)
  const authToken = localStorage.getItem('auth_token')

  if (authRequired && (!authToken || authToken === '')) {
    // Not logged in, redirect to login
    next({ name: 'Login' })
  } else {
    // Logged in or going to public page, allow access
    next()
  }
})

export default router
