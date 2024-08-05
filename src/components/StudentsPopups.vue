<script setup>
import { useStudentStore } from "../stores/student";
import { storeToRefs } from 'pinia';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


const studentStore = useStudentStore();
const { modal, isOpenNewEntry, errorMessage, isOpenDel, isOpenEdit, studentName,
    amount,
    course, regNo,
    name,
    phone,
    rollNo,
    email,
    enrollmentYear, startDate,
    question, answer,
    courses, delId, editId } = storeToRefs(studentStore);
const { closePopup, getCourses, insertStudent,
    deleteStudent,
    editStudent } = studentStore;


    const currentYear = new Date().getFullYear();
    console.log("crrent: ", currentYear)

getCourses();

</script>

<template>
    <!-- POPUPS -->
    <Teleport to="#modal">
        <!-- NEW ENTRY -->
        <Transition name="modal">
            <div class="fixed inset-0 z-[9999] flex justify-center items-center bg-black bg-opacity-50 overflow-auto"
                v-if="isOpenNewEntry">
                <div class="z-20 w-full max-w-lg mx-4 my-8 smartphone:mt-[250px] tablet:mt-0" ref="modal">
                    <form class="bg-white p-4 rounded-lg" @submit.prevent="insertStudent">
                        <span class="flex justify-end w-full pr-2">
                            <span class="fa-solid fa-xmark hover:cursor-pointer" @click="closePopup"></span>
                        </span>

                        <div class="p-4">
                            <h1 class="pb-2 text-xl font-semibold">New Entry</h1>
                            <div class="flex flex-col space-y-4 tablet:space-y-0 tablet:flex-row tablet:space-x-4">
                                <div class="p-2 flex-1">
                                    <div class="mb-5">
                                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Student
                                            Name</label>
                                        <input v-model="name" type="text" id="name"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Enter Student Name" required>

                                    </div>
                                    <div class="mb-5">
                                        <label for="regNo" class="block mb-2 text-sm font-medium text-gray-900">Registration
                                            Number</label>
                                        <input v-model="regNo" type="text" id="regNo"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Enter Registration Number" required>
                                        <span class="text-red-700 text-sm">{{ errorMessage }}</span>
                                    </div>
                                    <div class="mb-5">
                                        <label for="email"
                                            class="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                        <input v-model="email" type="text" id="email"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Enter Email" required>

                                    </div>
                                    <div class="mb-5">
                                        <label for="rollNo" class="block mb-2 text-sm font-medium text-gray-900">Roll
                                            No</label>
                                        <input v-model="rollNo" type="text" id="rollNo"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Enter Roll No" required>

                                    </div>
                                </div>
                                <div class="p-2 flex-1">
                                    <div class="mb-5">
                                        <label for="enrollmentYear"
                                            class="block mb-2 text-sm font-medium text-gray-900">Enrollment Year</label>
                                        <input v-model="enrollmentYear" type="number" id="enrollmentYear" max="9999" :min="currentYear"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Enter Enrollment Year" required>

                                    </div>
                                    <!-- <div class="mb-5">
                                        <label for="startDate" class="block mb-2 text-sm font-medium text-gray-900">First Fee Due Date</label>
                                        <input v-model="startDate" type="date" id="startDate" required
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">

                                    </div> -->
                                    <div class="mb-5">
                                        <label for="course" class="block mb-2 text-sm font-medium text-gray-900">Select
                                            Course Fee</label>
                                        <select v-model="course" id="course" required
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                            <option :value="c.course_id" v-for="c in courses" :key="c.course_id">{{
                                                c.course_name }}</option>
                                        </select>
                                    </div>
                                    <button type="submit"
                                        class="bg-college-blue p-2 rounded-lg text-white w-full hover:bg-hover-blue mt-7">Submit</button>
                                </div>
                            </div>
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
                        <button @click="deleteStudent(delId)"
                            class="bg-college-blue p-1 rounded-lg text-white w-[30%] m-2 hover:bg-hover-blue">Yes</button>
                        <button @click="closePopup"
                            class="bg-college-blue p-1 rounded-lg text-white w-[30%] m-2 hover:bg-hover-blue ">No</button>
                    </div>
                </div>
            </div>

        </Transition>

        <!-- EDIT COMPONENT -->
        <Transition name="modal">
            <div class="fixed inset-0 z-[9999] flex justify-center items-center bg-black bg-opacity-50 overflow-auto"
                v-if="isOpenEdit">
                <div class="z-20 w-full max-w-lg mx-4 my-8 smartphone:mt-[250px] tablet:mt-0" ref="modal">
                    <form class="bg-white p-4 rounded-lg" @submit.prevent="editStudent(editId)">
                        <span class="flex justify-end w-full pr-2">
                            <span class="fa-solid fa-xmark hover:cursor-pointer" @click="closePopup">{{  }}</span>
                        </span>

                        <div class="p-4">
                            <h1 class="pb-2 text-xl font-semibold">Edit Student</h1>
                            <div class="flex flex-col space-y-4 tablet:space-y-0 tablet:flex-row tablet:space-x-4">
                                <div class="p-2 flex-1">
                                    <div class="mb-5">
                                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Student
                                            Name</label>
                                        <input v-model="name" type="text" id="name"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Enter Student Name" required>

                                    </div>
                                    <div class="mb-5">
                                        <label for="regNo" class="block mb-2 text-sm font-medium text-gray-900">Registration
                                            Number</label>
                                        <input v-model="regNo" type="text" id="regNo"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Enter Registration Number" required>
                                        <span class="text-red-700 text-sm">{{ errorMessage }}</span>
                                    </div>
                                    <div class="mb-5">
                                        <label for="email"
                                            class="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                        <input v-model="email" type="text" id="email"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Enter Email" required>

                                    </div>
                                    <div class="mb-5">
                                        <label for="rollNo" class="block mb-2 text-sm font-medium text-gray-900">Roll
                                            No</label>
                                        <input v-model="rollNo" type="text" id="rollNo"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Enter Roll No" required>

                                    </div>
                                </div>
                                <div class="p-2 flex-1">
                                    <div class="mb-5">
                                        <label for="enrollmentYear"
                                            class="block mb-2 text-sm font-medium text-gray-900">Enrollment Year</label>
                                        <input v-model="enrollmentYear" type="number" id="enrollmentYear" max="9999" :min="currentYear"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Enter Enrollment Year" required>

                                    </div>
                                    <!-- <div class="mb-5">
                                        <label for="startDate" class="block mb-2 text-sm font-medium text-gray-900">Starting
                                            Date</label>
                                        <input v-model="startDate" type="date" id="startDate" required
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">

                                    </div> -->
                                    <div class="mb-5">
                                        <label for="course" class="block mb-2 text-sm font-medium text-gray-900">Select
                                            Course</label>
                                        <select v-model="course" id="course" required
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                            <option :value="c.course_id" v-for="c in courses" :key="c.course_id">{{
                                                c.course_name }}</option>
                                        </select>
                                    </div>
                                    <button type="submit"
                                        class="bg-college-blue p-2 rounded-lg text-white w-full hover:bg-hover-blue mt-7">Submit</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Transition>



    </Teleport>
</template>