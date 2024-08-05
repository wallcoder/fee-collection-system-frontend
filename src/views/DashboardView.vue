<template>
    <div class="w-full h-full z-1">
        <section class="flex flex-col  bg-admin-light-pink " v-if="isLoading" v-motion-fade-visible-once>
            <h1 class="text-lg text-gray-900 mb-2 bg-gray-200 custom-pulse  w-[120px] h-[30px] rounded-md"></h1>
            <h2 class="text-2xl text-gray-800 mb-6 bg-gray-200 custom-pulse  w-[100px] w-[180px] h-[35px] rounded-md"></h2>


            <section class="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6 ">
                <div
                    class="bg-gray-200 custom-pulse shadow-lg hover:shadow-xl transition-shadow duration-300 w-full h-[150px] flex flex-col p-4 rounded-lg border border-gray-200 ">
                    <div class="flex-1 flex flex-col justify-between">
                        <span class="text-md font-medium text-gray-600"></span>
                        <span class="text-5xl text-gray-800  mb-5"></span>
                    </div>
                </div>

                <div
                    class="bg-gray-200 custom-pulse shadow-lg hover:shadow-xl transition-shadow duration-300 w-full h-[150px] flex flex-col p-4 rounded-lg border border-gray-200">
                    <div class="flex-1 flex flex-col justify-between">
                        <span class="text-md font-medium text-gray-600"></span>
                        <span class="text-5xl  mb-5 text-gray-600"></span>
                    </div>
                </div>

                <div
                    class="bg-gray-200 custom-pulse shadow-lg hover:shadow-xl transition-shadow duration-300 w-full h-[150px] flex flex-col p-4 rounded-lg border border-gray-200">
                    <div class="flex-1 flex flex-col justify-between">
                        <span class="text-md font-medium text-gray-600"></span>
                        <span class="text-5xl  mb-5 text-gray-600"></span>
                        <!-- <span class="text-5xl  mb-5 text-gray-600" >₹0</span> -->
                    </div>
                </div>

                <div
                    class="bg-gray-200 custom-pulse shadow-lg hover:shadow-xl transition-shadow duration-300 w-full h-[150px] flex  p-4 rounded-lg border border-gray-200">
                    <div class="flex- flex flex-col justify-between pr-[20px] ">
                        <span class="text-md font-medium text-gray-600"></span>
                        <span class="text-5xl  mb-5 text-gray-600"></span>
                    </div>
                    <!-- <div class="flex flex-col">
                        <div class="flex flex-col  ">
                            <span class="text-sm font-medium text-gray-600 ">Head Admins</span>
                            <span class="text-2xl  text-gray-600">{{ totalHeadAdmins.count }}</span>
                        </div>
                        <div class="flex flex-col  ">
                            <span class="text-md font-medium text-gray-600">Asst. Admins</span>
                            <span class="text-2xl  text-gray-600">{{ totalAssAdmins.count }}</span>
                        </div>
                    </div> -->
                </div>
            </section>


            <section class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 ">
                <div
                    class="bg-gray-200 custom-pulse shadow-lg hover:shadow-xl transition-shadow duration-300 w-full h-[250px] flex flex-col p-4 rounded-lg border border-gray-200">
                    <div class="flex items-center justify-center h-full">

                    </div>
                    <canvas></canvas>
                </div>

                <div
                    class="bg-gray-200 custom-pulse shadow-lg hover:shadow-xl transition-shadow duration-300 w-full h-[250px] flex flex-col p-4 rounded-lg border border-gray-200">
                    <canvas></canvas>
                </div>
            </section>

            <!-- Floating Button -->

        </section>
        <section class="flex flex-col  bg-admin-light-pink " v-else>
            <h1 class="text-lg text-gray-900 mb-2" v-motion-fade-visible-once>Dashboard</h1>
            <h2 class="text-2xl text-gray-800 mb-6" v-motion-fade-visible-once>Welcome, {{ profile.firstName }}</h2>


            <section class="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
                <div class="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 w-full h-[150px] flex flex-col p-4 rounded-lg border border-gray-200 "
                    v-motion-slide-visible-once-bottom>
                    <div class="flex-1 flex flex-col justify-between">
                        <span class="text-md font-medium text-gray-600">Courses</span>
                        <span class="text-5xl text-gray-800  mb-5">{{ formatCount(totalCourses.count) }}</span>
                    </div>
                </div>

                <div class="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 w-full h-[150px] flex flex-col p-4 rounded-lg border border-gray-200"
                    v-motion-slide-visible-once-bottom>
                    <div class="flex-1 flex flex-col justify-between">
                        <span class="text-md font-medium text-gray-600">Students</span>
                        <span class="text-5xl  mb-5 text-gray-600">{{ formatCount(totalStudents.count) }}</span>
                    </div>
                </div>

                <div class="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 w-full h-[150px] flex flex-col p-4 rounded-lg border border-gray-200"
                    v-motion-slide-visible-once-bottom>
                    <div class="flex-1 flex flex-col justify-between">
                        <span class="text-md font-medium text-gray-600">Total Fee Amount Collected</span>
                        <span class="text-5xl  mb-5 text-gray-600">₹{{ formatAmount(totalFeeAmount.sum) }}</span>
                        <!-- <span class="text-5xl  mb-5 text-gray-600" >₹0</span> -->
                    </div>
                </div>

                <div class="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 w-full h-[150px] flex  p-4 rounded-lg border border-gray-200"
                    v-motion-slide-visible-once-bottom>
                    <div class="flex- flex flex-col justify-between pr-[20px] ">
                        <span class="text-md font-medium text-gray-600">Admins</span>
                        <span class="text-5xl  mb-5 text-gray-600">{{ formatCount(totalAdmins.count) }}</span>
                    </div>
                    <!-- <div class="flex flex-col">
                        <div class="flex flex-col  ">
                            <span class="text-sm font-medium text-gray-600 ">Head Admins</span>
                            <span class="text-2xl  text-gray-600">{{ totalHeadAdmins.count }}</span>
                        </div>
                        <div class="flex flex-col  ">
                            <span class="text-md font-medium text-gray-600">Asst. Admins</span>
                            <span class="text-2xl  text-gray-600">{{ totalAssAdmins.count }}</span>
                        </div>
                    </div> -->
                </div>
            </section>

            <!-- Charts Section -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6" v-if="paidFees.length === 0 && unpaidFees.length === 0">
                <span
                    class="text-gray-600 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 w-full h-[250px] flex flex-col p-4 rounded-lg border border-gray-200">No
                    data to show yet</span>
                <span
                    class="text-gray-600 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 w-full h-[250px] flex flex-col p-4 rounded-lg border border-gray-200">No
                    data to show yet</span>
            </div>
            <section class="grid grid-cols-1  xl:grid-cols-2 gap-6 mb-6" v-else>
                <div v-motion-slide-visible-once-bottom
                    class="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 w-full h-[250px] flex flex-col  p-4 rounded-lg border border-gray-200">
                    <div class="flex items-center justify-around h-full laptop:px-[40px] ">
                        
                            <canvas ref="pieChart"></canvas>
                      
                      
                            <canvas ref="donutChart" class="donut-chart"></canvas>
                        
                    </div>
                </div>

                <!-- <div v-motion-slide-visible-once-bottom
                    class="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 w-full h-[250px] flex flex-col p-4 rounded-lg border border-gray-200">
                    <div class="flex items-center justify-between h-full laptop:px-[40px]">
                      
                        <canvas ref="donutChart"></canvas>

                    </div>




                </div> -->

                <div v-motion-slide-visible-once-bottom
                    class="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 w-full h-[250px] flex flex-col p-4 rounded-lg border border-gray-200">
                    <canvas ref="barGraph"></canvas>
                </div>
            </section>


            <!-- Floating Button -->

        </section>

    </div>
