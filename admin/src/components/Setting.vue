<template>
     <button type="button" @click="btnSetting">
            <i class="pi pi-cog mr-3"></i>
            <span>{{ t('Settings') }}</span>
          </button>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();

function btnSetting() {
   alert('Comming soon bro :)');
}
</script>

<style scoped>
/* this is style */
</style>

