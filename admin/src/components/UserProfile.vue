<template>
  <div>
    <!-- Avatar Button -->
    <div
      ref="avatarWrapper"
      class="inline-block cursor-pointer mr-12"  
      @click="toggle($event)"
    >
      <Avatar
        icon="pi pi-user"
        shape="circle"
        class="transition-transform hover:scale-105 shadow-md border border-gray-300"
        style="width: 50px; height: 50px; font-size: 1.8rem;"
      />
    </div>

    <!-- Dropdown Panel -->
    <OverlayPanel
      ref="opRef"
      showCloseIcon
      style="margin-top: 6px; background-color: gray;"
    >
      <div class="p-4 space-y-5 text-sm text-white">
        <div>
          <Profile />
        </div>
        <div>
          <language />
        </div>
        <div>
          <Setting />
        </div>
        <div @click="Logout">
          <button type="button" class="text-red-500 hover:text-red-700">
            <i class="pi pi-sign-out mr-3"></i>
            <span>{{ t('Logout') }}</span>
          </button>
        </div>
      </div>
    </OverlayPanel>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Setting from "../components/Setting.vue"
import language from "../components/language.vue"
import Profile from "../components/Profile.vue"

const router = useRouter()
const avatarWrapper = ref(null)
const opRef = ref(null)

const toggle = (event) => {
  if (opRef.value && avatarWrapper.value) {
    opRef.value.toggle(event, avatarWrapper.value)
  }
}

function Logout() {
  localStorage.clear()
  router.push('/login')
}
</script>

<style scoped>
.p-avatar {
  transition: transform 0.2s, box-shadow 0.2s;
}
.p-avatar:hover {
  transform: scale(1.05);
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
}
button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  background: transparent;
  border: none;
  cursor: pointer;
}
button:hover {
  text-decoration: underline;
}
</style>