</template>


<script setup>
import { ref, nextTick } from 'vue';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { useAuthStore } from '../stores/auth';


import { storeToRefs } from 'pinia'
import { useErrorPage } from '../stores/errorPage'

const auth = useAuthStore();
const { profile } = storeToRefs(auth)
const { fetchProfile } = auth;
const errorPage = useErrorPage();
const { isError } = storeToRefs(errorPage);

fetchProfile();
const isLoading = ref(false)
const donutChart = ref(null);
const pieChart = ref(null);
const barGraph = ref(null);

const succPayment = ref([]);
const failPayment = ref([]);
const paidFees = ref([]);
const unpaidFees = ref([]);
function formatAmount(amount) {
    if (amount >= 10000000) {
        return (amount / 10000000).toFixed(1) + 'Cr';
    } else if (amount >= 100000) {
        return (amount / 100000).toFixed(1) + 'L';
    } else if (amount >= 1000) {
        return (amount / 1000).toFixed(1) + 'k';
    }
    else {
        return amount
    }
}
function formatCount(amount) {
    if (amount >= 10000000) {
        return Math.round(amount / 10000000) + 'Cr';
    } else if (amount >= 100000) {
        return Math.round(amount / 100000) + 'L';
    } else if (amount >= 1000) {
        return Math.round(amount / 1000) + 'k';
    } else {
        return amount;
    }
}

