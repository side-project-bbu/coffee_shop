<template>
  <div class="fixed inset-0 flex items-center justify-center z-50" style="background-color: rgba(0,0,0,0.4);">
    <div class="bg-white p-6 rounded-lg shadow-lg w-[400px]">
      <h2 class="text-xl font-bold mb-4 text-center">
  {{ mode === 'edit' ? t('Edit Supplier') : t('Add Supplier') }}
</h2>

      <form @submit.prevent="submitForm">
        <p class="flex items-center mb-2">{{t("Supplier Name")}}</p>
        <input
          type="text"
          v-model="name"
          :placeholder="t('Supplier Name')"
          class="border px-3 py-2 w-full mb-3"
        />
        <p class="flex items-center mb-2">{{t("Phone Number")}}</p>
        <input
          type="text"
          v-model="phone_number"
          :placeholder="t('Phone Number')"
          class="border px-3 py-2 w-full mb-3"
        />
        <p class="flex items-center mb-2">{{t("Address")}}</p>
        <input
          type="text"
          v-model="address"
          :placeholder="t('Address')"
          class="border px-3 py-2 w-full mb-3"
        />
        <div class="grid grid-cols-12 gap-2 mt-4">
          <button
            type="button"
            @click="$emit('close')"
            class="col-span-6 px-4 py-2 bg-red-500 text-white rounded"
          >
           {{t("Cancel")}}
          </button>
          <button type="submit" class="col-span-6 px-4 py-2 bg-green-500 text-white rounded">
            {{ mode === 'edit' ? t('Update') : t('Save') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
import axios from 'axios'

// Props
const props = defineProps({
  supplier: {
    type: Object,
    default: null
  },
  mode: {
    type: String,
    default: 'add' // 'add' or 'edit'
  }
})

// Emits
const emit = defineEmits(['close', 'submitted'])

// Form fields
const name = ref('')
const phone_number = ref('')
const address = ref('')

// Watch for editing
watch(
  () => props.supplier,
  (newVal) => {
    if (props.mode === 'edit' && newVal) {
      name.value = newVal.name || ''
      phone_number.value = newVal.phone_number || ''
      address.value = newVal.address || ''
    } else {
      name.value = ''
      phone_number.value = ''
      address.value = ''
    }
  },
  { immediate: true }
)

// Submit handler
const submitForm = async () => {
  if (!name.value.trim() || !phone_number.value.trim() || !address.value.trim()) {
    alert('Please input all required fields')
    return
  }

  const data = {
    name: name.value,
    phone_number: phone_number.value,
    address: address.value
  }

  try {
    if (props.mode === 'edit' && props.supplier?.id) {
      await axios.put(`http://localhost:8000/api/suppliers/${props.supplier.id}`, data)
    } else {
      await axios.post('http://localhost:8000/api/suppliers', data)
    }

    emit('submitted')
    emit('close')
  } catch (error) {
    console.error('Error saving supplier:', error)
  }
}
</script>
