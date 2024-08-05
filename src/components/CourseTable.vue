<script setup>
import { useCourseStore } from "../stores/courses";
import { storeToRefs } from 'pinia';


const courseStore = useCourseStore();
const { modal, loading, filteredItems, isOpenPopupFormRegister, items,
    currentPage, totalPages, error, isEditPopup } = storeToRefs(courseStore);
const { getCoursesPaginated, deleteCourse, activatePopup, activateEditPopup } = courseStore;



</script>

<template>
    <div>
        <div class="overflow-auto rounded-lg shadow hidden md:block max-w-[100vw]">
            <table class="w-full">
                <thead class="bg-gray-50 border-b-2 border-gray-200">

                    <tr>
                        <th class="w-40 p-2 text-sm font-semibold text-left">Course ID</th>
                        <th class="w-40 p-2 text-sm font-semibold text-left">Course Name</th>
                        <th class="w-500 p-2 text-sm font-semibold text-left ">No. of Sem</th>
                        <th class="w-14 p-2 text-sm font-semibold text-left"></th>
                        <th class="w-14 p-2 text-sm font-semibold text-left"></th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">

                    <tr class="bg-white" v-for="course in filteredItems" :key="course.course_id" v-motion-fade-visible-once>
                        <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ course.course_id }}</td>
                        <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ course.course_name }}</td>
                        <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ course.no_of_sem }}</td>
                        <td class="p-0 text-sm text-gray-700 whitespace-nowrap">
                            <i class="fa-regular fa-pen-to-square hover:cursor-pointer text-l hover:text-gray-500" @click="activateEditPopup(course.course_id, course.course_name, course.no_of_sem)"></i>
                        </td>
                        <td class="p-0 text-sm text-gray-700 whitespace-nowrap">
                            <i class="fa-solid fa-delete-left hover:cursor-pointer text-lg hover:text-gray-500"
                                @click="activatePopup(course.course_id)"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="flex flex-wrap md:hidden ">

            <div class="bg-white p-2 rounded-lg shadow m-1  smartphone:w-[100%] smartphone-lg:w-[48%] smartphone-xl:w-[31.9%] "
                v-for="course in filteredItems" :key="course.course_id" v-motion-fade-visible-once>
                <div class="flex justify-end py-0">
                    <i class="fa-solid fa-x text-xs hover:cursor-pointer"  @click="activatePopup(course.course_id)"></i>
                </div>
                <div>
                    <div class="flex items-center space-x-2 text-sm">
                        <div>
                            <span class="font-bold hover:underline">#{{ course.course_id }}</span>
                        </div>
                        <div class="text-gray-500">{{ course.course_name }}</div>
                    </div>
                    <div class="text-sm text-gray-700 my-2">
                        <span class="bg-orange-100 p-1">{{ course.no_of_sem }} Semesters</span>
                    </div>
                </div>
                <div class="flex justify-end py-0">
                    <i class="fa-regular fa-pen-to-square hover:cursor-pointer text-sm" @click="activateEditPopup(course.course_id, course.course_name, course.no_of_sem)"></i>
                </div>
            </div>
        </div>
    </div>
</template>