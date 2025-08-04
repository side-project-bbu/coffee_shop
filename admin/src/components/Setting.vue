<template>
     <button type="button" @click="btnSetting">
            <i class="pi pi-cog mr-3"></i>
            <span>Settings</span>
          </button>
</template>

<script setup>
function btnSetting() {
   alert('Settings button clicked');
}
</script>

<style scoped>
/* this is style */
</style>

