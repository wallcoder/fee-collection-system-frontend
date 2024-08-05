<script setup>
import { useFeeComponentStore } from "../stores/feeComponents";
import { storeToRefs } from 'pinia';


const feeComponentStore = useFeeComponentStore();
const { filteredItems, feeComponent} = storeToRefs(feeComponentStore);
const { activateEdit, activateDel, delId, editId } = feeComponentStore;



</script>

<template>
    <div>
        <div class="overflow-auto rounded-lg shadow hidden md:block max-w-[100vw]">
            <table class="w-full">
                <thead class="bg-gray-50 border-b-2 border-gray-200">

                    <tr>
                        <th class="w-40 p-2 text-sm font-semibold text-left">Course ID</th>
                        <th class="w-40 p-2 text-sm font-semibold text-left">Name</th>
                        <th class="w-40 p-2 text-sm font-semibold text-left">Amount</th>
                        <th class="w-500 p-2 text-sm font-semibold text-left ">Course</th>
                        <th class="w-14 p-2 text-sm font-semibold text-left"></th>
                        <th class="w-14 p-2 text-sm font-semibold text-left"></th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">

                    <tr class="bg-white" v-for="item in filteredItems" :key="item.fee_component_id" v-motion-fade-visible-once>
                        <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ item.fee_component_id }}</td>
                        <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ item.fee_component_name }}</td>
                        <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ item.amount }}</td>
                        <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ item.course }}</td>
                        <td class="p-0 text-sm text-gray-700 whitespace-nowrap">
                            <i class="fa-regular fa-pen-to-square hover:cursor-pointer text-l hover:text-gray-500"
                                @click="activateEdit(item.fee_component_id, item.fee_component_name,item.amount,item.course)"></i>
                        </td>
                        <td class="p-0 text-sm text-gray-700 whitespace-nowrap">
                            <i class="fa-solid fa-delete-left hover:cursor-pointer text-lg hover:text-gray-500"
                                @click="activateDel(item.fee_component_id)"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="flex flex-wrap md:hidden ">

            <div class="bg-white p-2 rounded-lg shadow m-1  smartphone:w-[100%] smartphone-lg:w-[48%] smartphone-xl:w-[31.9%] "
                v-for="item in filteredItems" :key="item.fee_component_id" v-motion-fade-visible-once>
                <div class="flex justify-end py-0">
                    <i class="fa-solid fa-x text-xs hover:cursor-pointer" @click="activateDel(item.fee_component_id )"></i>
                </div>
                <div>
                    <div class="flex items-center space-x-2 text-sm">
                        <div>
                            <span class="font-bold hover:underline">#{{ item.fee_component_id }}</span>
                        </div>
                        <div class="text-gray-500">{{ item.fee_component_name }}</div>
                    </div>
                    <div class="flex">
                        <div class="text-sm text-gray-700 my-2">
                            <span class="bg-orange-100 p-1">{{ item.course }} Course(s)</span>
                        </div>
                        <div class="text-sm text-gray-700 my-2 ml-2">
                            <span class="bg-green-100 p-1">₹{{ item.amount }}</span>
                        </div>
                    </div>
                </div>
                <div class="flex justify-end py-0">
                    <i class="fa-regular fa-pen-to-square hover:cursor-pointer text-sm"
                        @click="activateEdit(item.fee_component_id, item.fee_component_name,item.amount,item.course)"></i>
                </div>
            </div>
        </div>
    </div>
</template>