import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { onClickOutside } from '@vueuse/core';

export const useFeeStatusStore = defineStore('feeStatus', () => {

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

    const delId = ref(null);
    const editId = ref(null);

    const fName = ref("");
    const lName = ref("");
    const email = ref("");
    const phone = ref(null);
    const type = ref("");



    const courses = ref([]);

    const feeStatus = ref([]);
    const initial = ref(false);

    const passwordGenerator = (email, phone) => {

       
    const phoneStr = String(phone);
    const emailPart = email.substring(0, 4).toLowerCase();
    const phonePart = phoneStr.substring(0, 4);
    const password = emailPart + phonePart;
    
    return password;
    }

    onClickOutside(modal, () => {
        isOpenNewEntry.value = false;
        isOpenEdit.value = false;
        isOpenDel.value = false;
        fName.value = ""
        lName.value = ""
        email.value = ""
        phone.value = null;
        type.value = "";

        // courses.value = [];

    });

    // const activateEdit = (id, name, amountVal, courseVal) => {
    //     console.log("activateEdit called with:", id, name, amountVal, courseVal);
    //     editId.value = id;
    //     feeStatusName.value = name;
    //     amount.value = amountVal;
    //     course.value = courseVal;
    //     isOpenEdit.value = true;
    //     console.log(id);
    // };

    const activateDel = (id) => {
        delId.value = id;
        isOpenDel.value = true;
        console.log("activateDel: ", delId.value);
    };

    const closePopup = () => {
        isOpenNewEntry.value = false;
        isOpenEdit.value = false;
        isOpenDel.value = false;
        fName.value = ""
        lName.value = ""
        email.value = ""
        phone.value = null;
        type.value = "";
        // courses.value = [];
    };

    // FETCH FEE COMPONENTS
    const getFeeStatus = async (refresh = true, page = 1, term = '') => {
        console.log(refresh);
        loading.value = refresh;
        initial.value = refresh;
        
        try {
            const response = await axios.get(`/fee-status?page=${page}&term=${term}&limit=10`);
            items.value = response.data.results;
            totalItems.value = response.data.totalItems;
            filteredItems.value = response.data.results;
            totalPages.value = response.data.totalPages;
            currentPage.value = response.data.currentPage;
            console.log("feeStatus:", items.value);

            error.value = false;
        } catch (err) {
            console.error("Error fetching fee components:", err);
            error.value = true;
        } finally {
            loading.value = false;
        }
    };

    // GET FEE COMPONENT BY ID
    // const getFeeStatusById = async (id) => {
    //     console.log(id);

    //     try {
    //         const response = await axios.get(`/fee-components/${id}`);
    //         feeStatus.value = response.data;
    //         console.log("Fee component data:", feeStatus.value);
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
    const insertFeeStatus = async () => {
        const password = passwordGenerator(email.value, phone.value);
        console.log(password);
        try {
            const response = await axios.post('/fee-status', {
                fName: fName.value,
                lName: lName.value,
                email: email.value,
                phone: phone.value,
                password: password,
                type: type.value
            });
            closePopup();
            toast.success("Fee Component successfully added");
        } catch (err) {
            console.log("Error inserting data", err);
            toast.error("Error inserting course");
        } finally {
            getFeeStatus();
        }
    };

    // DELETE FEE COMPONENT
    const deleteFeeStatus = async (id) => {
        console.log("delete", id);
        try {
            await axios.delete(`/fee-status/${id}`);
        } catch (err) {
            console.error("Error deleting fee component", err);
            toast.error("Cannot delete fee component.");
        } finally {
            getFeeStatus();
            closePopup();
        }
    };

    // // EDIT FEE COMPONENT
    // const editFeeStatus = async (id) => {
    //     try {
    //         const response = await axios.put(`/fee-components/${id}`, {
    //             feeStatusName: feeStatusName.value,
    //             amount: amount.value,
    //             course: course.value
    //         });
    //         if (response.data.errorMessage) {
    //             toast.error(response.data.errorMessage);
    //         } else {
    //             closePopup();
    //             toast.success("Fee component has been edited");
    //         }
    //     } catch (err) {
    //         console.log("Error editing", err);
    //         toast.error("Error editing fee component");
    //     } finally {
    //         getFeeStatus();
    //     }
    // };

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
        
    
        lName,
        fName,
        email,
        phone,
        type,
        delId,
        editId,
       
        feeStatus,
        initial,
        getFeeStatus,
        closePopup,
        activateDel,
    
        getCourses,
        insertFeeStatus,
        deleteFeeStatus,
        
        passwordGenerator
    };
});
