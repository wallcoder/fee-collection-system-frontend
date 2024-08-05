<script setup>
import { RouterLink } from 'vue-router';
import { useSidebarStore } from '../stores/sidebar';
import { useAuthStore } from "../stores/auth";
import { storeToRefs } from 'pinia';
import router from '../router'
import Empty from "../components/Empty.vue"
import RoundButton from "../components/RoundButton.vue"
import { useAdminNavStore } from "../stores/adminNav";
import { onClickOutside } from '@vueuse/core';

import { ref, watch } from 'vue';


import Button from '../components/Button.vue';
import SkeletonLoader from '../components/SkeletonLoader.vue'
import Error from "../components/Error.vue"
import AdminNavPopup from '../components/AdminNavPopups.vue'

import LoaderSpinner from '../components/LoaderSpinner.vue'
const adminNavStore = useAdminNavStore();
const { items,
  loading,
  error,
  totalPages,
  initial,

  filteredItems,
  isOpenNewEntry,
  errorMessage, 
  currentPage, fNameDisplay, lNameDisplay } = storeToRefs(adminNavStore);
const { getAdmins, activateEdit, activateEditPassword, getAccount } = adminNavStore;

const authStore = useAuthStore();
const { logout, fetchProfile } = authStore;
const { profile } = storeToRefs(authStore);

const { toggleSidebar } = useSidebarStore();
const sidebarStore = useSidebarStore();
const {isOpenSidebar} = storeToRefs(sidebarStore);
// onClickOutside(modal, () => {
        

//         isOpenSidebar.value = false
//           // courses.value = [];
  
//       });


fetchProfile().then(() => {
  console.log("Profile fetched:", profile.value.firstName);
});

watch(profile, (newProfile) => {
  if (newProfile.firstName) {
    console.log("Profile updated:", newProfile.firstName);
    getAccount(newProfile.adminId);
  }
});




</script>

<template>
  <nav
    class="fixed bg-college-white w-full h-16 flex items-center smartphone:sticky smartphone:top-0 drop-shadow-md z-10 smartphone:px-2 tablet:px-5 desktop:px-4 " ref="modal">
    <span class="text-xl">
      <i class="fa-sharp fa-solid fa-bars hover:cursor-pointer desktop:hidden" @click="toggleSidebar"></i>
      <span class="hidden desktop:block">DASH COLLEGE</span>
    </span>
    <div class="flex-grow"></div>
    <div class="flex items-center space-x-4">
      <div class="relative group ">
        <i class="fa-solid fa-gear text-xl m-4 group hover:cursor-pointer hover:text-gray-700"></i>
        <div
          class="hidden group-hover:block absolute right-[40px] top-[20px] mt-2  bg-white shadow-lg group-hover:smartphone:w-40 z-10 ">
          <RouterLink to="#" class="block px-4 py-2 hover:bg-gray-100 text-[15px]" @click="activateEdit(profile.adminId)">
            Edit Account</RouterLink>
          <RouterLink to="#" class="block px-4 py-2 hover:bg-gray-100 text-[15px]"
            @click="activateEditPassword(profile.adminId)">Change Password</RouterLink>
          <span class="block px-4 py-2 hover:bg-gray-100 text-[15px] hover:cursor-pointer" @click="logout">Log Out</span>
        </div>
      </div>
      <span class="smartphone:hidden items-center py-2 tablet:flex">
        <img src="../images/PP.png" alt="" class="w-9 h-9 rounded-full">
        <div class="ml-2 text-[16px] flex-col flex">
          <span>{{ fNameDisplay }} {{ lNameDisplay }}</span>
          <span class="text-xs">{{ profile.type }}</span>
        </div>
      </span>
    </div>
    <LoaderSpinner />
    <AdminNavPopup />
  </nav>
</template>

<style scoped></style>
