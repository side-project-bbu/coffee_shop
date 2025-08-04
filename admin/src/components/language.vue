<template>
  <!-- Button to open the modal -->
  <button type="button" @click="visible = true" >
    <i class="pi pi-globe mr-4"></i>
    <span>Language</span>
  </button>

  <!-- Centered modal/popover -->
  <div
    v-if="visible"
    class="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50"
  >
    <div class="bg-white p-6 rounded shadow-md">
  <div class="flex flex-col gap-4">
    <p class="text-center text-black font-bold text-lg">Change Language</p>
    
    <!-- English -->
    <div class="flex items-center gap-3">
      <img src="/Images/united-kingdom.png" class="w-7 h-7" />
      <button
        type="button"
        class="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
        @click="visible = false"
      >
        English
      </button>
    </div>

    <!-- Khmer -->
    <div class="flex items-center gap-3">
      <img src="/Images/flag.png" class="w-7 h-7" />
      <button
        type="button"
        class="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
        @click="visible = false"
      >
        ភាសាខ្មែរ
      </button>
    </div>
  </div>
</div>

  </div>
</template>
<script setup>
import { ref } from "vue";

const visible = ref(false);
</script>
