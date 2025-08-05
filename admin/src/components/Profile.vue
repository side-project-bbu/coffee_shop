<template>
    <button type="button" @click="btnProfile" >
            <i class="pi pi-user mr-3"></i>
            <span>{{ t('Profile') }}</span>
    </button>
</template>
<script setup>
import { useI18n } from "vue-i18n";
import { useRouter } from 'vue-router'
const { t, locale } = useI18n();
const router = useRouter()

function btnProfile() {
    router.push('/InformationUser')
}
</script>