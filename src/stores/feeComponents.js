import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { onClickOutside } from '@vueuse/core';

export const useFeeComponentStore = defineStore('feeComponents', () => {

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

    const feeComponentName = ref('');
    const amount = ref(null);
    const course = ref('');
    const isInitial = ref(false);

    const courses = ref([]);

    const feeComponent = ref([]);

    onClickOutside(modal, () => {
        isOpenNewEntry.value = false;
        isOpenEdit.value = false;
        isOpenDel.value = false;
        feeComponentName.value = '';
        amount.value = null;
        course.value = '';
        feeComponent.value = [];
        // courses.value = [];
    
    });

    const activateEdit = (id, name, amountVal, courseVal) => {
        console.log("activateEdit called with:", id, name, amountVal, courseVal);
        editId.value = id;
        feeComponentName.value = name;
        amount.value = amountVal;
        course.value = courseVal;
        isOpenEdit.value = true;
        console.log(id);
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
        feeComponentName.value = '';
        amount.value = null;
        course.value = '';
        feeComponent.value = [];
        // courses.value = [];
    };

    // FETCH FEE COMPONENTS
    const getFeeComponents = async (refresh = true, page = 1, term = '') => {
        console.log(refresh);
        loading.value = refresh;
        isInitial.value = refresh;
        console.log(isInitial.value)
        try {
            const response = await axios.get(`/fee-components?page=${page}&term=${term}&limit=8`);
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
        }
    };

    // GET FEE COMPONENT BY ID
    const getFeeComponentById = async (id) => {
        console.log(id);

        try {
            const response = await axios.get(`/fee-components/${id}`);
            feeComponent.value = response.data;
            console.log("Fee component data:", feeComponent.value);
        } catch (err) {
            console.log("Error fetching data: ", err);
        }
    };

    // FETCH COURSES
    const getCourses = async () => {
        loading.value = true;
        try {
            const response = await axios.get('/course');
            courses.value = response.data;
            console.log("courses: ",courses.value);
            error.value = false;
        } catch (err) {
            console.log("Error fetching course data", err);
        } finally {
            loading.value = false;
        }
    };

    // INSERT Fee component
    const insertFeeComponent = async () => {
        try {
            const response = await axios.post('/fee-components', {
                feeComponentName: feeComponentName.value,
                amount: amount.value,
                course: course.value
            });
            closePopup();
            toast.success("Fee Component successfully added");
        } catch (err) {
            console.log("Error inserting data", err);
            toast.error("Error inserting course");
        } finally {
            getFeeComponents();
        }
    };

    // DELETE FEE COMPONENT
    const deleteFeeComponent = async (id) => {
        console.log("delete", id);
        try {
            await axios.delete(`/fee-components/${id}`);
        } catch (err) {
            console.error("Error deleting fee component", err);
            toast.error("Cannot delete fee component.");
        } finally {
            getFeeComponents();
            closePopup();
        }
    };

    // EDIT FEE COMPONENT
    const editFeeComponent = async (id) => {
        try {
            const response = await axios.put(`/fee-components/${id}`, {
                feeComponentName: feeComponentName.value,
                amount: amount.value,
                course: course.value
            });
            if (response.data.errorMessage) {
                toast.error(response.data.errorMessage);
            } else {
                closePopup();
                toast.success("Fee component has been edited");
            }
        } catch (err) {
            console.log("Error editing", err);
            toast.error("Error editing fee component");
        } finally {
            getFeeComponents();
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
        feeComponentName,
        amount,
        course,
        courses,
        delId,
        editId,
        getFeeComponentById,
        feeComponent,
        getFeeComponents,
        closePopup,
        activateDel,
        activateEdit,
        getCourses,
        insertFeeComponent,
        deleteFeeComponent,
        editFeeComponent,
        isInitial
    };
});
