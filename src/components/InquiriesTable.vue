<script setup>
import { useInquiriesStore } from "../stores/inquiries";
import { storeToRefs } from 'pinia';
import moment from 'moment';

const inquiriesStore = useInquiriesStore();
const { filteredItems, inquiries} = storeToRefs(inquiriesStore);
const { activateEdit, activateDel, delId, editId, activateView } = inquiriesStore;
const formatDate = (date) =>{
    return moment(date).format('DD/MM/YYYY')
}



</script>

<template>
    <div>
        <div class="overflow-auto rounded-lg shadow hidden md:block max-w-[100vw]">
            <table class="w-full">
                <thead class="bg-gray-50 border-b-2 border-gray-200">

                    <tr>
                        
                        <th class="w-40 p-2 text-sm font-semibold text-left">ID</th>
                        <th class="w-40 p-2 text-sm font-semibold text-left">Name</th>
                        <th class="w-[210px] p-2 text-sm font-semibold text-left ">Phone</th>
                        <th class="w-40 p-2 text-sm font-semibold text-left">Email</th>
                        <!-- <th class="w-40 p-2 text-sm font-semibold text-left">Inquiry</th> -->
                        <th class="w-500 p-2 text-sm font-semibold text-left ">Sent at</th>
                        <th class="w-14 p-2 text-sm font-semibold text-left"></th>
                        <th class="w-14 p-2 text-sm font-semibold text-left"></th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">

                    <tr class="bg-white" v-for="item in filteredItems" :key="item.inquiry_id" v-motion-fade-visible-once>
                        <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ item.inquiry_id }}</td>
                        <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ item.name }}</td>
                        <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ item.phone }}</td>
                        <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ item.email }}</td>
                        <!-- <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ item.inquiry }}</td> -->

                        <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ formatDate(item.created_at)}}</td>
                        
                        <td class="p-0 text-sm text-gray-700 whitespace-nowrap">
                            <i class="fa-solid fa-circle-info hover:cursor-pointer text-lg hover:text-gray-500"
                                @click="activateView(item.inquiry)"></i>
                        </td>
                        
                        <td class="p-0 text-sm text-gray-700 whitespace-nowrap">
                            <i class="fa-solid fa-delete-left hover:cursor-pointer text-lg hover:text-gray-500"
                                @click="activateDel(item.inquiry_id)"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="flex flex-wrap md:hidden ">

            <div class="bg-white p-2 rounded-lg shadow m-1  smartphone:w-[100%] smartphone-lg:w-[48%] smartphone-xl:w-[31.9%] "
                v-for="item in filteredItems" :key="item.inquiry_id" v-motion-fade-visible-once>
                <div class="flex justify-end py-0">
                    <i class="fa-solid fa-x text-xs hover:cursor-pointer" @click="activateDel(item.inquiry_id )"></i>
                </div>
                <div>
                    <div class="flex items-center space-x-2 text-sm">
                        <div>
                            <span class="font-bold hover:underline">#{{ item.inquiry_id}}</span>
                        </div>
                        <div class="text-gray-500">{{ item.name }} </div>
                    </div>
                    <div class="flex items-center space-x-2 text-sm">
                        
                        <div class="bg-blue-100"> Ph: {{ item.phone }}</div>
                    </div>
                    <div class="flex">
                        <div class="text-sm text-gray-700 my-2">
                            <span class="bg-gray-100 p-1">{{ item.email }} </span>
                        </div>
                        
                        
                    </div>
                    <div class="flex">
                        
                        <div class="text-sm text-gray-700 my-2">
                            <span class="bg-gray-100 p-1">Sent {{ formatDate(item.created_at)}} </span>
                        </div>
                        
                    </div>
                    <!-- <div class="flex">
                        <div class="text-sm text-gray-700 my-2">
                            <span class="bg-gray-100 p-1">{{ item.inquiry }} </span>
                        </div>
                        
                        
                    </div> -->
                    <td class="flex justify-end py-0">
                            <i class="fa-solid fa-circle-info hover:cursor-pointer text-lg hover:text-gray-500"
                                @click="activateView(item.inquiry)"></i>
                        </td>
                </div>
                
                
            </div>
        </div>
    </div>
</template>