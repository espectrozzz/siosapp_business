<template>
  <div
    class="
      flex flex-col
      w-full
      h-full
      bg-fondo-gris-claro
      py-2
      px-4
      rounded-lg
      space-y-2
      cursor-pointer
      shadow-md
    "
    @click="$router.push(`/proyectos/en-proceso/${props.data.key}`)"
  >
    <div class="flex w-full h-full">
      <div
        class="
          flex flex-col
          w-[60%]
          items-center
          space-y-4
        "
      >
        <div class="truncate" :title="props.data.value.nombre">
          {{ props.data.value.nombre }}
        </div>
        <div class="w-24 h-24 bg-fondo-gris rounded-full"></div>
      </div>
      <div class="flex flex-col w-[40%] items-center">
        <div>Rentabilidad</div>
        <div class="flex flex-col w-full h-auto items-center space-y-[15%] mt-3">
          <div class="flex flex-col">
            <div class="text-sm">Bruta</div>
            <div class="text-base font-semibold">
              {{ props.data.value.rentabilidad.bruta }}%
            </div>
          </div>
          <div class="flex flex-col">
            <div class="text-sm">Neta</div>
            <div class="text-base font-semibold">
              {{ props.data.value.rentabilidad.neta }}%
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps(["data"]);
</script>