import { ref } from "vue";
import { defineStore } from 'pinia';
import axios from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


export const useCourseStore = defineStore('courses', () => {

    const modal = ref(null);
    const loading = ref(false); // Loading state
    const courses = ref([]);
    const filteredItems = ref([]);
    const search = ref("");
    const isOpenPopupFormRegister = ref(false);
    const isOpenPopupForm = ref(false);
    const items = ref([]);
    const currentPage = ref(1);
    const totalPages = ref(0);
    const totalItems = ref(0);
    const error = ref(false);
    const courseNames = ref([]);
    const isDelPopup = ref(false);
    const isEditPopup = ref(false);
    const course = ref([]);
    
    const courseNameId = ref(null);
    const noOfSem = ref(null);

    const isSearch = ref(false);

    const errorMessage = ref("");
    const courseNameInsert = ref("");
    const courseDelId = ref(null);
    const courseEditId = ref(null);
    const loadingSpinner = ref("false");
    const courseName = ref("");
    const closePopupForm = () => {
        isOpenPopupFormRegister.value = false;
        isOpenPopupForm.value = false;
        courseNameInsert.value = "";
        errorMessage.value = "";
        isEditPopup.value = false;
        noOfSem.value = null;
        courseNameId.value = null;
        courseName.value ="";
        


    }

    const getCoursesPaginated = async (page = 1, term = '') => {
        loading.value = true;
        try {
            const response = await axios.get(`/courses-paginated?page=${page}&term=${term}&limit=8`);
            items.value = response.data.results;
            totalItems.value = response.data.totalItems;
            filteredItems.value = response.data.results;
            totalPages.value = response.data.totalPages;
            currentPage.value = response.data.currentPage;
            console.log("total pages: ", totalPages.value)
            isSearch.value = true;


            error.value = false;
        } catch (err) {
            console.error("Error fetching courses:", err);
            error.value = true;
        } finally {
            console.log("HEHEHE");
            loading.value = false;
            console.log("asfasf", items.value);
        }
    };



    const searchCourse = async (page = 1, term = '') => {
        // loading.value = true; 
        try {
            const response = await axios.get(`/courses-paginated?page=${page}&term=${term}&limit=8`);
            items.value = response.data.results;
            totalItems.value = response.data.totalItems;
            filteredItems.value = response.data.results;
            totalPages.value = response.data.totalPages;
            currentPage.value = response.data.currentPage;
            error.value = false;
            isSearch.value = false;
        } catch (err) {
            console.error("Error fetching courses:", err);
            error.value = true;
        } finally {
            console.log("HEHEHE");
            loading.value = false;
        }
    };

    const deleteCourse = async (id) => {
        console.log(id);
        try {
            await axios.delete(`/courses/${id}`);

        } catch (err) {
            console.error("Error deleting course:", err);
            toast.error("Cannot delete course.")
        } finally {
            getCoursesPaginated();
            isDelPopup.value = false;

        }
    };

    // FETCH ALL COURSE NAMES
    const getCourseNames = async () => {
        loading.value = "true"
        try {
            const response = await axios.get('/course-names');
            courseNames.value = response.data;

        } catch (err) {
            console.error("Error fetching course names", err);
            error.value = true;

        } finally {
            loading.value = false;
            console.log("course names", courseNames.value);
        }
    };

    const getCourseById = async (id) => {
        try {
            const response = await axios.get(`/courses/${id}`);
            course.value = response.data;

        } catch (err) {

            console.log("Error editing course");

        } finally {
            getCourseNames();
            console.log("course by id: ", course.value)
        }
    }


    // INSERT COURSE NAME
    const insertCourseName = async () => {
        loadingSpinner.value = true;
        try {
            const response = await axios.post('/add-course-name', { name: courseNameInsert.value });
            console.log(response.data);
            if (response.data.message) {
                errorMessage.value = response.data.message;


            }
            else {
                isOpenPopupFormRegister.value = false;
                toast.success("Course has been successfully registered.")
                courseNameInsert.value = "";
                errorMessage.value = "";
            }
        } catch (err) {
            console.error("Error inserting course name", err);
            toast.error("Error inserting course name");
        } finally {
            loadingSpinner.value = false;
            getCourseNames();

        }
    }

    // INSERT COURSE 
    const insertCourse = async () => {
        loadingSpinner.value = true;
        try {
            const response = await axios.post('/courses', { courseNameId: courseNameId.value, noOfSem: noOfSem.value });
            console.log(response.data);
            if (response.data.message) {
                errorMessage.value = response.data.message;


            }
            else {
                isOpenPopupForm.value = false;
                toast.success("Course has been created.")
                courseNameInsert.value = "";
                errorMessage.value = "";
            }
        } catch (err) {
            console.error("Error inserting course name", err);
            toast.error("Error inserting course name");
        } finally {
            loadingSpinner.value = false;
            getCoursesPaginated();

        }
    }

    const activatePopup = (id ) => {
        isDelPopup.value = true;
        courseDelId.value = id;
        console.log(courseDelId.value)
    }

    const activateEditPopup = (id,courseNameValue, noOfSemValue) => {

        isEditPopup.value = true;
        courseEditId.value = id;
        courseName.value = courseNameValue;
        noOfSem.value = noOfSemValue;
        

        getCourseById(courseEditId.value);





    }

    // EDIT COURSE
    const editCourseById = async (id) => {
        console.log("AAA", id);
        try {
            const response = await axios.put(`/courses/${id}`, { courseNameId: courseNameId.value, noOfSem: noOfSem.value });
            console.log("RESPO", response.data);
            
            if (response.data.errorMessage) {
                errorMessage.value = response.data.errorMessage;
                alert(errorMessage.value); 
            } else {
                isEditPopup.value = false;
                toast.success("Course has been edited");
            }
        } catch (err) {
            errorMessage.value = "Course already exists";
        } finally {
            searchCourse();
        }
    };
    


    return {
        modal,
        loading,
        filteredItems,
        isOpenPopupFormRegister,
        items,
        currentPage,
        totalItems,
        totalPages,
        error,
        getCoursesPaginated,
        deleteCourse,
        isOpenPopupForm,
        searchCourse,
        getCourseNames,
        courseNames,
        courseNameInsert,
        insertCourseName,
        errorMessage,
        closePopupForm,
        insertCourse,
        courseNameId,
        noOfSem,
        isDelPopup,
        activatePopup,
        courseDelId,
        isEditPopup,
        courseEditId,
        activateEditPopup,
        getCourseById,
        course,
        courseName,
        editCourseById,
        isSearch
    };
});
