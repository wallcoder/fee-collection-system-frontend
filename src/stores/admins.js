import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { onClickOutside } from '@vueuse/core';
import { errorMessages } from "vue/compiler-sfc";
import { useAuthStore } from "./auth";

console.log("sdgsdg");
export const useAdminStore = defineStore('admins', () => {

    
    
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
    const errMessage = ref("")



    const courses = ref([]);

    const admin = ref([]);
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
        errMessage.value = ""


        // courses.value = [];

    });

  
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
        errMessage.value = "";
        // courses.value = [];
    };

    // FETCH FEE COMPONENTS
    const getAdmins = async (refresh = true, page = 1, term = '') => {
        console.log(refresh);
        loading.value = refresh;
        initial.value = refresh;

        try {
            const response = await axios.get(`/admins?page=${page}&term=${term}&limit=8`);
            items.value = response.data.results;
            totalItems.value = response.data.totalItems;
            filteredItems.value = response.data.results;
            totalPages.value = response.data.totalPages;
            currentPage.value = response.data.currentPage;
            console.log("admins:", items.value);

            error.value = false;
        } catch (err) {
            console.error("Error fetching fee components:", err);
            error.value = true;
        } finally {
            loading.value = false;
        }
    };

   

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
    const insertAdmin = async () => {
        const password = passwordGenerator(email.value, phone.value);
        console.log(password);
        try {
            const response = await axios.post('/admins', {
                fName: fName.value,
                lName: lName.value,
                email: email.value,
                phone: phone.value,
                password: password,
                type: type.value
                
            });
            if(response.data.message){
                errMessage.value = response.data.message
            }else{
                closePopup();
                toast.success("Fee Component successfully added");
            }
            
        } catch (err) {
            console.log("Error inserting data", err);
            toast.error("Error inserting course");
        } finally {
            getAdmins();
        }
    };

    // DELETE FEE COMPONENT
    const deleteAdmin = async (id) => {
        console.log("delete", id);
        try {
            await axios.delete(`/admins/${id}`);
        } catch (err) {
            console.error("Error deleting fee component", err);
            toast.error("Cannot delete fee component.");
        } finally {
            getAdmins();
            closePopup();
        }
    };
    const deleteAdminCurrent = async (id) => {
        console.log("delete", id);
        try {
            await axios.delete(`/admins/${id}`);
        } catch (err) {
            console.error("Error deleting fee component", err);
            toast.error("Cannot delete fee component.");
        } finally {
            getAdmins();
            closePopup();
        }
    };

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
        errMessage,
        
    
        lName,
        fName,
        email,
        phone,
        type,
        delId,
        editId,
       
        admin,
        initial,
        getAdmins,
        closePopup,
        activateDel,
    
        getCourses,
        insertAdmin,
        deleteAdmin,
        
        passwordGenerator
    };
});
