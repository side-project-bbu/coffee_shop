<template>
  <div>
    <button type="button" @click="visible = true">
      <i class="pi pi-globe mr-4"></i>
      <span>{{ t('language') }}</span>
    </button>

    <div
      v-if="visible"
      class="fixed inset-0 z-50 flex items-center justify-center  bg-black"
      @click.self="visible = false"
    >
      <div class="bg-white p-6 rounded shadow-md">
        <p class="text-center font-bold text-lg mb-4 text-black">{{ t('changeLanguage') }}</p>

        <button
          class="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded mb-2 w-full"
          @click="setLanguage('en')"
        >
          <div class="flex items-center gap-3">
            <img src="/Images/united-kingdom.png" class="w-7 h-7" />
            <span>{{ t('english') }}</span>
          </div>
        </button>

        <button
          class="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded w-full"
          @click="setLanguage('kh')"
        >
          <div class="flex items-center gap-3">
            <img src="/Images/flag.png" class="w-7 h-7" />
            <span>{{ t('khmer') }}</span>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const visible = ref(false);
const { t, locale } = useI18n();

function setLanguage(lang) {
  locale.value = lang;
  localStorage.setItem("locale", lang);
  visible.value = false;
}
</script>
