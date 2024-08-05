
<script>

</script>
<template>
    <div>
        <section class="flex flex-col">
            <h1 class="text-lg  pl-1">
                <div class="custom-pulse h-7 mb-2 w-[150px] bg-gray-200 rounded"></div>
            </h1>
            <div class="flex smartphone:justify-start mb-2 tablet:justify-end">
                <input type="text" name="search" hover:cursor-auto
                    class="py-1 px-2 rounded text-gray-800 text-base shadow-lg sm:w-auto mb-2 sm:mb-0 smartphone:mr-0 tablet:mr-2 smartphone:w-[100%] smartphone-lg:w-[50%] bg-gray-200 custom-pulse"
                    disabled>
                    
            </div>
            <div>
                <div class="overflow-auto rounded-lg shadow hidden md:block max-w-[100vw]">
                    <table class="w-full">
                        <thead class="bg-gray-50 border-b-2 border-gray-200">
                            <tr>
                                <th class="w-40 p-2 text-sm text-gray-700 whitespace-nowrap">
                                    <div class="custom-pulse h-6 bg-gray-200 rounded"></div>
                                </th>
                                <th class="w-40 p-2 text-sm text-gray-700 whitespace-nowrap">
                                    <div class="custom-pulse h-6 bg-gray-200 rounded"></div>
                                </th>
                                <th class="w-500 p-2 text-sm text-gray-700 whitespace-nowrap">
                                    <div class="custom-pulse h-6 bg-gray-200 rounded"></div>
                                </th>
                                <th class="w-14 p-2 text-sm text-gray-700 whitespace-nowrap">
                                    <div class="custom-pulse h-6 bg-gray-200 rounded"></div>
                                </th>
                                <th class="w-14 p-2 text-sm text-gray-700 whitespace-nowrap">
                                    <div class="custom-pulse h-6 bg-gray-200 rounded"></div>
                                </th>
                            </tr>

                        </thead>
                        <tbody class="divide-y divide-gray-100">
                            <tr v-for="n in 6" :key="n" class="bg-white">
                                <td class="p-2 text-sm text-gray-700 whitespace-nowrap">
                                    <div class="custom-pulse h-4 bg-gray-200 rounded"></div>
                                </td>
                                <td class="p-2 text-sm text-gray-700 whitespace-nowrap">
                                    <div class="custom-pulse h-4 bg-gray-200 rounded"></div>
                                </td>
                                <td class="p-2 text-sm text-gray-700 whitespace-nowrap">
                                    <div class="custom-pulse h-4 bg-gray-200 rounded"></div>
                                </td>
                                <td class="p-2 text-sm text-gray-700 whitespace-nowrap">
                                    <div class="custom-pulse h-4 bg-gray-200 rounded"></div>
                                </td>
                                <td class="p-2 text-sm text-gray-700 whitespace-nowrap">
                                    <div class="custom-pulse h-4 bg-gray-200 rounded"></div>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
                <div class="flex flex-wrap md:hidden ">
                    <div v-for="n in 6" :key="n"
                        class="bg-white p-2 rounded-lg shadow m-1 smartphone:w-[100%] smartphone-lg:w-[48%] smartphone-xl:w-[31.9%]">
                        <div class="custom-pulse flex justify-end py-0">
                            <div class="h-4 w-4 bg-gray-200 rounded"></div>
                        </div>
                        <div>
                            <div class="custom-pulse flex items-center space-x-2 text-sm">
                                <div class="h-4 w-12 bg-gray-200 rounded"></div>
                                <div class="h-4 w-20 bg-gray-200 rounded"></div>
                            </div>
                            <div class="custom-pulse h-4 bg-gray-200 rounded my-2"></div>
                        </div>
                        <div class="custom-pulse flex justify-end py-0">
                            <div class="h-4 w-4 bg-gray-200 rounded"></div>
                        </div>
                    </div>

                </div>
            </div>
            <div class="fixed custom-pulse  roundBtn tablet:hidden bottom-2 right-4">
                <div
                    class="bg-gray-200 text-college-white p-2 w-[50px] h-[50px] rounded-full text-4xl flex justify-center items-center">
                </div>
            </div>
        </section>

    </div>
</template>

<style scoped>

.custom-pulse {
    animation: pulse 1.5s infinite;
}

@keyframes pulse {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }

    100% {
        opacity: 1;
    }
}
</style>