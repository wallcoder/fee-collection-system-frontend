
<script setup>

import { storeToRefs } from "pinia";
import { ref } from 'vue';
import { useFaqStore } from "../stores/faqs";
import { useLoaderStore } from "../stores/loader";
import LoaderSpinner from "../components/LoaderSpinner.vue";

const faqStore = useFaqStore();
const { getFaqsNoAuth } = faqStore;
const { items,
    loading,
    error,
    totalPages,

    filteredItems,
    isOpenNewEntry,
    isInitial,

    currentPage, } = storeToRefs(faqStore);

getFaqsNoAuth();
</script>

<template>
    <section class="xl:px-[15%] lg:px-[10%] md:px-[2%] px-[2%] py-10 w-100% flex justify-center">
        <div class="flex-col justify-center" v-if="items.length > 0">
            <h1 class="font-bold text-3xl text-center">FREQUENTLY ASKED QUESTIONS(FAQS)</h1>
            <div class="mt-4" v-motion-fade-visible-once v-for="item in items" :key="item.faq_id">
                <h1 class="font-bold">{{ item.question }}</h1>
                <div class="bg-college-white w-[100%] min-h-[100px] p-2 min-w-[100%] ">
                    {{ item.answer }}
                </div>
            </div>
            <div class="flex justify-center" v-if="totalPages > 1">

                <nav aria-label="Page navigation example" class="my-2">
                    <ul class="flex items-center -space-x-px h-8 text-sm">
                        <li>
                            <button :disabled="currentPage === 1"
                                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300  hover:bg-gray-100 hover:text-gray-700 "
                                @click="getFaqsNoAuth(false, currentPage - 1)">
                                <span class="sr-only">Next</span>
                                <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="M5 1 1 5l4 4" />
                                </svg>
                            </button>

                        </li>
                        <li v-for="page in totalPages" @click="getFaqsNoAuth(false, page)" :key="page">
                            <a href="#"
                                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500  border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                                :class="currentPage == page ? 'bg-gray-200' : 'bg-white'">{{
                                    page }} </a>
                        </li>

                        <li>

                            <button :disabled="currentPage === totalPages"
                                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300  hover:bg-gray-100 hover:text-gray-700 "
                                @click="getFaqsNoAuth(false, currentPage + 1)">
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
        <div v-else>
            <h1 class="text-gray-600 text-3xl text-center mt-5">NO FAQS ADDED YET</h1>
        </div>

        <LoaderSpinner />
    </section>
</template>