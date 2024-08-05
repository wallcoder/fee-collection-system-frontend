<script setup>
import Empty from "../components/Empty.vue"
import RoundButton from "../components/RoundButton.vue"
import { useAdminStore } from "../stores/admins";
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import AdminsTable from "../components/AdminsTable.vue";

import Button from '../components/Button.vue';
import SkeletonLoader from '../components/SkeletonLoader.vue'
import Error from "../components/Error.vue"
import AdminsPopup from '../components/AdminsPopups.vue'

const adminStore = useAdminStore();
const { items,
    loading,
    error,
    totalPages,
    initial,
    
    filteredItems,
    isOpenNewEntry,
    
    currentPage, } = storeToRefs(adminStore);
const { getAdmins } = adminStore;

const search = ref("");

getAdmins();
watch(search, (newValue) => {
    if (!newValue) {

        getAdmins(newValue);
        filteredItems.value = items.value;
        console.log(items.value);
    } else {
        getAdmins(false, 1, newValue);
        filteredItems.value = items.value.filter(admin =>
            admin.fname.toLowerCase().includes(newValue.toLowerCase()) ||
            admin.lname.toLowerCase().includes(newValue.toLowerCase()) ||
            admin.email.toLowerCase().includes(newValue.toLowerCase()) ||
            admin.type.toLowerCase().includes(newValue.toLowerCase()) ||
            admin.admin_id.toString().includes(newValue) ||
            admin.phone.toString().includes(newValue)
        );
    }
});




</script>

<template>
    <section >
        <section v-if="error && !loading" >
            <div class="w-[100%] h-[85vh] flex justify-center items-center " >
                <Error v-motion-fade-visible-once/>

            </div>

        </section>
        <div v-else >
            <div>
                <!-- Empty Case -->
                <section class="flex flex-col items-center w-[100%] h-[85vh]  justify-center "
                    v-if="items.length === 0 && !loading && initial" >

                    <Empty title="admins" class="mb-2" v-motion-fade-visible-once/>
                    <div class="flex">
                        <RoundButton text="+"
                            class="bg-college-blue text-college-white p-2 mx-1 w-[50px] h-[50px] rounded-full text-4xl flex justify-center items-center"
                            @click="isOpenNewEntry = true" v-motion-fade-visible-once/>

                    </div>
                </section>
                <section v-else >

                    <!-- Skeleton loader -->
                    <div class="w-full h-full" v-if="loading">
                        <SkeletonLoader v-motion-fade-visible-once/>
                    </div>
                    <!-- Actual Content -->
                    <div class="w-full h-full" v-else-if="!loading && !error">
                        <section class="flex flex-col">
                            <h1 class="text-lg mb- pl-1">Administrators</h1>
                            <div class="flex smartphone:justify-start mb-2 tablet:justify-end">
                                <input type="text" name="search" v-model.trim="search"
                                    class="py-1 px-2 rounded-lg text-gray-800 text-base shadow-lg sm:w-auto mb-2 sm:mb-0 smartphone:mr-0 tablet:mr-2 smartphone:w-[100%] smartphone-lg:w-[50%]"
                                    placeholder="Search" v-motion-fade-visible-once>
                                <Button text="New Entry" @click="isOpenNewEntry = true" class="hidden tablet:block mr-2 hover:bg-hover-blue" v-motion-fade-visible-once/>

                            </div>

                            <!-- TABLE -->
                            <AdminsTable v-motion-fade-visible-once/>

                            <div class="fixed roundBtn tablet:hidden bottom-2 right-4">
                                <div flex>
                                    <div @click="isOpenNewEntry = true">
                                        <RoundButton text="+"
                                            class="bg-college-blue text-college-white p-2 w-[50px] h-[50px] my-2 rounded-full text-4xl flex justify-center items-center hover:bg-hover-blue" />
                                    </div>

                                </div>
                            </div>
                        </section>

                        <!-- <PagiNav :totalPages="totalPages" :currentPage="currentPage" :onClick="getAdmins"false,  /> -->

                        <div class="flex justify-center" v-if="totalPages > 1">

                            <nav aria-label="Page navigation example" class="my-2">
                                <ul class="flex items-center -space-x-px h-8 text-sm">
                                    <li>
                                        <button :disabled="currentPage === 1"
                                            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 "
                                            @click="getAdmins(false, currentPage - 1)">
                                            <span class="sr-only">Next</span>
                                            <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                                    stroke-width="2" d="M5 1 1 5l4 4" />
                                            </svg>
                                        </button>

                                    </li>
                                    <li v-for="page in totalPages" @click="getAdmins(false, page)" :key="page">
                                        <a href="#"
                                            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500  border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                                            :class="currentPage == page ? 'bg-gray-200' : 'bg-white'">{{
                                                page }} </a>
                                    </li>

                                    <li>

                                        <button :disabled="currentPage === totalPages"
                                            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 "
                                            @click="getAdmins(false, currentPage + 1)">
                                            <span class="sr-only">Next</span>
                                            <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                                    stroke-width="2" d="m1 9 4-4-4-4" />
                                            </svg>
                                        </button>

                                    </li>
                                </ul>
                            </nav>
                        </div>








                    </div>
                </section>
            </div>
            <AdminsPopup />
        </div>
    </section>
</template>