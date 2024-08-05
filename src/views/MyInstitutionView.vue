<script setup>
  import {storeToRefs} from 'pinia'
  import { useMyInstitutionStore } from '../stores/myInstitution';

  const myInstitution = useMyInstitutionStore();
  const {name, address,email, phone, mainWebsiteUrl, apiKey, apiSecretKey, institution, id} = storeToRefs(myInstitution)
  const {editMyInstitution, getMyInstitution} = myInstitution
  getMyInstitution();
</script>

<template>
  <div>
    <div class="flex justify-center p-4 h-full">
      <form class="bg-college-white p-2 rounded-lg shadow-md w-full max-w-2xl flex  " @submit.prevent="editMyInstitution(id.value)" v-motion-fade-visible-once>
        <div class="p-4  w-full ">
          <h1 class="pb-2 text-xl font-semibold">My Institution Info</h1>
          <section class="flex flex-wrap -mx-2  w-full">
            <div class="w-full md:w-1/2  px-2 mb-4 ">
              <div class="mb-5">
                <label for="institutionName" class="block mb-2 text-sm font-medium text-gray-900">Institution Name</label>
                <input type="text" id="institutionName" v-model="name"
                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                       required placeholder="Enter Institution Name" />
                <span class="text-red-700 text-sm"></span>
              </div>
              <div class="mb-5">
                <label for="address" class="block mb-2 text-sm font-medium text-gray-900">Address</label>
                <input type="text" id="address" v-model="address"
                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                       required placeholder="Enter Address" />
                <span class="text-red-700 text-sm"></span>
              </div>
              <div class="mb-5">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email</label>
                <input type="email" id="email" v-model="email"
                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                       required placeholder="Enter Email" />
                <span class="text-red-700 text-sm"></span>
              </div>
              <div class="mb-5">
                <label for="phone" class="block mb-2 text-sm font-medium text-gray-900">Phone</label>
                <input type="tel" id="phone" v-model="phone"
                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                       required placeholder="Enter Phone Number" />
                <span class="text-red-700 text-sm"></span>
              </div>
            </div>

            <div class="w-full md:w-1/2  px-2 mb-4 md:pl-2">
              <div class="mb-5">
                <label for="website" class="block mb-2 text-sm font-medium text-gray-900">Main Website URL</label>
                <input type="text" id="website" v-model="mainWebsiteUrl"
                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                       required placeholder="Enter Website URL" />
                <span class="text-red-700 text-sm"></span>
              </div>
              <div class="mb-5">
                <label for="apiKey" class="block mb-2 text-sm font-medium text-gray-900">API Key</label>
                <input type="password" id="apiKey" v-model="apiKey"
                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                       required placeholder="Enter API Key of Razorpay" />
                <span class="text-red-700 text-sm"></span>
              </div>
              <div class="mb-5">
                <label for="apiSecretKey" class="block mb-2 text-sm font-medium text-gray-900">API Secret Key</label>
                <input type="password" id="apiSecretKey" v-model="apiSecretKey"
                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                       required placeholder="Enter API Secret Key of Razorpay" />
                <span class="text-red-700 text-sm"></span>
              </div>
              <button type="submit"
                      class="bg-college-blue p-2 rounded-lg text-white w-full hover:bg-hover-blue mt-8">Save</button>
            </div>
          </section>
        </div>
      </form>
    </div>
  </div>
</template>

  
  
  