// Function to initialize charts
const initializeCharts = (paymentData, monthlyData) => {
    new Chart(pieChart.value, {
        type: 'pie',
        data: {
            labels: ['Paid Fees', 'Unpaid Fees'],
            datasets: [{
                label: 'Quantity',
                data: [paymentData['Paid Fees'], paymentData['Unpaid Fees']],
                backgroundColor: ['#4395F5', '#8FA7BD'],
            }]
        }
    });


    const labels = monthlyData.map(item => item.month);
    const data = monthlyData.map(item => item.total_amount);

    new Chart(barGraph.value, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Monthly Fees Collection',
                data: data,
                backgroundColor: '#4395F5',
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
};

const totalAdmins = ref([]);
const totalAssAdmins = ref([]);
const totalHeadAdmins = ref([]);
const totalCourses = ref([]);
const totalFeeAmount = ref([]);
const totalStudents = ref([]);
// Fetch total admins
const fetchTotalAdmins = async () => {
    isLoading.value = true;
    try {
        const response = await axios.get(`/dashboard/total-admins`);
        totalAdmins.value = response.data[0]
    } catch (error) {
        console.error('Error fetching total admins:', error);
        isError.value = true;
    } finally {
        isLoading.value = false;
    }
};

// Fetch total assistant admins
const fetchTotalAssAdmins = async () => {
    isLoading.value = true;
    try {
        const response = await axios.get(`/dashboard/total-assistant-admins`);
        totalAssAdmins.value = response.data[0];
    } catch (error) {
        console.error('Error fetching total assistant admins:', error);
        isError.value = true;
    } finally {
        isLoading.value = false;
    }
};

// Fetch total head admins
const fetchTotalHeadAdmins = async () => {
    isLoading.value = true;
    try {
        const response = await axios.get(`/dashboard/total-head-admins`);
        totalHeadAdmins.value = response.data[0];
    } catch (error) {
        console.error('Error fetching total head admins:', error);
        isError.value = true;
    } finally {
        isLoading.value = false;
    }
};

// Fetch total courses
const fetchTotalCourses = async () => {
    isLoading.value = true;
    try {
        const response = await axios.get(`/dashboard/total-courses`);
        totalCourses.value = response.data[0];
    } catch (error) {
        console.error('Error fetching total courses:', error);
        isError.value = true;
    } finally {
        isLoading.value = false;
    }
};

// Fetch total fee amount
const fetchTotalFeeAmount = async () => {
    isLoading.value = true;
    try {
        const response = await axios.get(`/dashboard/total-fee-amount`);
        totalFeeAmount.value = response.data[0];
    } catch (error) {
        console.error('Error fetching total fee amount:', error);
        isError.value = true;
    } finally {
        isLoading.value = false;
    }
};

// Fetch total students
const fetchTotalStudents = async () => {
    isLoading.value = true;
    try {
        const response = await axios.get(`/dashboard/total-students`);
        console.log("studsss: ", response.data[0])
        totalStudents.value = response.data[0];

    } catch (error) {
        console.error('Error fetching total students:', error);
        isError.value = true;
    } finally {
        isLoading.value = false;
    }
};
const fetchPaymentSummary = async () => {
    isLoading.value = true;
    try {
        const response = await axios.get('/payment-summary');
        const data = response.data;

        paidFees.value = data['Paid Fees'];
        unpaidFees.value = data['Unpaid Fees'];


        const monthlyResponse = await axios.get('/monthly-payment-summary');
        const monthlyData = monthlyResponse.data;


        initializeCharts(data, monthlyData);
    } catch (error) {
        console.error('Error fetching payment summary:', error);
        isError.value = true;
    } finally {
        isLoading.value = false;
    }
};


const initializeDonutChart = (paymentSummarydata) => {
    new Chart(donutChart.value, {
        type: 'doughnut',
        data: {
            labels: ['Successful Payments', 'Failed Payments'],
            datasets: [{
                label: 'Payment Status',
                data: [paymentSummarydata['Success'], paymentSummarydata['Failure']],

                backgroundColor: ['#4395F5', '#8FA7BD'],
            }]
        }
    })
}

const fetchPaymentStatusSummary = async () => {
    isLoading.value = true;
    try {
        const response = await axios.get('/payment-status-summary');
        const data = response.data;

        succPayment.value = data['Success'];
        failPayment.value = data['Failure'];

        initializeDonutChart(data);


    } catch (err) {
        console.log("donut error: ", err);
        isError.value = true;
    } finally {
        isLoading.value = false;
    }
}


fetchTotalAdmins();
fetchTotalAssAdmins();
fetchTotalHeadAdmins();
fetchTotalCourses();
fetchTotalFeeAmount();
fetchTotalStudents();



console.log("total students ", totalStudents.value)
console.log("total amount: ", totalFeeAmount.value)
// Fetch payment summary and initialize charts after DOM updates
nextTick(() => {
    fetchPaymentSummary();
    fetchPaymentStatusSummary();
});
</script>
  
<style scoped>
.the-shadow {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
}

.modal-enter-active,
.modal-leave-active {
    transition: all 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
    transform: scale(1.1);
}

.custom-pulse {
    animation: pulse 1.5s infinite;
}

@keyframes pulse {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }

    100% {
        opacity: 1;
    }
}


/* .donut-chart {
    display: none;
}


@media (min-width: 767px) {

    
    .donut-chart {
        display: block;
    }
} */

/* Add your custom styles here */
</style>
  