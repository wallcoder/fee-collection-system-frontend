<script setup>
    const props = defineProps({
        text:{
            type: String,
            required: true
        },
        action:{
            type: Function,
            required: false
        }

    })

    const callParentFunction = ()=>{
        action.action();
    }

</script>

<template>
    <button type="submit" class="bg-college-blue py-1 px-2 rounded-lg text-college-white text-sm" @click="action">{{ text  }}</button>

</template>