
<script setup>
import { RouterLink } from 'vue-router';

import { storeToRefs } from 'pinia'
import { useMyInstitutionStore } from '@/stores/myInstitution';
import LoaderSpinner from '../components/LoaderSpinner.vue';
const institution = useMyInstitutionStore();
const { email, mainWebsiteUrl, phone } = storeToRefs(institution)
const { getMyInstitutionNoAuth } = institution;
getMyInstitutionNoAuth()

</script>

<template>
    <footer class="w-[100%] min-h-[30vh] bg-black text-college-white xl:px-[15%] lg:px-[10%] md:px-[2%] px-[2%] items-center transition-all duration-500 linear flex justify-between items-start text-sm">
        <div class="flex flex-col ">
            <span class="my-1 ">Copyright© 2024</span>
            <RouterLink to="/faqs" class="my-1 hover:text-college-grey">FAQs</RouterLink>
            <RouterLink to="/terms-of-use" class="my-1 hover:text-college-grey">Terms of Use</RouterLink>
            <RouterLink to="/" class="my-1 hover:text-college-grey">Home</RouterLink>
        </div>
        <div class="flex flex-col justify-between">
            <a :href="mainWebsiteUrl" class="my-1  hover:text-college-grey">Our Main Website</a>
            <span class="my-1 ">Email: {{ email }}</span>
            <span class="my-1 ">Phone: {{ phone }}</span>
            
        </div>
        <div class="flex flex-col">
            <span class="my-1 ">Our Socials:</span>
            <a href="#" class="my-1  hover:text-college-grey">Instagram</a>
            <a href="#" class="my-1  hover:text-college-grey">Facebook</a>
        </div>
    </footer>
</template>

<style scoped>
footer {
    background-color: black;
}
</style>