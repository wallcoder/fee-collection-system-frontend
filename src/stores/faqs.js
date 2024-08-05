import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { onClickOutside } from '@vueuse/core';
import { useLoaderStore } from "../stores/loader";
import {storeToRefs} from "pinia";

export const useFaqStore = defineStore('faqs', () => {

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

    const faqName = ref('');
    const amount = ref(null);
    const course = ref('');

    const question = ref('');
    const answer = ref('');

    const courses = ref([]);

    const faq = ref([]);

    onClickOutside(modal, () => {
        isOpenNewEntry.value = false;
        isOpenEdit.value = false;
        isOpenDel.value = false;
         
        question.value = "";
        answer.value = "";
    
    });

    const activateEdit = (id, questionText, answerText) => {
        console.log("activateEdit called with:", id, question, answer);
        question.value = questionText;
        answer.value = answerText;
        editId.value = id;
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
        question.value = "";
        answer.value = "";
    
        // courses.value = [];
    };

    // FETCH FEE COMPONENTS
    const getFaqs = async (refresh = true, page = 1, term = '', limit='4') => {
        console.log(refresh);
        loading.value = refresh;
        isInitial.value  = refresh;
        isLoadingSpinner.value = refresh;
        
        try {
            const response = await axios.get(`/faqs?page=${page}&term=${term}&limit=4`);
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

    const getFaqsNoAuth = async (refresh = true, page = 1, term = '', limit='4') => {
        console.log(refresh);
        loading.value = refresh;
        isInitial.value  = refresh;
        isLoadingSpinner.value = refresh;
        
        try {
            const response = await axios.get(`/faqs-no-auth?page=${page}&term=${term}&limit=10`);
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
    // const getFaqById = async (id) => {
    //     console.log(id);

    //     try {
    //         const response = await axios.get(`/faqs/${id}`);
    //         faq.value = response.data;
    //         console.log("Fee component data:", faq.value);
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
    const insertFaq = async () => {
        try {
            const response = await axios.post('/faqs', {
                question: question.value,
                answer: answer.value
            });
            closePopup();
            toast.success("FAQ added");
        } catch (err) {
            console.log("Error inserting data", err);
            toast.error("Error inserting data");
        } finally {
            getFaqs();
        }
    };

    // DELETE FEE COMPONENT
    const deleteFaq = async (id) => {
        console.log("delete", id);
        try {
            await axios.delete(`/faqs/${id}`);
        } catch (err) {
            console.error("Error deleting data", err);
            toast.error("Cannot delete data.");
        } finally {
            getFaqs();
            closePopup();
        }
    };

    // EDIT FEE COMPONENT
    const editFaq = async (id) => {
        try {
            const response = await axios.put(`/faqs/${id}`, {
                question: question.value,
                answer: answer.value
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
            getFaqs();
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
        faqName,
        amount,
        course,
        courses,
        delId,
        editId,
        
        faq,
        getFaqs,
        closePopup,
        activateDel,
        activateEdit,
        getCourses,
        insertFaq,
        deleteFaq,
        editFaq,
        isInitial,

        question,
        answer,
        getFaqsNoAuth
    };
});
