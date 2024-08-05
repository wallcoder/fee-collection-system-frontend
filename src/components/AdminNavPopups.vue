<script setup>
import { useAdminNavStore } from "../stores/adminNav";
import { storeToRefs } from 'pinia';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


const adminNavStore = useAdminNavStore();
const { modal, isOpenNewEntry, errMessage, isOpenDel,  lName,
        fName, isOpenEditPassword,
        email, 
        phone, currPassword, newPassword, conPassword,
        type, isOpenEdit, editId,errorMessage,

    
   
    
     delId,  } = storeToRefs(adminNavStore);
const { closePopup, getCourses, insertAdminNav,
    deleteAdminNav, editAccount, editPassword,
     } = adminNavStore;

getCourses();




</script>

<template>
    <!-- POPUPS -->
    <Teleport to="#modal">
        <!-- ACCOUNT DETAILS -->
        <Transition name="modal">
            <div class="fixed inset-0 z-[9999] flex justify-center items-center bg-black bg-opacity-50 overflow-auto"
                v-if="isOpenEdit">

                <div class="z-20 w-full max-w-xs mx-4 my-8 smartphone: tablet:mt-0" ref="modal">
                    <form class="bg-white p-4 rounded-lg" @submit.prevent="editAccount(editId)">
                        <span class="flex justify-end w-full pr-2">
                            <span class="fa-solid fa-xmark hover:cursor-pointer" @click="closePopup"></span>
                        </span>

                        <div class="p-4">
                            <h1 class="pb-2 text-xl font-semibold">Edit Account </h1>
                            <div class="flex flex-col space-y-4 tablet:space-y-0 tablet:flex-row tablet:space-x-4">
                                <div class="p-2 flex-1">
                                    <div class="mb-5">
                                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900">First Name</label>
                                        <input v-model="fName" type="text" id="name"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Enter Student Name" required>

                                    </div>
                                    <div class="mb-5">
                                        <label for="regNo" class="block mb-2 text-sm font-medium text-gray-900">Last Name</label>
                                        <input v-model="lName" type="text" id="regNo"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Enter Registration Number" required>
                                       
                                    </div>
                                    <div class="mb-5">
                                        <label for="email"
                                            class="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                        <input v-model="email" type="text" id="email"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Enter Email" required>
                                            <span class="text-red-700 text-sm">{{ errorMessage.email }}</span>

                                    </div>
                                    <div class="mb-5">
                                        <label for="rollNo" class="block mb-2 text-sm font-medium text-gray-900">Phone</label>
                                        <input v-model="phone" type="text" id="rollNo"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Enter Roll No" required>

                                    </div>
                                    <button type="submit"
                                        class="bg-college-blue p-2 rounded-lg text-white w-full hover:bg-hover-blue mt-7">Save</button>
                                </div>
                                <!-- <div class="p-2 flex-1">
                                    <div class="mb-5">
                                        <label for="enrollmentYear"
                                            class="block mb-2 text-sm font-medium text-gray-900">Current Password</label>
                                        <input v-model="currPassword" type="password" 
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Enter Password" required>
                                            <span class="text-red-700 text-sm">{{ errorMessage.currPassword }}</span>
                                    </div>
                                    <div class="mb-5">
                                        <label for="enrollmentYear"
                                            class="block mb-2 text-sm font-medium text-gray-900">New Password</label>
                                        <input v-model="newPassword" type="password" 
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Enter Password" required>

                                    </div>
                                    <div class="mb-5">
                                        <label for="enrollmentYear"
                                            class="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
                                        <input v-model="conPassword" type="password" 
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Enter Password" required>
                                            <span class="text-red-700 text-sm">{{ errorMessage.conPassword }}</span>

                                    </div>
                                    
                                    <button type="submit"
                                        class="bg-college-blue p-2 rounded-lg text-white w-full hover:bg-hover-blue mt-7">Save</button>
                                </div> -->
                            </div>
                        </div>
                    </form>
                </div>


            </div>


        </Transition>
        <Transition name="modal">
            <div class="fixed inset-0 z-[9999] flex justify-center items-center bg-black bg-opacity-50 overflow-auto"
                v-if="isOpenEditPassword">

                <div class="z-20 w-full max-w-xs mx-4 my-8 smartphone: tablet:mt-0" ref="modal">
                    <form class="bg-white p-4 rounded-lg" @submit.prevent="editPassword(editId)">
                        <span class="flex justify-end w-full pr-2">
                            <span class="fa-solid fa-xmark hover:cursor-pointer" @click="closePopup"></span>
                        </span>

                        <div class="p-4">
                            <h1 class="pb-2 text-xl font-semibold">Change Password </h1>
                            <div class="flex flex-col space-y-4 tablet:space-y-0 tablet:flex-row tablet:space-x-4">
                                
                                <div class="p-2 flex-1">
                                    <div class="mb-5">
                                        <label for="enrollmentYear"
                                            class="block mb-2 text-sm font-medium text-gray-900">Current Password</label>
                                        <input v-model="currPassword" type="password" 
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Enter Password" required>
                                            <span class="text-red-700 text-sm">{{ errorMessage.currPassword }}</span>
                                    </div>
                                    <div class="mb-5">
                                        <label for="enrollmentYear"
                                            class="block mb-2 text-sm font-medium text-gray-900">New Password</label>
                                        <input v-model="newPassword" type="password" 
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Enter Password" required>

                                    </div>
                                    <div class="mb-5">
                                        <label for="enrollmentYear"
                                            class="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
                                        <input v-model="conPassword" type="password" 
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Enter Password" required>
                                            <span class="text-red-700 text-sm">{{ errorMessage.conPassword }}</span>

                                    </div>
                                    
                                    <button type="submit"
                                        class="bg-college-blue p-2 rounded-lg text-white w-full hover:bg-hover-blue mt-7">Save</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>


            </div>


        </Transition>



        <!-- CONFIRM DELETE -->
        <Transition name="modal">
            <div class="fixed top-0 left-0 z-[9999] w-[100vw] h-[100%] flex justify-center items-center bg-black bg-opacity-50"
                v-if="isOpenDel">
                <div ref="modal" class="bg-white p-4 rounded-lg w-[300px] flex flex-col items-center">
                    <!-- <PopupForm class="z-20" ref="modal" /> -->
                    <h1>Are you sure you want to delete?</h1>
                    <div class="flex  w-full justify-center">
                        <button @click="deleteAdminNav(delId)"
                            class="bg-college-blue p-1 rounded-lg text-white w-[30%] m-2 hover:bg-hover-blue">Yes</button>
                        <button @click="closePopup"
                            class="bg-college-blue p-1 rounded-lg text-white w-[30%] m-2 hover:bg-hover-blue ">No</button>
                    </div>
                </div>
            </div>

        </Transition>

        <!-- EDIT COMPONENT -->
        



    </Teleport>
</template>