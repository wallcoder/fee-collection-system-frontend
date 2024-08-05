
<script setup>
import { toDisplayString } from 'vue';
import { RouterLink } from 'vue-router';
import { storeToRefs } from 'pinia'
import { useMyInstitutionStore } from '@/stores/myInstitution';
import LoaderSpinner from '../components/LoaderSpinner.vue';
const institution = useMyInstitutionStore();
const { name } = storeToRefs(institution)
const { getMyInstitutionNoAuth } = institution;
getMyInstitutionNoAuth()

</script>

<template>
    <div class="flex justify-center  w-[100%] h-[60%] ">
        <div class="payFeeContainer">
            <img src="../images/logo 2.png" alt="" class="w-[290px] max-md:w-[250px] transition-all linear duration-200 ">
            <h1 class="max-md:text-2xl font-bold md:text-3xl transition-all linear duration-200 uppercase">{{ name }} FEE
                PORTAL</h1>
            <RouterLink to="/student-login"
                class="bg-college-blue text-college-white px-4 py-1 hover:bg-hover-blue transition-all duration-200 linear ">
                Pay Fee</RouterLink>
        </div>
        <LoaderSpinner/>
    </div>
</template>

<style scoped>
.payFeeContainer {
    margin-top: 125px;
    display: flex;
    flex-direction: column;
    justify-self: center;
    align-items: center;

}

/* h1{
        font-size: 30px;
        font-weight: 700;
        padding: none;
    } */
</style>

