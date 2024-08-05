import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { onClickOutside } from '@vueuse/core';
import { useLoaderStore } from "./loader";
import { storeToRefs } from "pinia";

import {useErrorPage} from '../stores/errorPage'
    
    

export const useMyInstitutionStore = defineStore('myInstitution', ()=>{
    const errorPage = useErrorPage();
    const {isError} = storeToRefs(errorPage);
    const loader = useLoaderStore();

    const {isLoadingSpinner }= storeToRefs(loader);

    const name = ref("");
    const address = ref("");
    const phone = ref("");
    const mainWebsiteUrl = ref("");
    const apiKey = ref("");
    const apiSecretKey = ref("");
    const institution = ref([]);
    const email = ref("");
    const id = ref(null);

    const editMyInstitution = async ()=>{
        try{
            const response = await axios.put('/institution', {
                name: name.value,
                address: address.value,
                phone: phone.value,
                websiteUrl: mainWebsiteUrl.value,
                apiKey: apiKey.value,
                apiSecretKey: apiSecretKey.value,
                email: email.value,
                id: id.value
            } )
            

            toast.success("Institution info has been updated")
        }catch(err){
            toast.error("error updated")
        }
    }

    const getMyInstitution = async()=>{
        try{
            const response = await axios.get('/institution')
            institution.value = response.data[0]
            name.value = institution.value.name;
            address.value = institution.value.address;
            email.value = institution.value.email;
            id.value= institution.value.my_institution_id;
            phone.value = institution.value.phone;
            mainWebsiteUrl.value = institution.value.website_url;
            apiKey.value = institution.value.api_key;
            apiSecretKey.value = institution.value.api_secret_key;
            console.log("inst info: ", institution.value)
            
        }catch(err){
            console.log("error updated")
            isError.value = true;
           
        }
    }

    const getMyInstitutionNoAuth = async()=>{
        isLoadingSpinner.value = true;
        
        try{
            const response = await axios.get('/institution-no-auth')
            institution.value = response.data[0]
            name.value = institution.value.name;
            address.value = institution.value.address;
            email.value = institution.value.email;
            id.value= institution.value.my_institution_id;
            phone.value = institution.value.phone;
            mainWebsiteUrl.value = institution.value.website_url;
            // apiKey.value = institution.value.api_key;
            // apiSecretKey.value = institution.value.api_secret_key;
            console.log("inst info: ", institution.value)
            
        }catch(err){
            console.log("error updated")
            isError.value = true;
        }finally{
            isLoadingSpinner.value = false;
        }
    }

    return {name, address, phone, mainWebsiteUrl, isLoadingSpinner, apiKey, apiSecretKey, institution, email, editMyInstitution, getMyInstitution, getMyInstitutionNoAuth, id}
})