<template>
    <button type="button" @click="btnProfile">
            <i class="pi pi-user mr-3"></i>
            <span>Profile</span>
    </button>
</template>
<script setup>
function btnProfile() {
   alert('Profile button clicked');
}
</script>