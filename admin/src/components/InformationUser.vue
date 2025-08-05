<template>
    <div>
        <h1>{{t('Welcome')}}- {{ user }}</h1>
    </div>

</template>
<script setup>
// 
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();

const user = JSON.parse(localStorage.getItem('user_info'));
</script>
<style scoped>
/*  */
</style>