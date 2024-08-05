<script setup>
import { useStudentPanelStore } from "../stores/studentPanel";
import { storeToRefs } from 'pinia';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { onClickOutside } from '@vueuse/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const studentPanel = useStudentPanelStore();
const { isOpenView, isOpenReceipt, feeMapping, modal, feeReceipt, description, lateFee, feeAmount, dueDate, courseName, student, studentName, razorpayRef, payDate } = storeToRefs(studentPanel);
const { closePopup } = studentPanel;

const downloadReceiptAsPDF = () => {
    const element = document.getElementById('receipt-content');
    html2canvas(element, { scale: 2, useCORS: true }).then(canvas => {
        const imgData = canvas.toDataURL('image/png', 1.0);
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('receipt.pdf');
    });
};

</script>

<template>
    <!-- POPUPS -->
    <Teleport to="#modal">
        <!-- View Details -->
        <Transition name="modal">
            <div class="fixed top-0 left-0 z-[9999] w-[100vw] h-[100%] flex justify-center items-center bg-black bg-opacity-50"
                v-if="isOpenView">
                <div class="z-20" ref="modal">
                    <div class="bg-white p-4 rounded-lg min-w-[300px]  min-h-[500px]">
                        <span class="flex justify-end w-full pr-2">
                            <span class="fa-solid fa-xmark hover:cursor-pointer" @click="closePopup"></span>
                        </span>
                        <h1 class="font-bold">Fee Details</h1>
                        <h2> {{ courseName }} {{ description }}</h2>
                        <h2>{{ dueDate }}</h2>
                        <div class="flex justify-between mt-1" v-for="fm in feeMapping" :key="fm.id">
                            <span>{{ fm.fee_component_name }}</span>
                            <span>₹{{ fm.amount }}</span>
                        </div>
                        <div class="flex justify-between"><span>Late Fee:</span><span>₹{{ lateFee }}</span></div>
                        <hr>
                        <div class="flex justify-between"><span>Total:</span><span>₹{{ feeAmount }}</span></div>
                    </div>
                </div>
            </div>
        </Transition>

        <Transition name="modal">
            <div class="fixed top-0 left-0 z-[9999] w-[100vw] h-[100%] flex justify-center items-center bg-black bg-opacity-50"
                v-if="isOpenReceipt">
                <div class="z-20" ref="modal">
                    <div class="bg-white p-4 rounded-lg min-w-[500px]  min-h-[500px] text-sm">
                        <span class="flex justify-end w-full pr-2">
                            <span class="fa-solid fa-xmark hover:cursor-pointer" @click="closePopup"></span>
                        </span>
                        <div id="receipt-content" class="p-5">
                            <h1 class="font-bold text-center">FEE RECEIPT</h1>
                            <h2><span>Payment For: </span>{{ studentName }}</h2>
                            <h2><span>Payment Date: </span>{{ payDate }}</h2>
                            <h2 v-for="s in student" :key="s.id"><span>Registration Number:</span><span>{{ s.reg_no
                            }}</span></h2>
                            <h2><span>Fee Description: </span> <span>{{ description }}</span></h2>
                            <h2><span>Fee Amount: </span> <span>INR {{ feeAmount }}</span></h2>
                            <h2><span>Paid Amount: </span> <span>INR {{ feeAmount }}</span></h2>
                            <h2><span>Transaction ID: </span> <span>{{ razorpayRef }}</span></h2>
                            <div class="border-2 min-h-[300px] p-2 mt-3">
                                <div class="flex justify-between border-b-2 pb-2"><span>Description</span><span>Paid Amount</span></div>
                               
                                <div class="flex justify-between mt-2" v-for="fm in feeMapping" :key="fm.id">
                                    <span>{{ fm.fee_component_name }}</span>
                                    <span>₹{{ fm.amount }}</span>
                                </div>
                                <div class="flex justify-between"><span>Late Fee:</span><span>₹{{ lateFee }}</span></div>
                            </div>
                        </div>
                        <div class="flex justify-center"><button @click="downloadReceiptAsPDF"
                                class=" bg-college-blue hover:bg-hover-blue text-white py-2 px-4 rounded">Download
                                PDF</button></div>

                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>
