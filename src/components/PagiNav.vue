<script setup>
    const props = defineProps(
        {
            totalPages:{
                type: Number,
                required: true
            },
            currentPage:{
                type: Number,
                required: true
            },
            onClick:{
                type: Function,
                required: true
            }
        }
    )

    const getData= () =>{
        props.onClick();
    }
    

</script>


<template>
    <div class="flex justify-center" v-if="totalPages > 1">

<nav aria-label="Page navigation example" class="my-2">
    <ul class="flex items-center -space-x-px h-8 text-sm">
        <li>
            <button :disabled="currentPage === 1"
                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 "
                @click="getData(currentPage - 1)">
                <span class="sr-only">Next</span>
                <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="2" d="M5 1 1 5l4 4" />
                    </svg>
            </button>
            
        </li>
        <li v-for="page in totalPages" @click="getData(page)" :key="page">
            <a href="#"
                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500  border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                :class="currentPage == page ? 'bg-gray-200' : 'bg-white'">{{
                    page }} </a>
        </li>

        <li>

            <button :disabled="currentPage === totalPages"
                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 "
                @click="getData(currentPage + 1)">
                <span class="sr-only">Next</span>
                <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="2" d="m1 9 4-4-4-4" />
                </svg>
            </button>

        </li>
    </ul>
</nav>
</div>
</template>