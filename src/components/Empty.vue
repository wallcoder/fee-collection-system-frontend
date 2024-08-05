<script setup>
import Button from "./Button.vue";
    const props = defineProps(
        {
            title:{
                type: String,
                required: true
            }
        }
    )



</script>

<template>
    <section class="flex justify-center items-center ">
        <div class="flex flex-col items-center">
            <img src="../images/cat.png" alt="" class="w-[120px] ">
            <h1 class="font-bold ">Wow, no {{ title }} added yet</h1>
            
        </div>
</section></template>