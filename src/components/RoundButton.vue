<!-- RoundButton.vu -->

<script setup>
    const props = defineProps({
        text:{
            type: String,
            required: true
        },
        // action:{
        //     type: Function,
        //     required: false
        // }

    })


</script>

<template>
    <button  class="">{{ text  }}</button>

</template>