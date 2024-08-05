import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { onClickOutside } from '@vueuse/core';
import { computed } from 'vue';

export const useFeeStructureStore = defineStore('feeStructures', () => {

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
    const isOpenView = ref(false);
    const modal = ref(null);
    const isInitial = ref(false);
    const delId = ref(null);
    const editId = ref(null);
    const viewId = ref(null);
    const semNo = ref(null);
    const dueDay = ref(null)
    const dueMonth = ref(null);


    const feeStructureName = ref('');
    const course = ref('');


    const courseId = ref(null);
    const description = ref('');
    const amount = ref(null);
    const courses = ref([]);
    const feeComponentId = ref(null);
    const feeComponentsInsert = ref([

    ]);
    const feeComponents = ref([])

    const feeStructure = ref([]);
    const feeComponentName = ref("");
    const feeMapping = ref([]);
    const courseName = ref("");



    onClickOutside(modal, () => {
        isOpenNewEntry.value = false;
        isOpenEdit.value = false;
        isOpenDel.value = false;
        isOpenView.value = false;

        courseId.value = null;
        description.value = null;
        amount.value = null;
        feeComponentsInsert.value = [];
        courseName.value = "";
        dueDay.value = null;
        dueMonth.value = null;





    });

    const total = computed(() => {
        return feeComponentsInsert.value.reduce((sum, component) => sum + component.amount, 0);
    });

    function addFeeComponent() {
        console.log("Current feeComponents: ", feeComponents.value);
        if (feeComponentId.value != null) {

            const matchingComponent = feeComponents.value.find(component => component.fee_component_id === feeComponentId.value);

            if (matchingComponent) {

                feeComponentsInsert.value.push(matchingComponent);


                feeComponentId.value = null;
            } else {
                console.log("No matching fee component found for the given ID.");
            }
            console.log("fee insertL ", feeComponentsInsert.value)
        }
    }

    function removeFeeComponentInsert(id) {
        console.log("Removing fee component with id: ", id);


        const index = feeComponentsInsert.value.findIndex(component => component.fee_component_id === id);

        if (index !== -1) {

            feeComponentsInsert.value.splice(index, 1);
            console.log("Removed component. Updated feeComponentsInsert: ", feeComponentsInsert.value);
        } else {
            console.log("No matching fee component found in feeComponentsInsert for the given ID.");
        }
    }


    const activateEdit = async (id, selectedCourseIdValue, descriptionValue, dueDayValue, dueMonthValue) => {
        console.log("activateEdit called with:", id, selectedCourseIdValue, descriptionValue);

        editId.value = id;
        selectedCourseId.value = selectedCourseIdValue;
        description.value = descriptionValue;
        dueDay.value = dueDayValue;
        dueMonth.value = dueMonthValue;
        console.log("EDIT VALUEACIVERE: ", editId.value)
        await getFeeMapping(id);
        console.log(feeMapping.value);

        feeMapping.value.forEach(e => {
            feeComponentsInsert.value.push(e);
        });

        console.log("yo inserted: ", feeComponentsInsert.value);
        isOpenEdit.value = true;
    };


    const activateDel = (id) => {
        delId.value = id;
        isOpenDel.value = true;
        console.log("activateDel: ", delId.value);
    };

    const activateView = (id, name, amountValue, descriptionValue) => {
        description.value = descriptionValue;
        viewId.value = id;
        isOpenView.value = true;
        courseName.value = name;
        amount.value = amountValue

        console.log("activateView: ", viewId.value, description.value)
        getFeeMapping(id);
    }

    const closePopup = () => {
        isOpenNewEntry.value = false;
        isOpenEdit.value = false;
        isOpenDel.value = false;
        isOpenView.value = false;
        courseId.value = null;
        description.value = null;
        amount.value = null;
        feeComponentsInsert.value = [];
        courseName.value = "";

        dueDay.value = null;
        dueMonth.value = null;
        // courses.value = [];
    };

    // FETCH FEE COMPONENTS
    const getFeeStructures = async (refresh = true, page = 1, term = '') => {
        console.log(refresh);
        loading.value = refresh;
        isInitial.value = refresh;

        try {
            const response = await axios.get(`/fee-structures?page=${page}&term=${term}&limit=10`);
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
    // const getFeeStructureById = async (id) => {
    //     console.log(id);

    //     try {
    //         const response = await axios.get(`/feeStructures/${id}`);
    //         feeStructure.value = response.data;
    //         console.log("Fee component data:", feeStructure.value);
    //     } catch (err) {
    //         console.log("Error fetching data: ", err);
    //     }
    // };

    // FETCH COURSES
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

    const getFeeComponents = async () => {
        loading.value = true;
        try {
            const response = await axios.get('/fee-structures/fee-components');
            feeComponents.value = response.data;
            console.log("Fee components: ", feeComponents.value);
            error.value = false;
        } catch (err) {
            console.log("Error fetching course data", err);
        } finally {
            loading.value = false;
        }
    };

    // INSERT Fee component
    const insertFeeStructure = async () => {
        console.log("hihihhi");
        console.log(dueDay.value, dueMonth.value)
        try {
            const response = await axios.post('/fee-structures', {
                selectedComponents: feeComponentsInsert.value,
                courseId: selectedCourseId.value,
                description: description.value,
                amount: total.value,
                dueDay: dueDay.value,
                dueMonth: dueMonth.value

            });
            closePopup();
            toast.success("Fee structure added");
        } catch (err) {
            console.log("Error inserting data", err);
            toast.error("Error inserting data");
        } finally {
            getFeeStructures();
        }
    };

    // DELETE FEE COMPONENT
    const deleteFeeStructure = async (id) => {
        console.log("delete", id);
        try {
            await axios.delete(`/fee-structures/${id}`);
        } catch (err) {
            console.error("Error deleting data", err);
            toast.error("Cannot delete data.");
        } finally {
            getFeeStructures();
            closePopup();
        }
    };

    // EDIT FEE COMPONENT
    const editFeeStructure = async (id) => {
        console.log("EDIT ID: ", id)
        try {
            const response = await axios.put(`/fee-structures/${id}`, {
                courseId: courseId.value,
                selectedComponents: feeComponentsInsert.value,
                courseId: selectedCourseId.value,
                description: description.value,
                amount: total.value,
                dueDay: dueDay.value,
                dueMonth: dueMonth.value
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
            getFeeStructures();
        }
    };

    const getFeeMapping = async (id) => {


        try {
            const response = await axios.get(`fee-structures/fee-mapping/${id}`);
            feeMapping.value = response.data;
            console.log("fee mapping: ", feeMapping.value)

        } catch (err) {
            console.log("error fetching fee mapping")
        }


    }



    const selectedCourseId = ref(null);






    const updateSemNo = () => {
        const selectedCourse = courses.value.find(course => course.course_id === selectedCourseId.value);
        semNo.value = selectedCourse ? selectedCourse.no_of_sem : null;
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
        feeStructureName,
        amount,
        course,
        courses,
        delId,
        editId,
        courseId,
        description,
        amount,
        feeComponentId,
        feeComponentsInsert,
        feeComponents,
        viewId,
        isOpenView,
        semNo,
        total,
        selectedCourseId,
        feeMapping,
        courseName,
        dueDay,
        dueMonth,

        feeStructure,
        getFeeStructures,
        closePopup,
        activateDel,
        activateEdit,
        getCourses,
        insertFeeStructure,
        deleteFeeStructure,
        editFeeStructure,
        isInitial,
        activateView,
        getFeeComponents,
        addFeeComponent,
        removeFeeComponentInsert,
        updateSemNo



    };
});
