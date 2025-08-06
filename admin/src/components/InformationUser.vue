<template>
  <div class="modal-backdrop">
    <div class="modal-content">
      <button class="close-btn" @click="$emit('close')">✕</button>
      <div class="image" :style="{ backgroundImage: `url(${randomImage})` }"></div>
      <div class="cover"></div>
      <h1 class="text-xl font-bold mb-4 text-center mt-12 text-gray-800">{{ t('Welcome') }} - {{ username }}</h1>
      <div class="px-8 pt-6 pb-8 mb-4 text-black">
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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const user = JSON.parse(localStorage.getItem('user_info'));
const username = user?.username || '';

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
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 50;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  width: 90%;
  max-width: 700px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
   
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 1.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
}

.image {
  width: 100%;
  height: 200px;
  background-size: cover;
}
.cover {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  background-image: url('https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?q=80&w=1169&auto=format&fit=crop');
  background-size: cover;
  background-position: center;
  position: absolute;
  top: 38%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
