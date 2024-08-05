<script setup>
// import {defineProps} from 'vue';

const props = defineProps({
    heading: {
        type: Array,
        required: true
    },
    data:{
        type: Array,
        required: true
    },
    onView:{
        type: Function,
        required: false
    },
    onDelete:{
        type: Function,
        required: false
    },
    onEdit:{
        type: Function,
        required: false
    },

})

</script>
<template>
    <div>
        <div class="overflow-auto rounded-lg shadow hidden md:block max-w-[100vw]">
            <table class="w-full">
                <thead class="bg-gray-50 border-b-2 border-gray-200">

                    <tr>
                        <th class="w-40 p-2 text-sm font-semibold text-left last:w-500" v-for="head in header">head</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">

                    <tr class="bg-white" v-for="course in filteredItems" :key="course.course_id">
                        <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ course.course_id }}</td>
                        <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ course.name }}</td>
                        <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ course.no_of_sem }}</td>
                        <td class="p-0 text-sm text-gray-700 whitespace-nowrap">
                            <i class="fa-regular fa-pen-to-square hover:cursor-pointer text-l"></i>
                        </td>
                        <td class="p-0 text-sm text-gray-700 whitespace-nowrap">
                            <i class="fa-solid fa-delete-left hover:cursor-pointer text-lg"
                                @click="deleteCourse(course.course_id)"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="flex flex-wrap md:hidden ">

            <div class="bg-white p-2 rounded-lg shadow m-1  smartphone:w-[100%] smartphone-lg:w-[48%] smartphone-xl:w-[31.9%] "
                v-for="course in filteredItems" :key="course.course_id">
                <div class="flex justify-end py-0">
                    <i class="fa-solid fa-x text-xs"></i>
                </div>
                <div>
                    <div class="flex items-center space-x-2 text-sm">
                        <div>
                            <span class="font-bold hover:underline">#{{ course.course_id }}</span>
                        </div>
                        <div class="text-gray-500">{{ course.name }}</div>
                    </div>
                    <div class="text-sm text-gray-700 my-2">
                        <span class="bg-orange-100 p-1">{{ course.no_of_sem }} Semesters</span>
                    </div>
                </div>
                <div class="flex justify-end py-0">
                    <i class="fa-regular fa-pen-to-square hover:cursor-pointer text-sm"></i>
                </div>
            </div>
        </div>
    </div>
</template>