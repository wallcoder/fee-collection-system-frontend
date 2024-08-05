<script setup>

import { ref } from 'vue';
let isOpen = ref(false);
const toggleDetails = () => {
    isOpen.value = !isOpen.value;
}

</script>

<template>
    <section class="w-[100%] h-[100vh] absolute bg-[rgba(0,0,0,0.5)] flex justify-center items-center top-0 left-0" v-motion-fade 
        v-if="isOpen">
        <div class="w-[60%] min-w-[470px] max-w-[700px] min-h-[550px] bg-college-white p-2" v-motion-pop-visible-once >
            <h1 class="font-bold text-center py-4">FEE DETAILS</h1>
            <div class="border min-h-[430px] p-2">sdgsdgsdgsdgsdg
            </div>
            <div class="flex justify-center p-2">
                <button
                    class="hover:cursor-pointer bg-college-blue text-college-white py-1 px-3 hover:bg-hover-blue transition-all duration-200 linear text-sm" @click="toggleDetails">Close</button>
            </div>



        </div>

    </section>
    <div class="overflow-x-auto">
        <table class="table-auto w-full text-left border-collapse mt-3">

            <thead>
                <tr class="bg-gray-100">
                    <th class="py-1 px-4 text-left text-sm  tracking-wider">Fee Description</th>
                    <th class="py-1 px-4 text-left text-sm  tracking-wider">Due Date</th>
                    <th class="py-1 px-4 text-left text-sm  tracking-wider">Amount(₹)</th>
                    <th class="py-1 px-4 text-left text-sm  tracking-wider"></th>
                    <th class="py-1 px-4 text-left text-sm  tracking-wider"></th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-college-grey border-b border-college-white border-b-[3px]">
                    <td class="py-2 px-4" data-label="Fee Description">Semester-1</td>
                    <td class="py-2 px-4" data-label="Due Date">10/10/2024</td>
                    <td class="py-1 px-4" data-label="Amount(₹)">22000</td>
                    <td class="py-1 px-2" data-label="">
                        <button  @click="toggleDetails"
                            class="hover:cursor-pointer bg-college-blue text-college-white py-1 px-3 hover:bg-hoverblue transition-all duration-200 linear text-sm">
                            View
                        </button>
                    </td>
                    <td class="py-1 px-2" data-label="">
                        <button
                            class="hover:cursor-pointer bg-college-blue text-college-white py-1 px-3 hover:bg-hover-blue transition-all duration-200 linear text-sm">
                            Pay
                        </button>
                    </td>
                </tr>
                

            </tbody>
        </table>
        <div class="flex justify-center p-2">
                
            </div>
    </div>
    
</template>
