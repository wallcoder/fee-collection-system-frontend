import { defineStore } from "pinia";
import { ref } from "vue";
export const useErrorPage = defineStore('errorPage', ()=>{
    const isError = ref(false);
    return {isError}
})