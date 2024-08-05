<script setup>

import { storeToRefs } from 'pinia';
import { RouterLink } from 'vue-router';

import LoaderSpinner from '../components/LoaderSpinner.vue'
import { useAuthStore } from '../stores/auth';
import { ref } from 'vue';
import ErrorPage from '../components/ErrorPage.vue'

import { useErrorPage } from '../stores/errorPage'

const errorPage = useErrorPage();
const { isError } = storeToRefs(errorPage);
let flag = ref(false);
let passwordType = ref("password");
const authStore = useAuthStore();
const { loginEmail,
    loginPassword,
    isLoggedIn, errMessage,
    token, } = storeToRefs(authStore);
const { login, logout } = authStore;

const togglePasswordType = () => {
    flag.value = !flag.value;

    if (flag.value) { passwordType.value = "text"; }
    else {
        passwordType.value = "password";
    }

}


</script>

<template>
    <section v-motion-fade-visible-once
        class="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-10 w-full min-h-screen flex justify-center items-center main-container"
        v-if="!isError">
        <form @submit.prevent="login" class="w-full max-w-md" v-motion-fade-visible-once>
            <div class="bg-white shadow-lg  p-8 flex flex-col justify-center items-center">
                <img src="../images/logo 2.png" alt="Logo" class="w-40 mb-6" />
                <h1 class="text-2xl font-bold mb-6">ADMIN LOGIN</h1>

                <div class="w-full space-y-4">
                    <div>
                        <label for="email" class="block text-sm font-bold mb-1">Email</label>
                        <input type="email" name="email" id="email"
                            class="w-full p-3 border border-gray-300  outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Email Address" v-model="loginEmail" />
                    </div>

                    <div>
                        <label for="password" class="block text-sm font-bold mb-1">Password</label>
                        <input :type="passwordType" name="password" id="password"
                            class="w-full p-3 border border-gray-300  outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Password" v-model="loginPassword" />
                    </div>

                    <span class="text-red-600 text-xs">{{ errMessage }}</span>

                    <button type="submit"
                        class="w-full bg-college-blue text-white py-3  mt-4 font-bold hover:bg-hover-blue transition duration-200">
                        Login
                    </button>
                </div>
            </div>
        </form>
        <LoaderSpinner />
    </section>
    <ErrorPage />
</template>

<style scoped >
.main-container {
    background: linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), url(../images/background-5.png);
    background-size: cover;
}
</style>