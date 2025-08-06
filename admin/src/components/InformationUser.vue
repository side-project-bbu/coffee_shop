<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="image" :style="{ backgroundImage: `url(${randomImage})` }"></div>
      <h1 class="text-xl font-bold mb-4 text-center">{{ t('Welcome') }} - {{ username }}</h1>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <p class="font-semibold">{{ t("Full Name") }}</p>
          <p>{{ username }}</p>
        </div>

        <div>
          <p class="font-semibold">{{ t("Gender") }}</p>
          <p>{{ t("Male") }}</p>
        </div>

        <div>
          <p class="font-semibold">{{ t("Date of Birth") }}</p>
          <p>{{ t("7/01/2000") }}</p>
        </div>

        <div>
          <p class="font-semibold">{{ t("Phone Number") }}</p>
          <p>{{ t("0111111111") }}</p>
        </div>

        <div>
          <p class="font-semibold">{{ t("Email") }}</p>
          <p>{{ t("GdFkI@example.com") }}</p>
        </div>

        <div>
          <p class="font-semibold">{{ t("Address") }}</p>
          <p>{{ t("Phnom Penh City, Cambodia") }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();

const user = JSON.parse(localStorage.getItem('user_info'));
const username = user.username || '';

const randomImage = ref('')

const images = [
  '/Images/background/back1.png',
  '/Images/background/iamge2.jpg',
  '/Images/background/image3.jpg',
  '/Images/background/image4.jpg',
  '/Images/background/image5.jpg',
]

function getRandomImage() {
  const index = Math.floor(Math.random() * images.length)
  return images[index]
}
onMounted(() => {
  randomImage.value = getRandomImage()
})
</script>
<style scoped>
 
.image {
  width: 100%;
  height: 200px;
  background-size: cover;
}
</style>