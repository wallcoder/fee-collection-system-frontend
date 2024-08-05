<script setup>
import { useCourseStore } from "../stores/courses";
import { storeToRefs } from 'pinia';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


const courseStore = useCourseStore();
const { modal, isOpenPopupFormRegister, isOpenPopupForm, courseNames, courseNameInsert, errorMessage, courseNameId, noOfSem, isDelPopup, courseDelId, isEditPopup, course, courseEditId } = storeToRefs(courseStore);
const { getCourseNames, insertCourseName, closePopupForm, insertCourse, deleteCourse, editCourseById } = courseStore;

getCourseNames();


</script>

<template>
    <!-- POPUPS -->
    <Teleport to="#modal">
        <!-- NEW ENTRY -->
        <Transition name="modal">
            <div class="fixed top-0 left-0 z-[9999] w-[100vw] h-[100%] flex justify-center items-center bg-black bg-opacity-50"
                v-if="isOpenPopupForm">
                <!-- <PopupForm class="z-20" ref="modal" /> -->
                <div class="z-20" ref="modal">
                    <form class="bg-white p-4 rounded-lg w-[300px] " @submit.prevent="insertCourse">
                        <span class="flex justify-end w-full pr-2">
                            <span class="fa-solid fa-xmark hover:cursor-pointer" @click="closePopupForm"></span>
                        </span>
                        <div class="p-4">
                            <h1 class="pb-2">New Entry</h1>
                            <div class="mb-5">
                                <label for="course" class="block mb-2 text-sm font-medium text-gray-900">Course
                                    Name</label>

                                <select id="course" v-model="courseNameId"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    required>
                                    <option :value="courseName.course_name_id" v-for="courseName in courseNames"
                                        :key="courseName.course_name_id">{{ courseName.course_name }}</option>
                                </select>
                                <span class="text-red-700 text-sm">{{ errorMessage }}</span>

                            </div>
                            <div class="mb-5">
                                <label for="noOfSemesters" class="block mb-2 text-sm font-medium text-gray-900">Number of
                                    Semesters</label>
                                <input type="number" id="noOfSemesters" v-model="noOfSem" max="10" min="1"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    required placeholder="Enter Number of Semesters" />
                            </div>

                            <button type="submit"
                                class="bg-college-blue p-2 rounded-lg text-white w-full hover:bg-hover-blue">Submit</button>
                        </div>
                    </form>
                </div>


            </div>


        </Transition>

        <!-- REGISTER COURSE -->
        <Transition name="modal">
            <div class="fixed top-0 left-0 z-[9999] w-[100vw] h-[100%] flex justify-center items-center bg-black bg-opacity-50"
                v-if="isOpenPopupFormRegister">
                <!-- <PopupForm class="z-20" ref="modal" /> -->
                <div class="z-20" ref="modal">
                    <form class="bg-white p-4 rounded-lg w-[300px]" @submit.prevent="insertCourseName">
                        <span class="flex justify-end w-full pr-2">
                            <span class="fa-solid fa-xmark hover:cursor-pointer" @click="closePopupForm"></span>
                        </span>
                        <div class="p-4">
                            <h1 class="pb-2">Register Course</h1>

                            <div class="mb-5">
                                <label for="noOfSemesters" class="block mb-2 text-sm font-medium text-gray-900">Course
                                    Name</label>
                                <input type="text" id="noOfSemesters"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    required placeholder="Enter Course Name" v-model="courseNameInsert" />
                                <span class="text-red-700 text-sm">{{ errorMessage }} </span>
                            </div>


                            <button type="submit"
                                class="bg-college-blue p-2 rounded-lg text-white w-full hover:bg-hover-blue">Submit</button>
                        </div>
                    </form>
                </div>
            </div>

        </Transition>

        <!-- CONFIRM DELETE -->
        <Transition name="modal">
            <div class="fixed top-0 left-0 z-[9999] w-[100vw] h-[100%] flex justify-center items-center bg-black bg-opacity-50"
                v-if="isDelPopup">
                <div ref="modal" class="bg-white p-4 rounded-lg w-[300px] flex flex-col items-center">
                    <!-- <PopupForm class="z-20" ref="modal" /> -->
                    <h1>Are you sure you want to delete?</h1>
                    <div class="flex  w-full justify-center">
                        <button @click="deleteCourse(courseDelId)"
                            class="bg-college-blue p-1 rounded-lg text-white w-[30%] m-2 hover:bg-hover-blue">Yes</button>
                        <button @click="isDelPopup = false"
                            class="bg-college-blue p-1 rounded-lg text-white w-[30%] m-2 hover:bg-hover-blue ">No</button>
                    </div>
                </div>
            </div>

        </Transition>

        <!-- EDIT COURSE -->
        <Transition name="modal">
            <div class="fixed top-0 left-0 z-[9999] w-[100vw] h-[100%] flex justify-center items-center bg-black bg-opacity-50"
                v-if="isEditPopup">
                <!-- <PopupForm class="z-20" ref="modal" /> -->
                <div class="z-20" ref="modal">
                    <form class="bg-white p-4 rounded-lg w-[300px]" @submit.prevent="editCourseById(courseEditId)">
                        <span class="flex justify-end w-full pr-2">
                            <span class="fa-solid fa-xmark hover:cursor-pointer" @click="closePopupForm"></span>
                        </span>
                        <div class="p-4">
                            <h1 class="pb-2">Edit Course</h1>
                            <div class="mb-5">
                                <label for="course" class="block mb-2 text-sm font-medium text-gray-900">Course
                                    Name</label>

                                <select id="course" v-model="courseNameId"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    required>
                                    <option :value="courseName.course_name_id" v-for="courseName in courseNames"
                                        :key="courseName.course_name_id">{{ courseName.course_name }}</option>
                                </select>

                                <span class="text-red-700 text-sm">{{ errorMessage }}</span>

                            </div>
                            <div class="mb-5">
                                <label for="noOfSemesters" class="block mb-2 text-sm font-medium text-gray-900">Number of
                                    Semesters</label>
                                <input type="number" id="noOfSemesters" v-model="noOfSem" max="10" min="1"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    required placeholder="Enter Number of Semesters" />
                            </div>

                            <button type="submit"
                                class="bg-college-blue p-2 rounded-lg text-white w-full hover:bg-hover-blue">Save</button>
                        </div>
                    </form>
                </div>


            </div>


        </Transition>



    </Teleport>
</template>
<style scoped></style>