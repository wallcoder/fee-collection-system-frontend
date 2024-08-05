<script setup>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { ref, watch } from 'vue';

import { onClickOutside } from '@vueuse/core';
import CourseTable from '../components/CourseTable.vue';
import CoursePopups from '../components/CoursePopups.vue';
import PagiNav from '../components/PagiNav.vue';

import Button from '../components/Button.vue';
import RoundButton from '../components/RoundButton.vue';
import Empty from '../components/Empty.vue'
import SkeletonLoader from '../components/SkeletonLoader.vue'
import Error from "../components/Error.vue"

import { useCourseStore } from "../stores/courses";
import { storeToRefs } from 'pinia';

const courseStore = useCourseStore();
const { modal, loading, filteredItems, isOpenPopupFormRegister, items,
    currentPage, totalPages, error, isOpenPopupForm, courseNameInsert, errorMessage, isDelPopup, isEditPopup, course, noOfSem, courseNameId, isSearch } = storeToRefs(courseStore);
const { getCoursesPaginated, deleteCourse, searchCourse, getCourseNames, closePopupForm } = courseStore;


const courses = ref([]);
const search = ref("");


onClickOutside(modal, () => {
    isOpenPopupForm.value = false;
    isOpenPopupFormRegister.value = false;
    courseNameInsert.value = "";
    errorMessage.value = "";
    isDelPopup.value = false;
    isEditPopup.value = false;
    noOfSem.value = null;
    courseNameId.value = null;

});

// loading.value = true;
// getCourses();
getCoursesPaginated();


watch(search, (newValue) => {
    if (!newValue) {
        console.log("heell", currentPage.value);
        searchCourse(newValue);
        filteredItems.value = items.value;
        console.log(items.value);
    } else {
        searchCourse(1, newValue);
        filteredItems.value = items.value.filter(course =>
            course.course_name.toLowerCase().includes(newValue.toLowerCase()) ||
            course.course_id.toString().includes(newValue)
        );
    }
});


</script>

<template v-motion-slide-visible-once-right>
    <section class="w-full h-full">
        <section v-if="error && !loading">
            <div class="w-[100%] h-[85vh] flex justify-center items-center ">
                <Error />

            </div>

        </section>
        <div v-else>


            <div>
                <section class="flex flex-col items-center w-[100%] h-[85vh]  justify-center "
                    v-if="items.length === 0 && !loading && isSearch">

                    <Empty title="courses" class="mb-2" v-motion-fade-visible-once/>
                    <div class="flex">
                        <RoundButton text="+"
                            class="bg-college-blue text-college-white p-2 mx-1 w-[50px] h-[50px] rounded-full text-4xl flex justify-center items-center hover:bg-hover-blue"
                            @click="isOpenPopupForm = true" v-motion-fade-visible-once />
                        <RoundButton text="+"
                            class="bg-red-500 hover:bg-red-400 mx-1 text-college-white p-2 mx-1 w-[50px] h-[50px] rounded-full text-4xl flex justify-center items-center"
                            @click="isOpenPopupFormRegister = true" v-motion-fade-visible-once/>
                    </div>
                </section>
                <section v-else>

                    <!-- Skeleton loader -->
                    <div class="w-full h-full" v-if="loading">
                        <SkeletonLoader v-motion-fade-visible-once/>
                    </div>
                    <!-- Actual Content -->
                    <div class="w-full h-full" v-else-if="!loading && !error">
                        <section class="flex flex-col" >
                            <h1 class="text-lg mb- pl-1" v-motion-fade-visible-once>Courses</h1>
                            <div class="flex smartphone:justify-start mb-2 tablet:justify-end">
                                <input type="text" name="search" v-model.trim="search"
                                    class="py-1 px-2 rounded-lg text-gray-800 text-base shadow-lg sm:w-auto mb-2 sm:mb-0 smartphone:mr-0 tablet:mr-2 smartphone:w-[100%] smartphone-lg:w-[50%]"
                                    placeholder="Search by ID or Name" v-motion-fade-visible-once>
                                <Button text="New Entry" @click="isOpenPopupForm = true" class="hidden tablet:block mr-2 hover:bg-hover-blue" v-motion-fade-visible-once />
                                <Button text="Register Course" @click="isOpenPopupFormRegister = true"
                                    class="hidden tablet:block hover:bg-hover-blue" v-motion-fade-visible-once/>
                            </div>

                            <!-- TABLE -->
                            <CourseTable v-motion-fade-visible-once/>

                            <div class="fixed roundBtn tablet:hidden bottom-2 right-4">
                                <div flex>
                                    <div @click="isOpenPopupForm = true">
                                        <RoundButton text="+"
                                            class="bg-college-blue text-college-white p-2 w-[50px] h-[50px] my-2 rounded-full text-4xl flex justify-center items-center hover:bg-hover-blue" />
                                    </div>
                                    <div @click="isOpenPopupFormRegister = true">
                                        <RoundButton text="+"
                                            class="bg-red-600 text-college-white p-2 w-[50px] h-[50px] rounded-full my-2 text-4xl flex justify-center items-center hover:bg-red-500" />
                                    </div>
                                </div>
                            </div>
                        </section>

                        <!-- <PagiNav :totalPages="totalPages" :currentPage="currentPage" :onClick="getCoursesPaginated" /> -->

                        <div class="flex justify-center" v-if="totalPages > 1">

                            <nav aria-label="Page navigation example" class="my-2">
                                <ul class="flex items-center -space-x-px h-8 text-sm">
                                    <li>
                                        <button :disabled="currentPage === 1"
                                            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 "
                                            @click="getCoursesPaginated(currentPage - 1)">
                                            <span class="sr-only">Next</span>
                                            <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                                    stroke-width="2" d="M5 1 1 5l4 4" />
                                            </svg>
                                        </button>

                                    </li>
                                    <li v-for="page in totalPages" @click="getCoursesPaginated(page)" :key="page">
                                        <a href="#"
                                            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500  border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                                            :class="currentPage == page ? 'bg-gray-200' : 'bg-white'">{{
                                                page }} </a>
                                    </li>

                                    <li>

                                        <button :disabled="currentPage === totalPages"
                                            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 "
                                            @click="getCoursesPaginated(currentPage + 1)">
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
        </div>
        <CoursePopups />

    </section>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
    transition: all 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
    transform: scale(1.1);
}
</style>
