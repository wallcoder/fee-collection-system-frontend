<script setup>
import { RouterLink } from 'vue-router';
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';

let isOpen = ref(false);
let menuBtn = ref(true);
const toggleMenu = () => {
    isOpen.value = !isOpen.value;
    console.log(isOpen.value);
    menuBtn.value = !menuBtn.value;
}
const closeMenu = () => {
    isOpen.value = false;
    menuBtn.value = true;
}
const sidebar = ref(null);

onClickOutside(sidebar, () => {
    if (isOpen.value) {
        toggleMenu();
    }
})

</script>

<template>
    <nav ref="sidebar" class="flex justify-between xl:px-[15%] lg:px-[10%] md:px-[2%] px-[2%] items-center transition-all duration-500 linear max-lg:bg-[#e9eaea]">
        <RouterLink to="/" class="logo flex items-center"><img src="../images/logo.png" alt="college-logo" class="w-16 h-16">
            <span>FEE PORTAL</span>
        </RouterLink>

        <div class="navbar hidden justify-between items-center lg:flex">
            <div class="mr-12">
                <RouterLink to="/" class="mr-8 hover:underline transition-all duration-200 linear">Home</RouterLink>
                <RouterLink to="/frequently-asked-questions" class="mr-8 hover:underline transition-all duration-200 linear">FAQs</RouterLink>
                <RouterLink to="/student-login" class="mr-8 hover:underline transition-all duration-200 linear">Pay Fee</RouterLink>
                <RouterLink to="/contact" class="mr-8 hover:underline transition-all duration-200 linear">Contact</RouterLink>
            </div>
            <RouterLink to="/admin-login" class="bg-college-blue text-college-white px-4 py-1 hover:bg-hover-blue transition-all duration-200 linear" target="_blank">Admin</RouterLink>
        </div>
        <div  class="navbar justify-between items-center lg:hidden right-[-800px] absolute right-0 top-[62px] bg-college-white w-[100%] text-center md:w-[180px] transition-all duration-200 linear z-50" :class="isOpen ? 'right-[0px]' : 'right-[-800px]'" name="sidebar">
            <div class="flex flex-col text-center md:text-left">
                <RouterLink to="/" class="bg-[#e9eaea] px-4 py-3 hover:text-hover-blue transition-all duration-200 linear text-college-black font-semibold" @click="toggleMenu">Home</RouterLink>
                <RouterLink to="/frequently-asked-questions" class="bg-[#e9eaea] px-4 py-3 hover:text-hover-blue transition-all duration-200 linear text-college-black font-semibold" @click="toggleMenu">FAQs</RouterLink>
                <RouterLink to="/student-login" class="bg-[#e9eaea] px-4 py-3 hover:text-hover-blue transition-all duration-200 linear text-college-black font-semibold" @click="toggleMenu">Pay Fee</RouterLink>
                <RouterLink to="/contact" class="bg-[#e9eaea] px-4 py-3 hover:text-hover-blue transition-all duration-200 linear text-college-black font-semibold" @click="toggleMenu">Contact</RouterLink>
                <RouterLink to="/admin-login" class="bg-[#e9eaea] px-4 py-3 hover:text-hover-blue transition-all duration-200 linear text-college-black font-semibold" @click="toggleMenu" target="_blank">Admin</RouterLink>
            </div>
        </div>
        <div class="text-2xl cursor-pointer block lg:hidden" @click="toggleMenu"><i :class="menuBtn ? 'fa-sharp fa-solid fa-bars' : 'fa-solid fa-xmark'"></i></div>
    </nav>
</template>

<style scoped>
    .navi {
        width: 100%;
    }
</style>
