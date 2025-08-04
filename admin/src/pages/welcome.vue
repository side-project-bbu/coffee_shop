<template>
  <div class="flex flex-col items-center justify-center h-full text-center">
    <h6>{{ t('Welcome to the Coffee Shop Admin Panel!') }}</h6>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
// No script logic needed for this simple welcome page
</script>

<style scoped>
/* Add any custom styles here if needed */
</style>
