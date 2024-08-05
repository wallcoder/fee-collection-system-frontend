<script setup>
import { RouterView } from 'vue-router';
import AdminNav from "../components/AdminNav.vue";
import AdminSidebarMainView from "../components/AdminSidebarMainView.vue";
import ErrorPage from '../components/ErrorPage.vue'
import { storeToRefs } from 'pinia'
import { useErrorPage } from '../stores/errorPage'

const errorPage = useErrorPage();
const { isError } = storeToRefs(errorPage);
</script>

<template>
  <main class="bg-admin-light-pink relative h-[100vh] overflow-none" v-if="!isError">
    <AdminNav class="z-[9999]" />
    <div class="flex laptop:h-[88vh] desktop:h-[90vh] bg-admin-light-pink">
      <AdminSidebarMainView class="z-[9999]" />
      <div class="flex-grow smartphone:justify-center w-[100%] py-4 smartphone:px-2 tablet:px-5 desktop:px-4 z-[10] bg-admin-light-pink">
        <RouterView class="bg-admin-light-pink" />
      </div>
    </div>
    <div id="modal"></div>

  </main>
  <ErrorPage />
</template>

<style scoped>
/* .flex {
  display: flex;
}
.flex-grow {
  flex-grow: 1;
} */
</style>
