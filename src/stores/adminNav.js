import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { onClickOutside } from '@vueuse/core';
import { errorMessages } from "vue/compiler-sfc";
import { useAuthStore } from "./auth";
import { storeToRefs } from "pinia";

console.log("sdgsdgsdgsdg");
export const useAdminNavStore = defineStore('adminNavs', () => {

    const auth = useAuthStore();
    const { profile } = storeToRefs(auth);
    // const { fetchProfile } = auth;

    

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
    const isOpenEditPassword = ref(false);

    const delId = ref(null);
    const editId = ref(null);

    const fName = ref("");
    const lName = ref("");
    const email = ref("");
    const phone = ref(null);
    const type = ref("");
    const errMessage = ref("");
    const currPassword = ref("");
    const newPassword = ref("");
    const conPassword = ref("");
    const fNameDisplay = ref("");
    const lNameDisplay = ref("");



    const courses = ref([]);

    const adminNav = ref([]);
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

        currPassword.value = ""
        newPassword.value = "";
        conPassword.value = "";
        isOpenEditPassword.value = false
        errorMessage.value = {
            email: '',
            currPassword: '',
            newPassword: '',
            conPassword: ''

        }


        // courses.value = [];

    });
    const activateEdit = (id) => {
        getAccount(id);
        console.log("iddd", id)
        editId.value = id;
        console.log("edit ID: ", editId.value)
        isOpenEdit.value = true;

    };
    const activateEditPassword = (id) => {

        console.log("idddpass", id)
        editId.value = id;
        console.log("edit ID: ", editId.value)
        isOpenEditPassword.value = true;

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
        fName.value = ""
        lName.value = ""
        email.value = ""
        phone.value = null;
        type.value = "";
        errMessage.value = "";
        currPassword.value = ""
        newPassword.value = "";
        conPassword.value = "";
        isOpenEditPassword.value = false
        errorMessage.value = {
            email: '',
            currPassword: '',
            newPassword: '',
            conPassword: ''

        }
        // courses.value = [];
    };

    const errorMessage = ref({
        email: '',
        currPassword: '',
        newPassword: '',
        conPassword: ''

    })
    const editAccount = async (id) => {
        errorMessage.value = {
            email: '',
            currPassword: '',
            newPassword: '',
            conPassword: ''

        }
        console.log("hey its working: ", id);
        try {
            const response = await axios.put(`/edit-account/${id}`, {
                fName: fName.value,
                lName: lName.value,
                email: email.value,
                phone: phone.value,
                // currPassword: currPassword.value,
                // newPassword: newPassword.value,
                // conPassword: conPassword.value
            });
            if (response.data.emailErrorMessage) {
                errorMessage.value.email = response.data.emailErrorMessage
            } else {
                closePopup()
                toast.success("Account has been edited")
            }

        } catch (err) {
            console.log(err)

        } finally {
            // await fetchProfile()
            getAccount(profile.value.adminId)
        }

    }

    const editPassword = async (id) => {
        errorMessage.value = {
            email: '',
            currPassword: '',
            newPassword: '',
            conPassword: ''

        }
        console.log("hey its working: ", id);
        try {
            const response = await axios.put(`/edit-password/${id}`, {

                currPassword: currPassword.value,
                newPassword: newPassword.value,
                conPassword: conPassword.value
            });
            if (response.data.emailErrorMessage) {
                errorMessage.value.email = response.data.emailErrorMessage
            } else if (response.data.currPasswordErrorMessage) {
                errorMessage.value.currPassword = response.data.currPasswordErrorMessage
            } else if (response.data.newPasswordErrorMessage) {
                errorMessage.value.newPassword = response.data.newPasswordErrorMessage
            } else if (response.data.conPasswordErrorMessage) {
                errorMessage.value.conPassword = response.data.conPasswordErrorMessage
            } else {
                closePopup()
                toast.success("Password has been edited")
            }

        } catch (err) {
            console.log(err)

        }

    }

    const getAccount = async (id) => {
        console.log("hey its working get accoutn:  ", id);

        try {
            const response = await axios.get(`/account/${id}`)
            fName.value = response.data[0].fname
            lName.value = response.data[0].lname
            email.value = response.data[0].email
            phone.value = response.data[0].phone

            fNameDisplay.value = response.data[0].fname
            lNameDisplay.value = response.data[0].lname

            console.log("fnamedispay: ", fNameDisplay.value)
        } catch (err) {
            console.log(err)
        }
    }

    // FETCH FEE COMPONENTS
    const getAdminNavs = async (refresh = true, page = 1, term = '') => {
        console.log(refresh);
        loading.value = refresh;
        initial.value = refresh;

        try {
            const response = await axios.get(`/adminNavs?page=${page}&term=${term}&limit=8`);
            items.value = response.data.results;
            totalItems.value = response.data.totalItems;
            filteredItems.value = response.data.results;
            totalPages.value = response.data.totalPages;
            currentPage.value = response.data.currentPage;
            console.log("adminNavs:", items.value);

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
    const insertAdminNav = async () => {
        const password = passwordGenerator(email.value, phone.value);
        console.log(password);
        try {
            const response = await axios.post('/adminNavs', {
                fName: fName.value,
                lName: lName.value,
                email: email.value,
                phone: phone.value,
                password: password,
                type: type.value

            });
            if (response.data.message) {
                errMessage.value = response.data.message
            } else {
                closePopup();
                toast.success("Fee Component successfully added");
            }

        } catch (err) {
            console.log("Error inserting data", err);
            toast.error("Error inserting course");
        } finally {
            getAdminNavs();
        }
    };

    // DELETE FEE COMPONENT
    const deleteAdminNav = async (id) => {
        console.log("delete", id);
        try {
            await axios.delete(`/adminNavs/${id}`);
        } catch (err) {
            console.error("Error deleting fee component", err);
            toast.error("Cannot delete fee component.");
        } finally {
            getAdminNavs();
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
        currPassword,
        newPassword,
        conPassword,
        getAccount,

        lName,
        fName,
        email,
        phone,
        type,
        delId,
        editId,

        adminNav,
        initial,
        getAdminNavs,
        closePopup,
        activateDel,
        fNameDisplay,
        lNameDisplay,

        getCourses,
        insertAdminNav,
        deleteAdminNav,
        activateEdit,
        editAccount,
        errorMessage,
        isOpenEditPassword,
        activateEditPassword,
        editPassword,

        passwordGenerator
    };
});
