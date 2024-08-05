import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { onClickOutside } from '@vueuse/core';
import { useLoaderStore } from "../stores/loader";
import {storeToRefs} from "pinia";
import { errorMessages } from "vue/compiler-sfc";

export const useStudentStore = defineStore('students', () => {

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
    const errorMessage = ref("");

    const studentName = ref('');
    const amount = ref(null);
    const course = ref(null);

    const question = ref('');
    const answer = ref('');

    const courses = ref([]);

    const student = ref([]);

    const regNo = ref("");
    const name = ref("");
    const phone = ref("");
    const rollNo = ref("");
    const email = ref("");
    const enrollmentYear = ref("");
    const startDate = ref("");


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
        startDate.value = "";
        errorMessage.value = "";
    
    
    });

    const activateEdit = (id, regNoValue, nameValue, phoneValue, rollNoValue, emailValue, yearValue, courseValue) => {
        console.log("activateEdit called with:", id);
        course.value = courseValue;
        regNo.value = regNoValue;
        name.value = nameValue;
        phone.value = phoneValue;
        rollNo.value = rollNoValue;
        email.value = emailValue;
        editId.value = id;
        console.log(editId.value)
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
        course.value = null;
        startDate.value = "";
        errorMessage.value = "";
    
        // courses.value = [];
    };

    // FETCH FEE COMPONENTS
    const getStudents = async (refresh = true, page = 1, term = '', limit='4') => {
        console.log(refresh);
        loading.value = refresh;
        isInitial.value  = refresh;
        isLoadingSpinner.value = refresh;
        
        try {
            const response = await axios.get(`/students?page=${page}&term=${term}&limit=10`);
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
    // const getStudentById = async (id) => {
    //     console.log(id);

    //     try {
    //         const response = await axios.get(`/students/${id}`);
    //         student.value = response.data;
    //         console.log("Fee component data:", student.value);
    //     } catch (err) {
    //         console.log("Error fetching data: ", err);
    //     }
    // };

    
    const getCourses = async () => {
        loading.value = true;
        try {
            const response = await axios.get('/fee-structures/courses');
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
    const insertStudent = async () => {
        try {
            const response = await axios.post('/students', {
                regNo : regNo.value,
                name: name.value,
                phone: phone.value, 
                rollNo: rollNo.value,
                email: email.value,
                enrollmentYear: enrollmentYear.value,
                courseId: course.value,
                startDate: startDate.value
            });
            if(response.data.message){
                errorMessage.value = response.data.message
            }else{
                closePopup();
                toast.success("Student added");
            }
            
        } catch (err) {
            errorMessage.value = "Registration Number already exists"
            console.log(errorMessage)
            
        } finally {
            getStudents();
        }
    };

    // DELETE FEE COMPONENT
    const deleteStudent = async (id) => {
        console.log("delete", id);
        try {
            await axios.delete(`/students/${id}`);
        } catch (err) {
            console.error("Error deleting data", err);
            toast.error("Cannot delete data.");
        } finally {
            getStudents();
            closePopup();
        }
    };

    // EDIT FEE COMPONENT
    const editStudent = async (id) => {
        console.log("edit id: ", id)
        
        try {
            const response = await axios.put(`/students/${id}`, {
                regNo : regNo.value,
                name: name.value,
                phone: phone.value, 
                rollNo: rollNo.value,
                email: email.value,
                enrollmentYear: enrollmentYear.value ,
                courseId: course.value,
                startDate: startDate.value
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
            getStudents();
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
        studentName,
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
        
        student,
        getStudents,
        closePopup,
        activateDel,
        activateEdit,
        getCourses,
        insertStudent,
        deleteStudent,
        editStudent,
        isInitial,
        startDate,
        errorMessage,

        question,
        answer
    };
});
