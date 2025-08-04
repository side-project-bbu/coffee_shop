<template>
    <button type="button" @click="btnProfile">
            <i class="pi pi-user mr-3"></i>
            <span>{{ t('Profile') }}</span>
    </button>
</template>
<script setup>
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
function btnProfile() {
   alert('Profile button clicked');
}
</script>