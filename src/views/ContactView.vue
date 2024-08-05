<script setup>
import { ref } from 'vue';
import axios from 'axios';
import {toast} from 'vue3-toastify';
import LoaderSpinner from '../components/LoaderSpinner.vue'
import {useLoaderStore} from '../stores/loader'
import {storeToRefs } from 'pinia'

import { useMyInstitutionStore } from '@/stores/myInstitution';

const institution = useMyInstitutionStore();
const { email, mainWebsiteUrl, phone, address } = storeToRefs(institution)
const { getMyInstitutionNoAuth } = institution;
getMyInstitutionNoAuth()

const loader = useLoaderStore();
const {isLoadingSpinner} = storeToRefs(loader); 

const contact_name = ref("");
const contact_email = ref("");
const contact_phone = ref("");
const contact_inquiry = ref("");

const sendInquiry = async () =>{
    isLoadingSpinner.value = true
    try{
        const response = await axios.post('/send-inquiry', {
            name: contact_name.value,
            email: contact_email.value,
            phone: contact_phone.value,
            inquiry: contact_inquiry.value

        });
        if(response.status === 200){
            toast.success('Inquiry successfully sent');
            contact_name.value = ""
            contact_email.value = ""
            contact_phone.value = ""
            contact_inquiry.value =""
        }else{
            toast.error('Inquiry not sent!')
        }
    }catch(err){
        console.error('Error', error);
    }finally{
        isLoadingSpinner.value = false;
    }
    
};


</script>


<template>
    <section class="xl:px-[15%] lg:px-[10%] md:px-[2%] px-[2%] py-10 w-100% flex justify-center">
        <div class="flex-col justify-center w-[100%]  p-1 items-center">
            <h1 class="font-bold text-3xl text-center">CONTACT US</h1>
            <div class="mt-4 flex flex-col items-center">
                <form @submit.prevent="sendInquiry" class="flex flex-col w-[50%] min-w-[430px]">
                    <label for="name" class="font-bold mt-4">Name</label>
                    <input type="text" name="name" id="name" class="p-2 outline-none h-11" placeholder="Enter Name" v-model="contact_name">
                    <label for="email" class="font-bold mt-4">Email</label>
                    <input type="email" name="email" id="email" class="p-2 outline-none h-11"
                        placeholder="Enter Email Address" v-model="contact_email">
                    <label for="phone" class="font-bold mt-4">Phone</label>
                    <input type="number" name="Name" id="name" class="p-2 outline-none h-11"
                        placeholder="Enter Phone Number" v-model="contact_phone">
                    <label for="inquiry" class="font-bold mt-4">Inquiry</label>
                    <textarea name="" id="" cols="30" rows="5" class="p-2 outline-none" placeholder="Write Something" v-model="contact_inquiry"></textarea>
                    <input type="submit" name="submit" id="submit"
                        class="bg-college-blue text-college-white px-4 py-3 hover:bg-hover-blue transition-all duration-200 linear mt-4 font-bold hover:cursor-pointer">
                </form>
                <div class="bg-college-blue w-[50%] text-college-white mt-4  p-5 w-[50%] min-w-[430px]">
                    <h1 class="font-bold">Our Information</h1>
                    <div class="flex mt-1">
                        <div class="flex flex-col font-bold">
                            <span>Address:</span>
                            <span>Email:</span><span>Phone:</span><span>Main Website:</span>
                        </div>
                        <div class="flex flex-col ml-16">
                            <span>{{ address }}</span>
                            <span>{{ email  }}</span>
                            <span>{{phone}}</span>
                            <span>{{mainWebsiteUrl}}</span>
                        </div>
                    </div>
                </div>
            </div>




        </div>
        <LoaderSpinner/>
    </section>
</template>