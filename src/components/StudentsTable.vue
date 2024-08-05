<script setup>
import { useStudentStore } from "../stores/student";
import { storeToRefs } from 'pinia';


const studentStore = useStudentStore();
const { filteredItems, student, } = storeToRefs(studentStore);
const { activateEdit, activateDel, delId, editId } = studentStore;



</script>

<template>
    <div>
        <div class="overflow-auto rounded-lg shadow hidden md:block max-w-[100vw]">
            <table class="w-full">
                <thead class="bg-gray-50 border-b-2 border-gray-200">

                    <tr>
                        <th class="w-40 p-2 text-sm font-semibold text-left">ID</th>
                        <th class="w-40 p-2 text-sm font-semibold text-left">Reg No</th>
                        <th class="w-40 p-2 text-sm font-semibold text-left">Name</th>
                        <th class="w-40 p-2 text-sm font-semibold text-left">Course</th>
                        <th class="w-40 p-2 text-sm font-semibold text-left">Roll No</th>
                        <th class="w-40 p-2 text-sm font-semibold text-left">Email</th>
                        <th class="w-500 p-2 text-sm font-semibold text-left ">Enrollment year</th>
                        <th class="w-14 p-2 text-sm font-semibold text-left"></th>
                        <th class="w-14 p-2 text-sm font-semibold text-left"></th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">

                    <tr class="bg-white" v-for="item in filteredItems" :key="item.student_id" v-motion-fade-visible-once>
                        <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ item.student_id }}</td>
                        <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ item.reg_no }}</td>
                        <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ item.name }}</td>
                        <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ item.course_name }}</td>
                        <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ item.roll_no }}</td>
                        <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ item.email }}</td>
                        <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ item.enrollment_year }}</td>
                        <td class="p-0 text-sm text-gray-700 whitespace-nowrap">
                            <i class="fa-regular fa-pen-to-square hover:cursor-pointer text-l hover:text-gray-500"
                                @click="activateEdit(item.student_id, item.reg_no, item.name, item.course_id, item.roll_no, item.email, item.enrollment_year, item.course_id)"></i>
                        </td>
                        <td class="p-0 text-sm text-gray-700 whitespace-nowrap">
                            <i class="fa-solid fa-delete-left hover:cursor-pointer text-lg hover:text-gray-500"
                                @click="activateDel(item.student_id)"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="flex flex-wrap md:hidden ">

            <div class="bg-white p-2 rounded-lg shadow m-1  smartphone:w-[100%] smartphone-lg:w-[48%] smartphone-xl:w-[31.9%] "
                v-for="item in filteredItems" :key="item.student_id" v-motion-fade-visible-once>
                <div class="flex justify-end py-0">
                    <i class="fa-solid fa-x text-xs hover:cursor-pointer" @click="activateDel(item.student_id)"></i>
                </div>
                <div>
                    <div class="flex items-center space-x-2 text-sm">
                        <div>
                            <span class="font-bold hover:underline">#{{ item.student_id }}</span>
                        </div>
                        <div class="text-gray-500 font-bold ">{{ item.name }}</div>
                    </div>
                    <div class="flex">
                        <div class="text-sm text-gray-700 my-2">
                            <span class="bg-gray-100 p-1">Reg No: {{ item.reg_no }} </span>
                        </div>
                        

                    </div>
                    <div class="flex">
                        
                        <div class="text-sm text-gray-700 my-2">
                            <span class="bg-red-100 p-1">Course: {{ item.course_name }} </span>
                        </div>

                    </div>
                    <div class="flex">
                        <div class="text-sm text-gray-700 my-2">
                            <span class="bg-blue-100 p-1">Roll No: {{ item.roll_no }} </span>
                        </div>
                       

                    </div>
                    <div class="flex">
                        
                        <div class="text-sm text-gray-700 my-2">
                            <span class="bg-green-100 p-1">{{ item.email }} </span>
                        </div>

                    </div>
                    <div class="flex">
                        <div class="text-sm text-gray-700 my-2">
                            <span class="bg-gray-100 p-1">Enrolled in {{ item.enrollment_year }} </span>
                        </div>


                    </div>
                </div>
                <div class="flex justify-end py-0">
                    <i class="fa-regular fa-pen-to-square hover:cursor-pointer text-sm"
                        @click="activateEdit(item.student_id, item.reg_no, item.name, item.course_id, item.roll_no, item.email, item.enrollment_year, item.course_id)"></i>
                </div>
            </div>
        </div>
    </div>
</template>