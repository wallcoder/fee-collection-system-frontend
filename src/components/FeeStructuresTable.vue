<script setup>
import { useFeeStructureStore } from "../stores/feeStructures";
import { storeToRefs } from 'pinia';


const feeStructureStore = useFeeStructureStore();
const { filteredItems, feeStructure,} = storeToRefs(feeStructureStore);
const { activateEdit, activateDel, delId, editId, viewId, activateView } = feeStructureStore;



</script>

<template>
    <div>
        <div class="overflow-auto rounded-lg shadow hidden md:block max-w-[100vw]">
            <table class="w-full">
                <thead class="bg-gray-50 border-b-2 border-gray-200">

                    <tr>
                        <th class="w-40 p-2 text-sm font-semibold text-left">ID</th>
                        <th class="w-40 p-2 text-sm font-semibold text-left">Course </th>
                        <th class="w-40 p-2 text-sm font-semibold text-left">Description</th>
                        <th class="w-40 p-2 text-sm font-semibold text-left">Due Day/Month</th>
                        
                        <th class="w-500 p-2 text-sm font-semibold text-left ">Amount</th>
                        <th class="w-14 p-2 text-sm font-semibold text-left"></th>
                        <th class="w-14 p-2 text-sm font-semibold text-left"></th>
                        <th class="w-14 p-2 text-sm font-semibold text-left"></th>

                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">

                    <tr class="bg-white" v-for="item in filteredItems" :key="item.fee_structure_id" v-motion-fade-visible-once>
                        <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ item.fee_structure_id }}</td>
                        <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ item.course_name }}</td>
                        <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ item.description }}</td>
                        <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ item.due_day }}/{{ item.due_month }}</td>
                        
                        <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ item.amount }}</td>
                        
                        <td class="p-0 text-sm text-gray-700 whitespace-nowrap">
                            <i class="fa-solid fa-circle-info hover:cursor-pointer text-lg hover:text-gray-500"
                                @click="activateView(item.fee_structure_id, item.course_name, item.amount, item.description)"></i>
                        </td>
                        <!-- <i class="fa-solid fa-circle-info"></i> -->
                        <td class="p-0 text-sm text-gray-700 whitespace-nowrap">
                            <i class="fa-regular fa-pen-to-square hover:cursor-pointer  hover:text-gray-500"
                                @click="activateEdit(item.fee_structure_id, item.course_id, item.description, item.due_day, item.due_month)"></i>
                        </td>
                        <td class="p-0 text-sm text-gray-700 whitespace-nowrap">
                            <i class="fa-solid fa-delete-left hover:cursor-pointer text-lg hover:text-gray-500"
                                @click="activateDel(item.fee_structure_id)"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="flex flex-wrap  md:hidden">

            <div class="bg-white p-2 rounded-lg shadow m-1  smartphone:w-[100%] smartphone-lg:w-[48%] smartphone-xl:w-[31.9%] "
                v-for="item in filteredItems" :key="item.fee_structure_id" v-motion-fade-visible-once>
                <div class="flex justify-end py-0">
                    <i class="fa-solid fa-x text-xs hover:cursor-pointer" @click="activateDel(item.fee_structure_id)"></i>
                </div>
                <div>
                    <div class="flex items-center space-x-2 text-sm">
                        <div>
                            <span class="font-bold hover:underline">#{{ item.fee_structure_id }}</span>
                        </div>
                        <div class="text-gray-500 font-bold ">{{ item.course_name}}</div>
                    </div>
                    <div class="flex">
                        <div class="text-sm text-gray-700 my-2">
                            <span class="bg-red-100 p-1">{{ item.description}} </span>
                        </div>
                        
                    </div>
                    <div class="flex">
                        <div class="text-sm text-gray-700 my-2">
                            <span class="bg-green-100 p-1">&#8377; {{ item.amount}} </span>
                        </div>
                        
                    </div>
                </div>
                <div class="flex justify-end py-0 items-center">
                    
                    <i class="fa-solid fa-circle-info hover:cursor-pointer text-md hover:text-gray-500 mr-2"
                                @click="activateView(item.fee_structure_id, item.course_name, item.amount, item.description)"></i>
                                <i class="fa-regular fa-pen-to-square hover:cursor-pointer  hover:text-gray-500"
                                @click="activateEdit(item.fee_structure_id, item.course_id, item.description, item.due_day, item.due_month)"></i>
                    <!-- <i class="fa-regular fa-pen-to-square hover:cursor-pointer text-sm "
                        @click="activateEdit(item.fee_structure_id, item.question,item.answer)"></i> -->
                </div>
            </div>
        </div>
    </div>
</template>