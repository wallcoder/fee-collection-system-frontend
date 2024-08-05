
<script setup>
import { useLoaderStore } from '../stores/loader'; // Correct the import statement
import { storeToRefs } from 'pinia';

const loaderStore = useLoaderStore();
const { isLoadingSpinner } = storeToRefs(loaderStore);
</script>

<template>
  <Teleport to="#modal">
    <!-- NEW ENTRY -->
    <Transition name="loaderSpinner" v-if="isLoadingSpinner" v-motion-fade-visible-once>
      <div class="flex items-center justify-center fixed z-9999 top-0 bg-black/30 w-[100%] h-[100%] z-[9999]">
        
        <div class="animate-spin rounded-full h-10 w-10 border-t-4 border-white"></div>
      </div>
    </Transition>
  </Teleport>
</template>
