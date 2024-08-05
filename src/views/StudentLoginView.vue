<script setup>

import { RouterLink } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { defineStore, storeToRefs } from "pinia";
import LoaderSpinner from "../components/LoaderSpinner.vue"
import ErrorPage from '../components/ErrorPage.vue'
const authStore = useAuthStore();
const {regNo, errMessage} = storeToRefs(authStore);
const {proceed} = authStore;

</script>

<template>
    <section
      class="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-10 w-full min-h-screen flex justify-center items-center main-container"
    >
      <form
        class="bg-white shadow-lg  p-8 flex flex-col justify-center items-center w-full max-w-md"
        v-motion-slide-visible-bottom
        @submit.prevent="proceed"
      >
        <img src="../images/logo 2.png" alt="Logo" class="w-40 mb-6" />
        <h1 class="text-2xl font-bold mb-6">FEE PORTAL</h1>
  
        <div class="w-full space-y-4">
          <div>
            <label for="name" class="block text-sm font-bold mb-1">Registration Number</label>
            <input
              type="text"
              name="name"
              id="name"
              v-model="regNo"
              class="w-full p-3 border border-gray-300  outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Registration Number"
              required
            />
          </div>
          
          <span class="text-red-600 text-xs">{{ errMessage }}</span>
  
          <button
            type="submit"
            class="w-full bg-college-blue text-white py-3  mt-4 font-bold hover:bg-hover-blue transition duration-200"
          >
            Proceed
          </button>
        </div>
  
        <div class="flex flex-col items-center justify-center sm:flex-row justify-between mt-6 text-sm space-y-2 sm:space-y-0 sm:space-x-4">
            <span class="flex">
          <RouterLink to="/" class="hover:underline transition duration-200">Home</RouterLink>
          <RouterLink to="/faqs" class="hover:underline transition duration-200 ml-3">FAQs</RouterLink>
        </span>
        <span class="flex">
          <RouterLink to="/terms-of-use" class="hover:underline transition duration-200">Terms of Use</RouterLink>
          <RouterLink to="/contact" class="hover:underline transition duration-200 ml-3">Contact</RouterLink>
        </span>
        </div>
      </form>
      <LoaderSpinner />
      <ErrorPage />
    </section>
  </template>

<style scoped >
.main-container {
    background: linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), url(../images/background-5.png);
    background-size: cover;
}</style>