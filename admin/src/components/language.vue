<template>
    <button type="button" @click="visible = true">
            <i class="pi pi-globe mr-3"></i>
            <span>Language</span>
          </button>

          <Dialog v-model:visible="visible" modal header="Change Language" :style="{ width: '25rem' }">
            <div  >
                <Button type="button" label="English" severity="secondary" @click="visible = false"></Button></div>
                <Button type="button" label="ភាសាខ្មែរ" @click="visible = false"></Button>
            
        </Dialog>
</template>
<script setup>
import { ref } from "vue";
const visible = ref(false);
 
</script>