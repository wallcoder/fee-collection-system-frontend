
<script setup>
import { isOpenPopupForm } from '../sharedState';
const togglePopupForm = () => {
  isOpenPopupForm.value = !isOpenPopupForm.value;
}
</script>

<template>
  <div class="">
    <form class="bg-white p-4 rounded-lg w-[300px]" >
      <span class="flex justify-end w-full pr-2">
        <span class="fa-solid fa-xmark hover:cursor-pointer" @click="isOpenPopupForm=false"></span>
      </span>
      <div class="p-4">
        <h1 class="pb-2">New Entry</h1>
        <div class="mb-5">
          <label for="course" class="block mb-2 text-sm font-medium text-gray-900">Course Name</label>
          
            <select id="course" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Select Course Name" required>
                <option value="">asfsafsfasf</option>
            </select>
            <!-- name@flowbite.com -->
        </div>
        <div class="mb-5">
          <label for="noOfSemesters" class="block mb-2 text-sm font-medium text-gray-900">Number of Semesters</label>
          <input type="number" id="noOfSemesters"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required placeholder="Enter Password"/>
        </div>
        
        <button type="submit" class="bg-college-blue p-2 rounded-lg text-white w-full">Submit</button>
      </div>
    </form>
  </div>
</template>
