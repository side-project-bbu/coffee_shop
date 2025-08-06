<template>
    <div class="flex flex-col items-center justify-center h-full text-center">{{t("this is dashboard")}}</div>
</template>

<script setup>
// No script logic needed for this simple dashboard page
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
</script>

<style scoped>
/* Add any custom styles here */
</style>