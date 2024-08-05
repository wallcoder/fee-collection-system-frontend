import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLoaderStore = defineStore('loader', () => {
  const isLoadingSpinner = ref(false);
  return { isLoadingSpinner };
})