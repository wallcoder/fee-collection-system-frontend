<script setup>
import { useFeeStructureStore } from "../stores/feeStructures";
import { storeToRefs } from 'pinia';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


const feeStructureStore = useFeeStructureStore();
const { modal, isOpenNewEntry, errorMessage, isOpenDel, isOpenEdit, feeStructureName,
    courseId, amount, description, semNo, feeComponents, feeComponentsInsert, total, isOpenView,
    question, answer, feeComponentId, selectedCourseId, feeMapping, courseName, dueDay, dueMonth,
    courses, delId, editId } = storeToRefs(feeStructureStore);
const { closePopup, getCourses, insertFeeStructure,
    deleteFeeStructure, addFeeComponent, removeFeeComponentInsert,
    editFeeStructure, updateSemNo } = feeStructureStore;

import { ref, computed } from 'vue';

const range = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};
const days = range(10, 31);


</script>

<template>
    <!-- POPUPS -->
    <Teleport to="#modal">
        <!-- NEW ENTRY -->
        <Transition name="modal">
            <div class="fixed top-0 left-0 z-[9999] w-full h-full flex justify-center items-center bg-black bg-opacity-50 overflow-y-auto"
                v-if="isOpenNewEntry">
                <div class="z-20 w-full max-w-[600px] md:max-w-[700px] mx-2 md:mx-0">
                    <form class="bg-white p-4 rounded-lg w-full md:max-w-[600px] mx-auto mt-[420px] tablet:mt-0" ref="modal"
                        @submit.prevent="insertFeeStructure">
                        <span class="flex justify-end w-full pr-2">
                            <span class="fa-solid fa-xmark hover:cursor-pointer" @click="closePopup"></span>
                        </span>
                        <div class="flex flex-col md:flex-row">
                            <div class="p-4 w-full">
                                <h1 class="pb-2">New Entry</h1>
                                <div class="mb-5">
                                    <label for="course" class="block mb-2 text-sm font-medium text-gray-900">Select
                                        Course</label>
                                    <select v-model="selectedCourseId" @change="updateSemNo" name="course" id="course"
                                        required
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                        <option v-for="course in courses" :key="course.course_id" :value="course.course_id">
                                            {{ course.course_name }}
                                        </option>
                                    </select>
                                </div>
                                <div class="mb-5">
                                    <label for="description" class="block mb-2 text-sm font-medium text-gray-900">Fee
                                        Description </label>
                                    <select v-model="description" name="description" id="description" required
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                        <option v-for="n in semNo" :value="`Semester-${n}`">Semester-{{ n }}</option>
                                    </select>
                                </div>
                                <div class="mb-5">
                                    <label for="dueDay" class="block mb-2 text-sm font-medium text-gray-900">Due
                                        Day (Select Valid Day) </label>
                                    <select v-model="dueDay" name="dueDay" id="dueDay" required
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                        <option :value="`0${n}`" v-for="n in 9">{{ n }}</option>
                                        <option :value="n" v-for="n in days">{{ n }}</option>
                                    </select>
                                </div>
                                <div class="mb-5">
                                    <label for="dueMonth" class="block mb-2 text-sm font-medium text-gray-900">Due
                                        Month </label>
                                    <select v-model="dueMonth" name="dueMonth" id="dueMonth" required
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                        <option value="01">January</option>
                                        <option value="02">February</option>
                                        <option value="03">March</option>
                                        <option value="04">April</option>
                                        <option value="05">May</option>
                                        <option value="06">June</option>
                                        <option value="07">July</option>
                                        <option value="08">August</option>
                                        <option value="09">September</option>
                                        <option value="10">October</option>
                                        <option value="11">November</option>
                                        <option value="12">December</option>
                                    </select>
                                </div>
                                <div class="mb-5">
                                    <label for="amount" class="block mb-2 text-sm font-medium text-gray-900">Total
                                        Amount</label>
                                    <input type="number" name="amount" id="amount" disabled :value="total" required
                                        class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                </div>
                                <button type="submit"
                                    class="bg-college-blue p-2 rounded-lg text-white w-full hover:bg-hover-blue">Submit</button>
                            </div>
                            <div class="p-4 w-full">
                                <h1 class="pb-2"></h1>
                                <div class="mb-5 mt-6">
                                    <label for="feeComponentId" class="block mb-2 text-sm font-medium text-gray-900">Select
                                        Fee Component</label>
                                    <select v-model="feeComponentId" name="feeComponentId" id="feeComponentId"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                        <option v-for="feeComponent in feeComponents" :key="feeComponent.fee_component_id"
                                            :value="feeComponent.fee_component_id">{{ feeComponent.fee_component_name }} ({{
                                                feeComponent.course }})
                                        </option>
                                    </select>
                                </div>
                                <button type="button"
                                    class="bg-college-blue p-2 rounded-lg text-white w-full hover:bg-hover-blue"
                                    @click="addFeeComponent">Add</button>
                                <div
                                    class="mt-5 mb-5 w-full h-[270px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 overflow-y-auto">
                                    <div v-for="fc in feeComponentsInsert" :key="fc.fee_component_id"
                                        class="flex justify-between items-center">
                                        <span>{{ fc.fee_component_name }}: {{ fc.amount }}</span>
                                        <i class="fa-solid fa-x text-[10px] hover:cursor-pointer"
                                            @click="removeFeeComponentInsert(fc.fee_component_id)"></i>
                                    </div>
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
                    <!-- <PopupDiv class="z-20" ref="modal" /> -->
                    <h1>Are you sure you want to delete?</h1>
                    <div class="flex  w-full justify-center">
                        <button @click="deleteFeeStructure(delId)"
                            class="bg-college-blue p-1 rounded-lg text-white w-[30%] m-2 hover:bg-hover-blue">Yes</button>
                        <button @click="closePopup"
                            class="bg-college-blue p-1 rounded-lg text-white w-[30%] m-2 hover:bg-hover-blue ">No</button>
                    </div>
                </div>
            </div>

        </Transition>

        <!-- EDIT COMPONENT -->
        <Transition name="modal">
            <div class="fixed top-0 left-0 z-[9999] w-full h-full flex justify-center items-center bg-black bg-opacity-50 overflow-y-auto"
                v-if="isOpenEdit">
                <div class="z-20 w-full max-w-[600px] md:max-w-[700px] mx-2 md:mx-0">
                    <form class="bg-white p-4 rounded-lg w-full md:max-w-[600px] mx-auto mt-[380px] tablet:mt-0" ref="modal"
                        @submit.prevent="editFeeStructure(editId)">
                        <span class="flex justify-end w-full pr-2">
                            <span class="fa-solid fa-xmark hover:cursor-pointer" @click="closePopup"></span>
                        </span>
                        <div class="flex flex-col md:flex-row">
                            <div class="p-4 w-full">
                                <h1 class="pb-2">Edit Fee Structure</h1>
                                <div class="mb-5">
                                    <label for="course" class="block mb-2 text-sm font-medium text-gray-900">Select
                                        Course</label>
                                    <select v-model="selectedCourseId" @change="updateSemNo" name="course" id="course"
                                        required
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                        <option v-for="course in courses" :key="course.course_id" :value="course.course_id">
                                            {{ course.course_name }}
                                        </option>
                                    </select>
                                </div>
                                <div class="mb-5">
                                    <label for="description" class="block mb-2 text-sm font-medium text-gray-900">Fee
                                        Description </label>
                                    <select v-model="description" name="description" id="description" required
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                        <option v-for="n in semNo" :value="`Semester-${n}`">Semester-{{ n }}</option>
                                    </select>
                                </div>
                                <div class="mb-5">
                                    <label for="dueDay" class="block mb-2 text-sm font-medium text-gray-900">Due
                                        Day (Select Valid Day) </label>
                                    <select v-model="dueDay" name="dueDay" id="dueDay" required
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                        <option :value="`0${n}`" v-for="n in 9">{{ n }}</option>
                                        <option :value="n" v-for="n in days">{{ n }}</option>
                                    </select>
                                </div>
                                <div class="mb-5">
                                    <label for="dueMonth" class="block mb-2 text-sm font-medium text-gray-900">Due
                                        Month </label>
                                    <select v-model="dueMonth" name="dueMonth" id="dueMonth" required
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                        <option value="01">January</option>
                                        <option value="02">February</option>
                                        <option value="03">March</option>
                                        <option value="04">April</option>
                                        <option value="05">May</option>
                                        <option value="06">June</option>
                                        <option value="07">July</option>
                                        <option value="08">August</option>
                                        <option value="09">September</option>
                                        <option value="10">October</option>
                                        <option value="11">November</option>
                                        <option value="12">December</option>
                                    </select>
                                </div>
                                <div class="mb-5">
                                    <label for="amount" class="block mb-2 text-sm font-medium text-gray-900">Total
                                        Amount</label>
                                    <input type="number" name="amount" id="amount" disabled :value="total" required
                                        class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                </div>
                                <button type="submit"
                                    class="bg-college-blue p-2 rounded-lg text-white w-full hover:bg-hover-blue">Submit</button>
                            </div>
                            <div class="p-4 w-full">
                                <h1 class="pb-2"></h1>
                                <div class="mb-5 mt-6">
                                    <label for="feeComponentId" class="block mb-2 text-sm font-medium text-gray-900">Select
                                        Fee Component</label>
                                    <select v-model="feeComponentId" name="feeComponentId" id="feeComponentId"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                        <option v-for="feeComponent in feeComponents" :key="feeComponent.fee_component_id"
                                            :value="feeComponent.fee_component_id">{{ feeComponent.fee_component_name }} ({{
                                                feeComponent.course }})
                                        </option>
                                    </select>
                                </div>
                                <button type="button"
                                    class="bg-college-blue p-2 rounded-lg text-white w-full hover:bg-hover-blue"
                                    @click="addFeeComponent">Add</button>
                                <div
                                    class="mt-5 mb-5 w-full h-[270px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 overflow-y-auto">
                                    <div v-for="fc in feeComponentsInsert" :key="fc.fee_component_id"
                                        class="flex justify-between items-center">
                                        <span>{{ fc.fee_component_name }}: {{ fc.amount }}</span>
                                        <i class="fa-solid fa-x text-[10px] hover:cursor-pointer"
                                            @click="removeFeeComponentInsert(fc.fee_component_id)"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>



        </Transition>

        <!-- VIEW -->
        <Transition name="modal">
            <div class="fixed top-0 left-0 z-[9999] w-[100vw] h-[100%] flex justify-center items-center bg-black bg-opacity-50 text-sm"
                v-if="isOpenView">

                <div class="z-20" ref="modal">
                    <div class="bg-white p-4 rounded-lg w-[350px] min-h-[500px]">
                        <span class="flex justify-end w-full pr-2">
                            <span class="fa-solid fa-xmark hover:cursor-pointer " @click="closePopup"></span>
                        </span>
                        <div class="p-1 h-[450px] ">
                            <h1>Fee Structure Details</h1>
                            <h1>{{ courseName }} {{ description }}</h1>
                            <div class="border-2 w-[100%] h-[95%] p-1">
                                <div v-for="f in feeMapping " class="flex justify-between ">
                                    <span>{{ f.fee_component_name }}</span>
                                    <span>₹{{ f.amount }}</span>
                                </div>
                                <hr class="my-2">
                                <div class="flex justify-between ">
                                    <span>Total Semester Fee: </span>
                                    <span>₹{{ amount }}</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>


            </div>


        </Transition>



    </Teleport>
</template>