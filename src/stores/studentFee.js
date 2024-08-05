import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { onClickOutside } from '@vueuse/core';
import { useLoaderStore } from "../stores/loader";
import {storeToRefs} from "pinia";
import {useErrorPage} from '../stores/errorPage'
    
    
export const useStudentFeeStore = defineStore('studentFees', () => {
    const errorPage = useErrorPage();
    const {isError} = storeToRefs(errorPage);
    
    const {isLoadingSpinner} = storeToRefs(useLoaderStore());
    const items = ref([]);
    const loading = ref(false);
    const error = ref(false);
    const totalPages = ref(null);
    const totalItems = ref(null);
    const filteredItems = ref([]);
    const currentPage = ref(null);
    const isOpenNewEntry = ref(false);
    const isOpenEdit = ref(false);
    const isOpenDel = ref(false);
    const modal = ref(null);
    const isInitial= ref(false);
    const delId = ref(null);
    const editId = ref(null);

    const studentFeeName = ref('');
    const amount = ref(null);
    const course = ref('');

    const question = ref('');
    const answer = ref('');

    const courses = ref([]);

    const studentFee = ref([]);

    const regNo = ref("");
    const name = ref("");
    const phone = ref("");
    const rollNo = ref("");
    const email = ref("");
    const enrollmentYear = ref("");


    onClickOutside(modal, () => {
        isOpenNewEntry.value = false;
        isOpenEdit.value = false;
        isOpenDel.value = false;
         
        regNo.value = "";
        name.value = "";
        phone.value = "";
        rollNo.value = "";
        email.value = "";
        enrollmentYear.value = "";
    
    });

    const activateEdit = (id, regNoValue, nameValue, phoneValue, rollNoValue, emailValue, yearValue) => {
        console.log("activateEdit called with:", nameValue);
        regNo.value = regNoValue;
        nameValue.value = nameValue;
        phone.value = phoneValue;
        rollNo.value = rollNoValue;
        email.value = emailValue;
        editId.value = id;
        enrollmentYear.value = yearValue;
        isOpenEdit.value = true;
     
    };

    const activateDel = (id) => {
        delId.value = id;
        isOpenDel.value = true;
        console.log("activateDel: ", delId.value);
    };

    const closePopup = () => {
        isOpenNewEntry.value = false;
        isOpenEdit.value = false;
        isOpenDel.value = false;
        

        regNo.value = "";
        name.value = "";
        phone.value = "";
        rollNo.value = "";
        email.value = "";
        enrollmentYear.value = "";
    
        // courses.value = [];
    };

    // FETCH FEE COMPONENTS
    const getStudentFees = async (refresh = true, page = 1, term = '', limit='10') => {
        console.log(refresh);
        loading.value = refresh;
        isInitial.value  = refresh;
        isLoadingSpinner.value = refresh;
        
        try {
            const response = await axios.get(`/student-fees?page=${page}&term=${term}&limit=10`);
            items.value = response.data.results;
            totalItems.value = response.data.totalItems;
            filteredItems.value = response.data.results;
            totalPages.value = response.data.totalPages;
            currentPage.value = response.data.currentPage;
            console.log(items.value);

            error.value = false;
        } catch (err) {
            console.error("Error fetching fee components:", err);
            error.value = true;
        } finally {
            loading.value = false;
            isLoadingSpinner.value = false;
        }
    };

    // GET FEE COMPONENT BY ID
    // const getStudentFeeById = async (id) => {
    //     console.log(id);

    //     try {
    //         const response = await axios.get(`/studentFees/${id}`);
    //         studentFee.value = response.data;
    //         console.log("Fee component data:", studentFee.value);
    //     } catch (err) {
    //         console.log("Error fetching data: ", err);
    //     }
    // };

    // FETCH COURSES
    const getCourses = async () => {
        loading.value = true;
        try {
            const response = await axios.get('/course');
            courses.value = response.data;
            console.log(courses.value);
            error.value = false;
        } catch (err) {
            console.log("Error fetching course data", err);
        } finally {
            loading.value = false;
        }
    };

    // INSERT Fee component
    const insertStudentFee = async () => {
        try {
            const response = await axios.post('/studentFees', {
                regNo : regNo.value,
                name: name.value,
                phone: phone.value, 
                rollNo: rollNo.value,
                email: email.value,
                enrollmentYear: enrollmentYear.value 
            });
            closePopup();
            toast.success("STUDENTFEE added");
        } catch (err) {
            console.log("Error inserting data", err);
            toast.error("Error inserting data");
        } finally {
            getStudentFees();
        }
    };

    // DELETE FEE COMPONENT
    const deleteStudentFee = async (id) => {
        console.log("delete", id);
        try {
            await axios.delete(`/student-fees/${id}`);
        } catch (err) {
            console.error("Error deleting data", err);
            toast.error("Cannot delete data.");
        } finally {
            getStudentFees();
            closePopup();
        }
    };

    // EDIT FEE COMPONENT
    const editStudentFee = async (id) => {
        try {
            const response = await axios.put(`/studentFees/${id}`, {
                regNo : regNo.value,
                name: name.value,
                phone: phone.value, 
                rollNo: rollNo.value,
                email: email.value,
                enrollmentYear: enrollmentYear.value 
            });
            if (response.data.errorMessage) {
                toast.error(response.data.errorMessage);
            } else {
                closePopup();
                toast.success("Data has been edited");
            }
        } catch (err) {
            console.log("Error editing", err);
            toast.error("Error editing data");
        } finally {
            getStudentFees();
        }
    };

    return {
        items,
        loading,
        error,
        totalPages,
        totalItems,
        filteredItems,
        currentPage,
        isOpenNewEntry,
        isOpenDel,
        isOpenEdit,
        modal,
        studentFeeName,
        amount,
        course,
        courses,
        delId,
        editId,
        regNo,
        name,
        phone,
        rollNo,
        email,
        enrollmentYear,
        
        studentFee,
        getStudentFees,
        closePopup,
        activateDel,
        activateEdit,
        getCourses,
        insertStudentFee,
        deleteStudentFee,
        editStudentFee,
        isInitial,

        question,
        answer
    };
});
