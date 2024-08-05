<script setup>
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import { defineStore, storeToRefs } from "pinia";
import LoaderSpinner from '../components/LoaderSpinner.vue';
import { useStudentPanelStore } from '../stores/studentPanel';
import ErrorPage from '../components/ErrorPage.vue'
import moment from 'moment';
import StudentPanelPopups from '../components/StudentPanelPopups.vue';

    import {useErrorPage} from '../stores/errorPage'
    
    const errorPage = useErrorPage();
    const {isError} = storeToRefs(errorPage);
const studentPanel = useStudentPanelStore();
const { student, studentFee, isOpenDue, isOpenPaid, amount, selectedFees, totalAmount, studentFeePaid, regNo } = storeToRefs(studentPanel);
const { getStudent, getStudentFee, activateDue, activatePaid, payNow, updateSelectedFees, activateView, handlePayNow, getStudentFeePaid, getFeeMapping, activateReceipt } = studentPanel;

const props = defineProps({
    id: {
        type: String,
        required: true
    }
});

const formatDate = (date) =>{
    return moment(date).format('DD/MM/YYYY')
}

regNo.value = props.id;
getStudent(props.id);
getStudentFee(props.id);
getStudentFeePaid(props.id);



</script>

<template>
    <section class="main-container w-[100%] min-h-[100vh] h-[100%] flex flex-col tablet:justify-center items-center bg-none">
        <ErrorPage/>
        <div class="smartphone:w-[100%] tablet:w-[90%] bg-college-white smartphone:border-2 tablet:border-none" v-if="!isError">
            <div class="">
                <div class="logo flex sfs-center px-3 py-1 border-b items-center">
                    <img src="../images/logo.png" alt="college-logo" class="w-14 h-14">
                    <span class="pl-1">FEE PORTAL</span>
                </div>
                <div class="p-4 flex flex-col">
                    <h1 class="font-bold">Student Details</h1>
                    <div class="flex" v-for="s in student" :key="s.id">
                        <div class="flex flex-col">
                            <span class="font-bold">Name:</span>
                            <span class="font-bold">Registration Number:</span>
                            <span class="font-bold">Enrollment Year:</span>
                            <span class="font-bold">Roll No:</span>
                        </div>
                        <div class="flex flex-col ml-10">
                            <span>{{ s.name }}</span>
                            <span>{{ s.reg_no }}</span>
                            <span>{{ s.enrollment_year }}</span>
                            <span>{{ s.roll_no }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="smartphone:w-[100%] tablet:w-[90%]  smartphone:min-h-[65vh] bg-college-white mt-1 p-4">
            <div class="flex mb-2">
                <button class="px-2 py-[4px] transition duration-150 ease-out"
                    :class="isOpenDue ? 'bg-college-blue text-college-white' : 'bg-gray-200 text-black hover:bg-gray-300 hover:text-college-black'"
                    @click="activateDue">Due</button>
                <button class="px-2 py-[4px] transition duration-150 ease-out"
                    :class="isOpenPaid ? 'bg-college-blue text-college-white' : 'bg-gray-200 text-black hover:bg-gray-300 hover:text-college-black'"
                    @click="activatePaid">Paid</button>
            </div>
            <div v-show="isOpenDue" v-if="studentFee.length > 0">
                <div class="overflow-auto rounded-lg shadow hidden md:block max-w-[100vw]">
                    <table class="w-full">
                        <thead class="bg-gray-50 border-b-2 border-gray-200">
                            <tr>
                                <th class="w-40 p-2 text-sm font-semibold text-left">Course</th>
                                <th class="w-40 p-2 text-sm font-semibold text-left">Description</th>
                                <th class="w-40 p-2 text-sm font-semibold text-left">Amount</th>
                                <th class="w-500 p-2 text-sm font-semibold text-left">Due Date</th>
                                <th class="w-14 p-2 text-sm font-semibold text-left"></th>
                                <th class="w-14 p-2 text-sm font-semibold text-left"></th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100">
                            <tr class="bg-white" v-for="sf in studentFee" :key="sf.student_fee_id">
                                <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ sf.course_name }}</td>
                                <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ sf.description }}</td>
                                <td class="p-2 text-sm text-gray-700 whitespace-nowrap">₹{{ sf.amount+sf.late_fee }}</td>
                                <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ formatDate(sf.due_date)}}</td>
                                <td class="p-0 text-sm text-gray-700 whitespace-nowrap">
                                    <button
                                        class="bg-college-blue px-2 py-[4px] hover:bg-hover-blue transition duration-150 ease-out text-white rounded" @click="activateView(sf.fee_structure_id, sf.description, sf.amount+sf.late_fee, formatDate(sf.due_date), sf.course_name, sf.late_fee)">View</button>
                                </td>
                                <td class="p-2 text-sm text-gray-700 whitespace-nowrap">
                                    <input type="checkbox" @change="updateSelectedFees(sf.student_fee_id, sf.amount+sf.late_fee)" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="flex flex-wrap md:hidden smartphone:w-[100%]">
                    <div class="bg-white p-2 rounded-lg card m-1 smartphone:w-[100%]" v-for="sf in studentFee"
                        :key="sf.student_fee_id">
                        <div>
                            <div class="flex sfs-center space-x-2 text-sm">
                                <div>
                                    <span class="font-bold hover:underline"><input type="checkbox" @change="updateSelectedFees(sf.student_fee_id, sf.amount+sf.late_fee)"  /></span>
                                </div>
                                <div class="text-gray-500 font-bold">{{ sf.description }}</div>
                            </div>
                            <div class="flex">
                                <div class="text-sm text-gray-700 my-1">
                                    <span class="p-1">Course: {{ sf.course_name }}</span>
                                    <span class="p-1 bg-green-200">Amount: ₹{{ sf.amount+sf.late_fee }}</span>
                                </div>
                            </div>
                            <div class="flex">
                                <div class="text-sm text-gray-700 my-1">
                                    <span class="p-1">Due Date: {{ formatDate(sf.due_date)}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="flex justify-end">
                            <span class="p-0 text-sm text-gray-700 whitespace-nowrap mr-2 round">
                                <button
                                    class="bg-college-blue px-2 py-[4px] rounded hover:bg-hover-blue transition duration-150 ease-out text-white" @click="activateView(sf.fee_structure_id, sf.description, sf.amount+sf.late_fee, formatDate(sf.due_date), sf.course_name, sf.late_fee)">View</button>
                            </span>
                            
                        </div>
                    </div>
                </div>
                <div class="mt-4   justify-center smartphone:fixed  smartphone:right-4 smartphone:justify-center smartphone:bottom-6 smartphone:flex tablet:static ">
                    <button @click="handlePayNow" class=" px-2 py-[4px] rounded   transition duration-300 ease-out"  :disabled="totalAmount === 0" :class="totalAmount ? 'bg-college-blue text-college-white hover:bg-hover-blue': 'bg-gray-200 text-gray-400 '">Pay
                        Now ( ₹{{ totalAmount }})</button>
                </div>
            </div>
            <div v-else class="text-gray-500 flex justify-center items-center h-[200px]" v-show="isOpenDue">
                No Fees Due
            </div>
            <div v-if="isOpenPaid && studentFeePaid.length > 0">
                <div class="overflow-auto rounded-lg shadow hidden md:block max-w-[100vw]">
                    <table class="w-full">
                        <thead class="bg-gray-50 border-b-2 border-gray-200">
                            <tr>
                                <th class="w-40 p-2 text-sm font-semibold text-left">Course</th>
                                <th class="w-40 p-2 text-sm font-semibold text-left">Description</th>
                                <th class="w-40 p-2 text-sm font-semibold text-left">Amount</th>
                                <th class="w-500 p-2 text-sm font-semibold text-left">Payment Date</th>
                                <th class="w-20 p-2 text-sm font-semibold text-left"></th>
                                <!-- <th class="w-14 p-2 text-sm font-semibold text-left"></th> -->
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100">
                            <tr class="bg-white" v-for="sf in studentFeePaid" :key="sf.student_fee_id">
                                <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ sf.course_name }}</td>
                                <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ sf.description }}</td>
                                <td class="p-2 text-sm text-gray-700 whitespace-nowrap">₹{{ sf.amount+sf.late_fee }}</td>
                                <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ formatDate(sf.payment_date)}}</td>
                                <td class="p-0 text-sm text-gray-700 whitespace-nowrap">
                                    <button
                                        class="bg-college-blue px-2 py-[4px] hover:bg-hover-blue transition duration-150 ease-out text-white rounded" @click="activateReceipt(sf.fee_structure_id, sf.description, sf.amount+sf.late_fee, formatDate(sf.payment_date), sf.course_name, sf.name, sf.ref_no, sf.late_fee)">Receipt</button>
                                </td>
                                
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="flex flex-wrap md:hidden smartphone:w-[100%]">
                    <div class="bg-white p-2 rounded-lg card m-1 smartphone:w-[100%]" v-for="sf in studentFeePaid"
                        :key="sf.student_fee_id">
                        <div>
                            <div class="flex sfs-center space-x-2 text-sm">
                                
                                <div class="text-gray-500 font-bold"><label >{{ sf.description }}</label> </div>
                            </div>
                            <div class="flex">
                                <div class="text-sm text-gray-700 my-1">
                                    <span class="p-1">Course: {{ sf.course_name }}</span>
                                    <span class="p-1 bg-green-200">Amount: ₹{{ sf.amount+sf.late_fee }}</span>
                                </div>
                            </div>
                            <div class="flex">
                                <div class="text-sm text-gray-700 my-1">
                                    <span class="p-1">Payment Date: {{ formatDate(sf.payment_date)}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="flex justify-end">
                            <span class="p-0 text-sm text-gray-700 whitespace-nowrap mr-2 round">
                                <button
                                    class="bg-college-blue px-2 py-[4px] rounded hover:bg-hover-blue transition duration-150 ease-out text-white" @click="activateReceipt(sf.fee_structure_id, sf.description, sf.amount+sf.late_fee, formatDate(sf.payment_date), sf.course_name, sf.name, sf.ref_no, sf.late_fee)">Receipt</button>
                            </span>
                            
                        </div>
                    </div>
                </div>
                
            </div>
            <div v-else class="text-gray-500 flex justify-center items-center h-[200px]" v-show="isOpenPaid">
                No Fees Paid Yet
            </div>
            
        </div>
        <StudentPanelPopups/>
        <LoaderSpinner />

    </section>
</template>

<style scoped>
@media screen and (min-width: 320px ) {
    .main-container{
        background: white;
    }
}

@media screen and (min-width: 762px ) {
    .main-container {
    background: linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), url(../images/background-5.png);
    background-size: cover;
}
}



.card{
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
}

</style>
