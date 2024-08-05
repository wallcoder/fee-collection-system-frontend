import { defineStore, storeToRefs } from "pinia";
import { ref, onMounted } from "vue";
import axios from "axios";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import router from "../router";
import { useLoaderStore } from "./loader";
import { errorMessages } from "vue/compiler-sfc";
import { useErrorPage } from '../stores/errorPage'



export const useAuthStore = defineStore('auth', () => {
    const errorPage = useErrorPage();
    const { isError } = storeToRefs(errorPage);

    const loaderStore = useLoaderStore();
    const { isLoadingSpinner } = storeToRefs(loaderStore);

    const loginEmail = ref("");
    const loginPassword = ref("");
    const isLoggedIn = ref(false);
    const isHead = ref(false);
    const token = ref(localStorage.getItem('token'));
    const profile = ref([]);
    const errMessage = ref("");
    const regNo = ref("");

    const checkAuth = () => {
        isLoggedIn.value = !!token.value;
        axios.defaults.headers.common['Authorization'] = token.value ? `Bearer ${token.value}` : '';
    };


    const proceed = async () => {
        isLoadingSpinner.value = true;
        try {
            const response = await axios.get(`/search-registration-number/${regNo.value}`)
            console.log(response.data);
            if (response.data.message) {
                errMessage.value = response.data.message;
            } else {


                await router.push(`/student-panel/${regNo.value}`);
                errMessage.value = '';

            }
        } catch (err) {
            console.log(err);
            isError.value = true
        } finally {
            isLoadingSpinner.value = false;
        }
    }

    const login = async () => {
        isLoadingSpinner.value = true;
        try {
            const response = await axios.post("/auth/login", {
                email: loginEmail.value,
                password: loginPassword.value
            });

            if (response.data.token) {
                token.value = response.data.token;
                localStorage.setItem('token', token.value);
                isLoggedIn.value = true;
                axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;
                router.push('/admin-panel');
            } else {
                console.log(response.data)
                errMessage.value = response.data.message;

            }
        } catch (err) {
            console.error("Login failed", err);
            isError.value = true

        } finally {

            isLoadingSpinner.value = false;
        }
    };

    const fetchProfile = async () => {
        isLoadingSpinner.value = true;
        try {
            const response = await axios.get("/profile");
            profile.value = response.data;
            console.log("profile: ", profile.value);
            if (profile.value.type == 'Head Admin') {
                isHead.value = true;
                console.log("head admin logs in");
            }
        } catch (err) {
            console.log(err);
            isError.value = true
        } finally {
            isLoadingSpinner.value = false;
        }
    }


    const logout = () => {

        token.value = null;
        localStorage.removeItem('token');
        isLoggedIn.value = false;
        delete axios.defaults.headers.common['Authorization'];
        router.push('/admin-login');
    };


    checkAuth();

    return {
        loginEmail,
        loginPassword,
        isLoggedIn,
        token,
        login,
        logout,
        profile,
        fetchProfile,
        errMessage,
        regNo,
        isHead,
        proceed
    };
});
