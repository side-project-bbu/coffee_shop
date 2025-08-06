<template>
  <div>
    <button type="button" @click="showProfile = true">
      <i class="pi pi-user mr-3"></i>
      <span>{{ t('Profile') }}</span>
    </button>

    <InformationUser v-if="showProfile" @close="showProfile = false" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import InformationUser from './InformationUser.vue'

const { t } = useI18n()
const showProfile = ref(false)
</script>
