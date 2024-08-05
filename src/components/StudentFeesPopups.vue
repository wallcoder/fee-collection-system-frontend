<script setup>
import { useStudentFeeStore } from "../stores/studentFee";
import { storeToRefs } from 'pinia';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


const studentFeeStore = useStudentFeeStore();
const { modal, isOpenNewEntry, errorMessage, isOpenDel, isOpenEdit, studentFeeName,
    amount,
    course, regNo,
    name,
    phone,
    rollNo,
    email,
    enrollmentYear,
    question, answer,
    courses, delId, editId } = storeToRefs(studentFeeStore);
const { closePopup, getCourses, insertStudentFee,
    deleteStudentFee,
    editStudentFee } = studentFeeStore;





</script>

<template>
    <!-- POPUPS -->
    <Teleport to="#modal">
        <!-- NEW ENTRY -->
        <Transition name="modal">
            <div class="fixed top-0 left-0 z-[9999] w-[100vw] h-[100%] flex justify-center items-center bg-black bg-opacity-50"
                v-if="isOpenNewEntry">

                <div class="z-20" ref="modal">
                    <form class="bg-white p-4 rounded-lg w-[300px]" @submit.prevent="insertStudentFee">
                        <span class="flex justify-end w-full pr-2">
                            <span class="fa-solid fa-xmark hover:cursor-pointer" @click="closePopup"></span>
                        </span>
                        <div class="p-4">
                            <h1 class="pb-2">New Entry</h1>
                            <div class="mb-5">
                                <label for="course" class="block mb-2 text-sm font-medium text-gray-900">Select Student</label>



                                <select v-model="selectedCourseId" @change="updateSemNo" name="course" id="course" required
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                    <option v-for="course in courses" :key="course.course_id" :value="course.course_id">
                                        {{ course.name }}
                                    </option>
                                </select>

                                

                            </div>
                            <div class="mb-5">
                                <label for="course" class="block mb-2 text-sm font-medium text-gray-900">Select Student</label>



                                <select v-model="selectedCourseId" @change="updateSemNo" name="course" id="course" required
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                    <option v-for="course in courses" :key="course.course_id" :value="course.course_id">
                                        {{ course.name }}
                                    </option>
                                </select>

                                

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
                v-if="isOpenDel">
                <div ref="modal" class="bg-white p-4 rounded-lg w-[300px] flex flex-col items-center">
                    <!-- <PopupForm class="z-20" ref="modal" /> -->
                    <h1>Are you sure you want to delete?</h1>
                    <div class="flex  w-full justify-center">
                        <button @click="deleteStudentFee(delId)"
                            class="bg-college-blue p-1 rounded-lg text-white w-[30%] m-2 hover:bg-hover-blue">Yes</button>
                        <button @click="closePopup"
                            class="bg-college-blue p-1 rounded-lg text-white w-[30%] m-2 hover:bg-hover-blue ">No</button>
                    </div>
                </div>
            </div>

        </Transition>

        <!-- EDIT COMPONENT -->
        <Transition name="modal">
            <div class="fixed top-0 left-0 z-[9999] w-[100vw] h-[100%] flex justify-center items-center bg-black bg-opacity-50"
                v-if="isOpenEdit">

                <div class="z-20" ref="modal">
                    <form class="bg-white p-4 rounded-lg w-[300px]" @submit.prevent="editStudentFee(editId)">
                        <span class="flex justify-end w-full pr-2">
                            <span class="fa-solid fa-xmark hover:cursor-pointer" @click="closePopup"></span>
                        </span>
                        <div class="p-4">
                            <h1 class="pb-2">New Entry</h1>
                            <div class="mb-5">
                                <label for="course" class="block mb-2 text-sm font-medium text-gray-900">Question</label>


                                <textarea name="" id="" cols="0" rows="5" v-model="question" placeholder="Write Question"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"></textarea>
                                <span class="text-red-700 text-sm">{{ errorMessage }}</span>

                            </div>
                            <div class="mb-5">
                                <label for="course" class="block mb-2 text-sm font-medium text-gray-900">Answer</label>


                                <textarea name="" id="" cols="0" rows="5" v-model="answer" placeholder="Write Answer"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"></textarea>
                                <span class="text-red-700 text-sm">{{ errorMessage }}</span>

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