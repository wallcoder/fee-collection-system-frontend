<script setup>
import { useFeeStatusStore } from "../stores/feeStatus";
import { storeToRefs } from 'pinia';


const feeStatus = useFeeStatusStore();
const { filteredItems} = storeToRefs(feeStatus);
const { } = feeStatus;



</script>

<template>
    <div>
        <div class="overflow-auto rounded-lg shadow hidden md:block max-w-[100vw]">
            <table class="w-full">
                <thead class="bg-gray-50 border-b-2 border-gray-200">

                    <tr>
                        <th class="w-40 p-2 text-sm font-semibold text-left">ID</th>
                        <th class="w-40 p-2 text-sm font-semibold text-left">Student ID</th>
                        <th class="w-40 p-2 text-sm font-semibold text-left">Fee Structure ID</th>
                        <th class="w-40 p-2 text-sm font-semibold text-left ">Status</th>
                        <th class="w-40 p-2 text-sm font-semibold text-left">Due Date</th>
                        
                        
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">

                    <tr class="bg-white" v-for="item in filteredItems" :key="item.student_fee_id">
                        <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ item.student_fee_id}}</td>
                        <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ item.student_id }}</td>
                        <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ item.fee_structure_id }}</td>
                        <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ item.status }}</td>
                        <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ item.due_date }}</td>
                        
                       
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="flex flex-wrap md:hidden ">

            <div class="bg-white p-2 rounded-lg shadow m-1  smartphone:w-[100%] smartphone-lg:w-[48%] smartphone-xl:w-[31.9%] "
                v-for="item in filteredItems" :key="item.student_fee_id">
                
                <div>
                    <div class="flex items-center space-x-2 text-sm">
                        <div>
                            <span class="font-bold hover:underline">#{{ item.student_fee_id}}</span>
                        </div>
                        <div class="text-gray-500">{{ item.student_id }} {{ item.fee_structure_id }}</div>
                    </div>
                    <div class="flex">
                        <div class="text-sm text-gray-700 my-2">
                            <span class=" p-1" >{{ item.status }} </span>
                        </div>
                        <div class="text-sm text-gray-700 my-2">
                            <span class="bg-blue-100 p-1">Due {{ item.due_date }} </span>
                        </div>
                        
                    </div>
                    <div class="flex">
                        <div class="text-sm text-gray-700 my-2">
                            <span class="bg-blue-100 p-1">Due {{ item.due_date }} </span>
                        </div>
                        
                        
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>