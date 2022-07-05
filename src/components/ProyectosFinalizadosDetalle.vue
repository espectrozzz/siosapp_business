<template>
  <div class="mb-2 flex h-full w-full">
    <div class="flex w-[30%] flex-col bg-blue-200">
      <div class="relative rounded-xl bg-red-200 p-8">
        <div
          class="relative mx-auto flex h-24 w-full max-w-md items-center gap-6 overflow-visible rounded-xl bg-[#FAFAFA] ring-1 ring-black/5"
        >
          <div
            class="absolute -left-6 flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white shadow-lg"
          >
            <div class="text-xs">Tiempo total</div>
            <div class="text-lg font-semibold">
              {{ props.data.tiempo }} Días
            </div>
          </div>
          <div class="flex flex-col py-5 pl-28">
            <div>Días realizados {{ props.dataFinal.tiempo }}</div>
            <div class="mb-1 flex justify-between">
              <span class="text-base font-medium text-blue-700 dark:text-white"
                >Flowbite</span
              >
              <span class="text-sm font-medium text-blue-700 dark:text-white"
                >45%</span
              >
            </div>
            <div class="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                class="h-2.5 rounded-full bg-[#131140]"
                :style="'width:' + ((props.dataFinal.tiempo / props.data.tiempo) * 100) + '%'"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const porcentaje = ref(100)
const props = defineProps(["data", "dataFinal"]);
</script>
