
import { defineStore } from "pinia";
import { ref } from "vue";

export const useSidebarStore = defineStore("sidebar", ()=>{
    const isOpenSidebar = ref(false);

    const toggleSidebar = ()=>{
        isOpenSidebar.value = !isOpenSidebar.value;
        // console.log("Sidebar: ", isOpenSidebar.value);
    }
    

    return {isOpenSidebar, toggleSidebar};

}
    
);
