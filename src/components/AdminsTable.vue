<script setup>
import { useAdminStore } from "../stores/admins";
import { storeToRefs } from 'pinia';
import {useAuthStore} from "../stores/auth";


const adminStore = useAdminStore();
const { filteredItems, admin} = storeToRefs(adminStore);
const { activateEdit, activateDel, delId, editId } = adminStore;
const authStore = useAuthStore();
const { fetchProfile} = authStore;
const {profile} = storeToRefs(authStore)
fetchProfile();


</script>

<template>
    <div>
        <div class="overflow-auto rounded-lg shadow hidden md:block max-w-[100vw]">
            <table class="w-full">
                <thead class="bg-gray-50 border-b-2 border-gray-200">

                    <tr>
                        <th class="w-40 p-2 text-sm font-semibold text-left">Course ID</th>
                        <th class="w-40 p-2 text-sm font-semibold text-left">FIrst Name</th>
                        <th class="w-40 p-2 text-sm font-semibold text-left">Last Name</th>
                        <th class="w-[210px] p-2 text-sm font-semibold text-left ">Email</th>
                        <th class="w-40 p-2 text-sm font-semibold text-left">Phone</th>
                        <th class="w-500 p-2 text-sm font-semibold text-left ">Type</th>
                        <th class="w-14 p-2 text-sm font-semibold text-left"></th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">

                    <tr class="bg-white" v-for="item in filteredItems" :key="item.admin_id" v-motion-fade-visible-once>
                        <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ item.admin_id }}</td>
                        <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ item.fname }}</td>
                        <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ item.lname }}</td>
                        <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ item.email }}</td>
                        <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ item.phone}}</td>
                        <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ item.type }}</td>
                        
                        <td class="p-0 text-sm text-gray-700 whitespace-nowrap" >
                            <i class="fa-solid fa-delete-left hover:cursor-pointer text-lg hover:text-gray-500" v-if="profile.type == 'Head Admin' && profile.adminId != item.admin_id"
                                @click="activateDel(item.admin_id)"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="flex flex-wrap md:hidden ">

            <div class="bg-white p-2 rounded-lg shadow m-1  smartphone:w-[100%] smartphone-lg:w-[48%] smartphone-xl:w-[31.9%] "
                v-for="item in filteredItems" :key="item.fee_component_id" v-motion-fade-visible-once>
                <div class="flex justify-end py-0">
                    <i class="fa-solid fa-x text-xs hover:cursor-pointer" @click="activateDel(item.admin_id )"></i>
                </div>
                <div>
                    <div class="flex items-center space-x-2 text-sm">
                        <div>
                            <span class="font-bold hover:underline">#{{ item.admin_id}}</span>
                        </div>
                        <div class="text-gray-500">{{ item.fname }} {{ item.lname }}</div>
                    </div>
                    <div class="flex ">
                        <div class="text-sm text-gray-700 my-2">
                            <span class="bg-blue-100 p-1">{{ item.email }} </span>
                        </div>
                        
                    </div>
                    <div class="flex flex-wrap">
                        <div class="text-sm text-gray-700 my-2">
                            <span class="bg-red-100 p-1">Ph:{{ item.phone }} </span>
                        </div>
                        
                        
                    </div>
                    <div class="flex flex-wrap">
                        
                        <div class="text-sm text-gray-700 my-2">
                            <span class="bg-green-100 p-1 ">{{ item.type }} </span>
                        </div>
                        
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>