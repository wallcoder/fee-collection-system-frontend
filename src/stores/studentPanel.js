import { defineStore, storeToRefs } from "pinia";
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import router from "../router";
import { useLoaderStore } from "./loader";
import { onClickOutside } from '@vueuse/core';


    import {useErrorPage} from '../stores/errorPage'
    
    
export const useStudentPanelStore = defineStore('studentPanel', () => {
    const loaderStore = useLoaderStore();
    const { isLoadingSpinner } = storeToRefs(loaderStore);

    const errorPage = useErrorPage();
    const {isError} = storeToRefs(errorPage);

    const student = ref([]);
    const studentFee = ref([]);
    const studentFeePaid = ref([]);
    const isOpenDue = ref(true);
    const isOpenPaid = ref(false);
    const feeMapping = ref([]);

    const regNo = ref("");

    const isOpenView = ref(false);
    const isOpenReceipt = ref(false);
    const feeReceipt = ref([]);

    const orderId = ref(null);
    const amount = ref(null);
    const currency = ref('INR');
    const receipt = ref('receipt#1');

    const selectedFees = ref([]);

    const modal = ref(null);
    const description = ref("");
    const feeAmount = ref(null);
    const dueDate = ref("");
    const courseName = ref(null);

    const studentName = ref("");
    const payDate = ref("");
    const razorpayRef = ref("")
    const lateFee = ref(null);

    

    
    onClickOutside(modal, () => {
        console.log("JEHEHEHE")
        isOpenView.value = false;
        isOpenReceipt.value = false;
        feeMapping.value = [];
        feeReceipt.value = [];

        description.value = ""
        feeAmount.value = null
        dueDate.value = ""
        courseName.value = ""

        studentName.value = "";
        payDate.value = "";
        razorpayRef.value = "";
        lateFee.value= null;

    });

    const activateReceipt = (id, descriptionValue, feeAmountValue, payDateValue, courseNameValue, studentNameValue, razorpayRefValue, lateFeeValue)=>{
        isOpenReceipt.value = true;
        description.value = descriptionValue;
        feeAmount.value = feeAmountValue;
        payDate.value = payDateValue;
        courseName.value = courseNameValue;
        studentName.value = studentNameValue;
        razorpayRef.value = razorpayRefValue;
        lateFee.value = lateFeeValue
        getFeeMapping(id);

    }

    const activateView = (id, descriptionValue, feeAmountValue, dueDateValue, courseNameValue, lateFeeValue)=>{
        isOpenView.value = true;
        description.value = descriptionValue;
        feeAmount.value = feeAmountValue;
        dueDate.value = dueDateValue;
        courseName.value = courseNameValue;
        lateFee.value= lateFeeValue;
        getFeeMapping(id);
        console.log("Total FEE: ", feeAmount.value)

    }

    const closePopup = () => {
        isOpenView.value = false;
        isOpenReceipt.value = false;
        feeMapping.value = [];
        feeReceipt.value = [];
        lateFee.value= null;

        description.value = ""
        feeAmount.value = null
        dueDate.value = ""
        courseName.value = ""

        studentName.value = "";
        payDate.value = "";
        razorpayRef.value = "";
    }

    const updateSelectedFees = (id, amount) => {
        const index = selectedFees.value.findIndex(fee => fee.id === id);
        if (index !== -1) {
            selectedFees.value.splice(index, 1);
        } else {
            selectedFees.value.push({ id, amount });
        }
        console.log(selectedFees.value);
    };

    const totalAmount = computed(() => {
        return selectedFees.value.reduce((acc, fee) => acc + fee.amount, 0);
    });
    const handlePayNow = () => {
        payNow(totalAmount.value);
    };

    const createOrder = async () => {
        isLoadingSpinner.value = true;
        try {
            const response = await axios.post('/createOrder', {
                amount: amount.value,
                currency: currency.value,
                receipt: receipt.value,
            });
            orderId.value = response.data.id;
            console.log(response.data);
        } catch (error) {
            console.error('Error creating order:', error);
            isError.value =true;
        } finally {
            isLoadingSpinner.value = false;
        }
    };

    const storePaymentDetails = async (paymentId, status, details = null, paymentType = '') => {
        try {
            await axios.post('/store-payment-details', {
                paymentId,
                status,
                details,
                selectedFees: selectedFees.value,
                total: totalAmount.value,
                type: paymentType,
                studName: student.value[0].name,
                regNo:student.value[0].reg_no
            });
        } catch (error) {
            console.error('Error storing payment details:', error);
            isError.value =true;
        }
    };

    const payNow = async (amountValue) => {
        amount.value = amountValue;
        await createOrder();
        const options = {
            key: 'rzp_test_daoLopIZNUyaRK',
            amount: amount.value * 100,
            currency: currency.value,
            name: 'Dash College',
            description: 'Test Transaction',
            order_id: orderId.value,
            handler: async (response) => {

                console.log("Payment successful, handler triggered");
                try {

                    const verificationResponse = await axios.post('/verify-payment', {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                    });


                    const paymentDetails = await axios.get(`/payment-details/${response.razorpay_payment_id}`);
                    const paymentType = paymentDetails.data.method;


                    await storePaymentDetails(response.razorpay_payment_id, 'success', verificationResponse.data, paymentType);

                    
                    getStudentFee(regNo.value);
                    getStudentFeePaid(regNo.value);
                    activatePaid();
                    selectedFees.value = [];
                    toast.success("Payment Successful");
                } catch (error) {
                    console.error('Error verifying payment:', error);


                    await storePaymentDetails(response.razorpay_payment_id, 'failure');
                    

                    alert('Payment verification failed');
                    isError.value =true;
                }
            },
            modal: {
                ondismiss: async () => {
                    
                    await storePaymentDetails("", 'failure');
                    
                }
            },
            prefill: {},
            notes: {
                address: 'Razorpay Corporate Office',
            },
            theme: {
                color: '#016dbc',
            },
        };
        const rzp1 = new Razorpay(options);
        rzp1.open();
    };

    const activateDue = () => {
        isOpenDue.value = true
        isOpenPaid.value = false
    }
    const activatePaid = () => {
        isOpenDue.value = false
        isOpenPaid.value = true

    }
    const getStudent = async (id) => {
        isLoadingSpinner.value = true;
        try {
            const response = await axios.get(`/student-profile/${id}`);
            student.value = response.data;
            console.log("student: ", student.value)
        } catch (err) {
            console.log(err);
            isError.value =true;
        } finally {
            isLoadingSpinner.value = false;
        }
    }

    const getStudentFee = async (id) => {
        isLoadingSpinner.value = true;
        try {
            const response = await axios.get(`/student-profile/student-fee/${id}`);
            studentFee.value = response.data;
            console.log("student fee: ", studentFee.value)
        } catch (err) {
            console.log(err);
            isError.value =true;
        } finally {
            isLoadingSpinner.value = false;
        }
    }

    const getStudentFeePaid = async (id) => {
        isLoadingSpinner.value = true;
        try {
            const response = await axios.get(`/student-profile/student-fee-paid/${id}`);
            studentFeePaid.value = response.data;
            console.log("student fee: ", studentFeePaid.value)
        } catch (err) {
            console.log(err);
            isError.value =true;
        } finally {
            isLoadingSpinner.value = false;
        }
    }

    const getFeeMapping = async (id) => {


        try {
            const response = await axios.get(`student-profile/fee-mapping/${id}`);
            feeMapping.value = response.data;
            console.log("fee mapping: ", feeMapping.value)

        } catch (err) {
            console.log("error fetching fee mapping")
            isError.value =true;
        }


    }


    return {
        student, studentFee, getStudent, getStudentFee, isOpenDue, isOpenPaid, activateDue, activatePaid, studentFeePaid, getStudentFeePaid, lateFee,
        orderId, amount, currency, receipt, createOrder, payNow, selectedFees, updateSelectedFees, totalAmount, handlePayNow, feeMapping, getFeeMapping, regNo
        , closePopup, isOpenView, isOpenReceipt, feeReceipt, activateView, description, feeAmount, dueDate, courseName, studentName, payDate, razorpayRef, activateReceipt

    }
})

