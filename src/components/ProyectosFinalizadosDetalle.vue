<template>
  <div class="flex h-full w-full pb-8">
    <div class="flex w-[25%] flex-col justify-between space-y-12">
      <!-- Tiempo -->
      <div class="relative rounded-xl">
        <div
          class="relative mx-auto flex h-24 w-full max-w-md items-center gap-6 overflow-visible rounded-xl bg-[#FAFAFA] ring-1 ring-black/5 pr-4"
        >
          <div
            class="absolute -left-6 flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white shadow-lg border"
          >
            <div class="text-xs">Tiempo total</div>
            <div :class="[props.coloresRentabilidadTexto.neta,'text-lg font-semibold']">
              {{ props.data.tiempo }} Días
            </div>
          </div>
          <div class="flex flex-col py-5 pl-28 w-full">
            <div class="flex justify-between">Días realizados <span class="font-semibold text-xl">{{ props.dataFinal.tiempo }}</span></div>
            <div class="mt-2 flex flex-col">
              <div class="mb-1 flex justify-between">
                <span class="text-xs font-medium dark:text-white"
                  >Progreso</span
                >
                <span class="text-xs font-medium dark:text-white"
                  >{{
                    (
                      (props.dataFinal.tiempo / props.data.tiempo) *
                      100
                    ).toFixed(2)
                  }}%</span
                >
              </div>
              <div
                class="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700"
              >
                <div
                  :class="[
                    props.coloresRentabilidadFondo.neta,
                    'h-2.5 rounded-full',
                  ]"
                  :style="
                    'width:' +
                    (props.dataFinal.tiempo / props.data.tiempo) * 100 +
                    '%'
                  "
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- volumetrias -->
       <div v-for="value in props.data.volumetrias" :key="value" class="relative rounded-xl">
        <div
          class="relative mx-auto flex h-24 w-full max-w-md items-center gap-6 overflow-visible rounded-xl bg-[#FAFAFA] ring-1 ring-black/5 pr-4"
        >
          <div
            class="absolute -left-6 flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white shadow-lg border"
          >
            <div class="text-xs">Volumetría</div>
            <div :class="[props.coloresRentabilidadTexto.neta,'text-lg font-semibold']">
              {{ value.cantidad }} {{ value.unidad }}
            </div>
          </div>
          <div class="flex flex-col py-5 pl-28 w-full">
            <div class="flex justify-between">realizados <span class="font-semibold text-xl">{{ props.dataFinal.tiempo }}</span></div>
            <div class="mt-2 flex flex-col">
              <div class="mb-1 flex justify-between">
                <span class="text-xs font-medium dark:text-white"
                  >Progreso</span
                >
                <span class="text-xs font-medium dark:text-white"
                  >{{
                    (
                      (props.dataFinal.tiempo / props.data.tiempo) *
                      100
                    ).toFixed(2)
                  }}%</span
                >
              </div>
              <div
                class="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700"
              >
                <div
                  :class="[
                    props.coloresRentabilidadFondo.neta,
                    'h-2.5 rounded-full',
                  ]"
                  :style="
                    'width:' +
                    (props.dataFinal.tiempo / props.data.tiempo) * 100 +
                    '%'
                  "
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const porcentaje = ref(100);
const props = defineProps([
  "data",
  "dataFinal",
  "coloresRentabilidadFondo",
  "coloresRentabilidadTexto",
]);
</script>
