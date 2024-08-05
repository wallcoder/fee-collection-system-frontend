<script setup>
import Nav from '../components/Nav.vue';
import { RouterView } from 'vue-router';
import Footer from '../components/Footer.vue';
import LoaderSpinner from '../components/LoaderSpinner.vue'
import ErrorPage from '../components/ErrorPage.vue'
import {storeToRefs} from 'pinia'
    import {useErrorPage} from '../stores/errorPage'
    
    const errorPage = useErrorPage();
    const {isError} = storeToRefs(errorPage);
    
</script>

<template>

    <section>
        <div v-if="!isError">
            <div class="main-container" >
                <Nav/>
                <RouterView class=" main min-h-[115vh] w-[100%]" v-motion-fade-visible-once/>
            </div>
            <Footer />
        </div>
        
       
        <LoaderSpinner/>
        
        <ErrorPage/>
    </section>

</template>

<style scoped >
.main-container {
    background: linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), url(../images/background-5.png);
    background-size: cover;
}
</style>