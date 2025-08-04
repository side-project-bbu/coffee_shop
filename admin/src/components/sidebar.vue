<template>
  <div class="h-screen bg-white text-black flex flex-col items-start p-6">
    <router-link to="/welcome" class="text-2xl font-bold mb-10 hover:text-green-700 transition-colors">
      {{ t('Admin Panel') }}
    </router-link>
    <ul class="w-full space-y-4">
      <li>
        <router-link to="/dashboard" class="block rounded px-4 py-2 transition-colors"
                     active-class="bg-green-100 text-green-600 font-semibold" exact>
          {{ t('Dashboard') }}
        </router-link>
      </li>
      <li>
        <router-link to="/employee" class="block rounded px-4 py-2 transition-colors"
                     active-class="bg-green-100 text-green-600 font-semibold" exact>
          {{ t('Employee') }}
        </router-link>
      </li>
      <li>
        <router-link to="/products" class="block rounded px-4 py-2 transition-colors"
                     active-class="bg-green-100 text-green-600 font-semibold">
          {{ t('Products') }}
        </router-link>
      </li>
       <li>
        <router-link to="/suppliers" class="block rounded px-4 py-2 transition-colors"
                     active-class="bg-green-100 text-green-600 font-semibold">
          {{ t('Supplier') }}
        </router-link>
      </li>
      <li>
        <router-link to="/add" class="block rounded px-4 py-2 transition-colors"
                     active-class="bg-green-100 text-green-600 font-semibold">
          {{ t('Add New Item') }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>

import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();


// No props or emits needed with router-link
</script>
