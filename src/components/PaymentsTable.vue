<script setup>
import { usePaymentStore } from "../stores/payment";
import { storeToRefs } from 'pinia';


const paymentStore = usePaymentStore();
const { filteredItems, payment} = storeToRefs(paymentStore);
const { activateEdit, activateDel, delId, editId } = paymentStore;
import moment from 'moment';
const checkData = (data)=>{
    if(data){
        return data
    }else{
        return "N/A"
    }
}
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
                        <th class="w-40 p-2 text-sm font-semibold text-left">Ref ID</th>
                        <th class="w-40 p-2 text-sm font-semibold text-left">Payment Type</th>
                        <th class="w-40 p-2 text-sm font-semibold text-left ">Status</th>
                        <th class="w-40 p-2 text-sm font-semibold text-left ">Reg No</th>
                        <th class="w-40 p-2 text-sm font-semibold text-left">Amount</th>
                        <th class="w-500 p-2 text-sm font-semibold text-left ">Payment Date</th>
                        <th class="w-14 p-2 text-sm font-semibold text-left"></th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">

                    <tr class="bg-white" v-for="item in filteredItems" :key="item.payment_id" v-motion-fade-visible-once>
                        <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ item.payment_id }}</td>
                        <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ checkData(item.ref_no ) }}</td>
                        <td class="p-2 text-sm text-gray-700 whitespace-nowrap capitalize">{{ checkData(item.payment_type)  }}</td>
                        <td class="p-2 text-sm text-gray-700 whitespace-nowrap capitalize" :class="item.status == 'success'? 'text-green-600': 'text-red-500'">{{ item.status }}</td>
                        <td class="p-2 text-sm text-gray-700 whitespace-nowrap capitalize">{{ item.reg_no}}</td>
                        <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ item.payment_amount}}</td>
                        <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ formatDate(item.payment_date)  }}</td>
                        
                        <td class="p-0 text-sm text-gray-700 whitespace-nowrap">
                            <i class="fa-solid fa-delete-left hover:cursor-pointer text-lg hover:text-gray-500"
                                @click="activateDel(item.payment_id)"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="flex flex-wrap md:hidden ">

            <div class="bg-white p-2 rounded-lg shadow m-1  smartphone:w-[100%] smartphone-lg:w-[48%] smartphone-xl:w-[31.9%] "
                v-for="item in filteredItems" :key="item.fee_component_id" v-motion-fade-visible-once>
                <div class="flex justify-end py-0">
                    <i class="fa-solid fa-x text-xs hover:cursor-pointer" @click="activateDel(item.payment_id )"></i>
                </div>
                <div>
                    <div class="flex items-center space-x-2 text-sm">
                        <div>
                            <span class="font-bold hover:underline">#{{ item.payment_id}}</span>
                        </div>
                        <div class="text-gray-500">{{ checkData(item.ref_no ) }} </div>
                    </div>
                    <div class="flex items-center">
                        <div class="text-sm text-gray-700 my-2">
                            <span class="bg-blue-100 p-1 ">₹{{item.payment_amount }} </span>
                        </div>
                        
                        <div class="text-sm text-gray-700 my-2 ml-1">
                            <span class="bg-gray-100 p-1 capitalize"> {{ checkData(item.payment_type)  }} </span>
                        </div>
                        
                        
                    </div>
                    <div class="flex">
                        <div class="text-sm text-gray-700 my-2 ">
                            <span class=" p-1 capitalize" :class="item.status == 'success'? 'bg-green-100': 'bg-red-200'"> {{ item.status }}</span>
                        </div>
                        <div class="text-sm text-gray-700 my-2 ml-1">
                            <span class="bg-gray-100 p-1 capitalize"> {{ formatDate(item.payment_date)  }}</span>
                        </div>
                        
                        
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>