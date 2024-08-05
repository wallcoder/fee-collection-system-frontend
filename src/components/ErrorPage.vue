<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useErrorPage } from '../stores/errorPage';

const errorPage = useErrorPage();
const { isError } = storeToRefs(errorPage);
function retry() {
  // Add your retry logic here
  location.reload();
}
</script>

<template>
    <section class="w-full h-full flex justify-center items-center flex-col fixed top-0 bg-gray-200 text-black space-y-6 z-9999999" v-if="isError" v-motion-fade-visible-once>
      <div class="flex flex-col items-center">
        <h1 class="text-6xl  ">500</h1>
        <p class="text-2xl mt-2">Internal Server Error</p>
      </div>
      <h1 class="text-md">Uh Oh!! Something's wrong with the server...</h1>
      <button @click="retry" class="mt-2 px-3 py-2 bg-college-blue text-white rounded-md hover:bg-hover-blue transition duration-300">
        Retry
      </button>
    </section>
  </template>

