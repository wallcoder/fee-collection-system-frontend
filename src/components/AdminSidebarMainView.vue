<script setup>
import { RouterLink, RouterView } from 'vue-router';
import {ref, computed} from 'vue';
import {storeToRefs} from 'pinia'
import {useAuthStore} from "../stores/auth";
import { onClickOutside } from '@vueuse/core';

// import { isOpenSidebar } from '../sharedState';
// import { isShrinkSidebar } from '../sharedState';
import {useSidebarStore} from '../stores/sidebar';
const modal = ref(null);


const sidebarStore = useSidebarStore();
const {isOpenSidebar} = storeToRefs(sidebarStore);
const {toggleSidebar} = sidebarStore;

const authStore = useAuthStore();
const { fetchProfile} = authStore;
const {profile} = storeToRefs(authStore);

// onClickOutside(modal, () => {
        

//         isOpenSidebar.value = false
//           // courses.value = [];
  
//       });
// console.log(isOpenSidebar);
// const toggleSidebar = ()=>{
//   isOpenSidebar.value = !isOpenSidebar.value;
// }
// const toggleShrinkSidebar = ()=>{

//   isShrinkSidebar.value = !isShrinkSidebar.value;

// }
// const sidebarClass = computed(() => {
//   if (window.innerWidth >= 992) {
//     // For desktop screens (Tailwind's lg breakpoint)
//     return isShrinkSidebar.value ? '' : '';
//   }
//   else{
//     return isOpenSidebar.value ? 'smartphone:left-[0px]' : 'smartphone:left-[-300px]';
//   }
//   // For smaller screens
  
// });



fetchProfile();


</script>

<template >
  <section class="flex  bg-white h-[100%] desktop:h-[103.45%] " >
    <nav class="bg-college-white w-[200px] h-[100%] flex flex-col p-2 pt-0 smartphone:fixed transition-all linear duration-200 top-13 shadow-right desktop:static desktop:top-0 desktop:left-[0px] pt-2 " :class="isOpenSidebar ? 'smartphone:left-[0px]' : 'smartphone:left-[-300px]'"  >
      <span class="smartphone:flex items-center py-2 tablet:hidden">
        <img src="../images/PP.png" alt="" class="w-9 h-9 rounded-full">
        <div class="ml-2 text-[16px] flex-col flex"><span>{{ profile.firstName }} {{ profile.lastName }}</span><span class="text-xs">{{ profile.type }}</span></div>
      </span>
      
      
      <RouterLink to="/admin-panel" exact-active-class="active" @click="toggleSidebar" 
        class="bg-college-white hover:bg-admin-pink p-2 my-[1.5px] rounded-[15px] flex items-center hover:transition-all linear duration-200">
        <i class="fa-solid fa-gauge-high text-xl"></i><span class="ml-2 text-[15px] ">Dashboard</span>
      </RouterLink>
      <RouterLink to="/admin-panel/courses" active-class="active" @click="toggleSidebar"
        class="bg-college-white hover:bg-admin-pink p-2 my-[1.5px] rounded-[15px] flex items-center hover:transition-all linear duration-200">
        <i class="fa-solid fa-book text-xl"></i><span class="ml-2 text-[15px]">Courses</span>
      </RouterLink>
      <RouterLink to="/admin-panel/fee-components" active-class="active" @click="toggleSidebar"
        class="bg-college-white hover:bg-admin-pink p-2 my-[1.5px] rounded-[15px] flex items-center hover:transition-all linear duration-200">
        <i class="fa-solid fa-puzzle-piece text-xl"></i><span class="ml-2 text-[15px]">Fee Components</span>
      </RouterLink>
      
      <RouterLink to="/admin-panel/fee-structures" active-class="active" @click="toggleSidebar"
        class="bg-college-white hover:bg-admin-pink p-2 my-[1.5px] rounded-[15px] flex items-center hover:transition-all linear duration-200">
        <i class="fa-solid fa-cash-register text-xl"></i><span class="ml-2 text-[15px]">Fee Structures</span>
      </RouterLink>
      
      <RouterLink to="/admin-panel/students" active-class="active" @click="toggleSidebar"
        class="bg-college-white hover:bg-admin-pink p-2 my-[1.5px] rounded-[15px] flex items-center hover:transition-all linear duration-200">
        <i class="fa-solid fa-graduation-cap text-xl"></i><span class="ml-2 text-[15px]">Students & Fees</span>
      </RouterLink>
      <RouterLink to="/admin-panel/student-fees" active-class="active" @click="toggleSidebar"
        class="bg-college-white hover:bg-admin-pink p-2 my-[1.5px] rounded-[15px] flex items-center hover:transition-all linear duration-200">
        <i class="fa-solid fa-check  text-xl"></i><span class="ml-2 text-[15px]">Fee Status</span>
      </RouterLink>
      <RouterLink to="/admin-panel/payments" active-class="active" @click="toggleSidebar"
        class="bg-college-white hover:bg-admin-pink p-2 my-[1.5px] rounded-[15px] flex items-center hover:transition-all linear duration-200">
        <i class="fa-solid fa-credit-card text-xl"></i><span class="ml-2 text-[15px]">Payments</span>
      </RouterLink>
      
      
      
      <RouterLink to="/admin-panel/administrators" active-class="active" @click="toggleSidebar"
        class="bg-college-white hover:bg-admin-pink p-2 my-[1.5px] rounded-[15px] flex items-center hover:transition-all linear duration-200">
        <i class="fa-solid fa-user-tie text-xl"></i><span class="ml-2 text-[15px]">Administrators</span>
      </RouterLink>
      <!-- <RouterLink to="/admin-panel/fee-status" active-class="active" @click="toggleSidebar"
        class="bg-college-white hover:bg-admin-pink p-2 my-[1.5px] rounded-[15px] flex items-center hover:transition-all linear duration-200">
        <i class="fa-solid fa-check text-xl"></i><span class="ml-2 text-[15px]">Fee Status</span>
      </RouterLink> -->
      <RouterLink to="/admin-panel/my-institution" active-class="active" @click="toggleSidebar" v-if="profile.type == 'Head Admin'"
        class="bg-college-white hover:bg-admin-pink p-2 my-[1.5px] rounded-[15px] flex items-center hover:transition-all linear duration-200">
        <i class="fa-solid fa-building-columns text-xl"></i><span class="ml-2 text-[15px]">My Institution </span>
      </RouterLink>
      <RouterLink to="/admin-panel/inquiries" active-class="active" @click="toggleSidebar"
        class="bg-college-white hover:bg-admin-pink p-2 my-[1.5px] rounded-[15px] flex items-center hover:transition-all linear duration-200">
        <i class="fa-solid fa-comment text-xl"></i><span class="ml-2 text-[15px]">Inquiries</span>
      </RouterLink>
      <RouterLink to="/admin-panel/faqs" active-class="active" @click="toggleSidebar"
        class="bg-college-white hover:bg-admin-pink p-2 my-[1.5px] rounded-[15px] flex items-center hover:transition-all linear duration-200">
        <i class="fa-solid fa-question text-xl"></i><span class="ml-2 text-[15px]">FAQs</span>
      </RouterLink>
    </nav>
    <!-- <div class="flex-grow">
      <RouterView />
    </div> -->
  </section>
</template>

<style scoped>
.active {
  background-color: #FFC6D3;
}
.flex-grow {
  flex-grow: 1;
}
</style>
