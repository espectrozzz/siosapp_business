<template>
  <div class="flex h-full w-full select-none flex-col">
    <div class="flex h-full w-full items-center justify-center space-x-12">
      <div class="flex flex-col">
        <GraficaFinalizados
          :porcentaje="
            props.dataFinal.rentabilidad.bruta
              ? props.dataFinal.rentabilidad.bruta
              : props.data.rentabilidad.bruta
          "
          :color="props.coloresRentabilidadTexto.bruta"
        />
        <div
          class="min-h-10 flex h-10 w-full items-center justify-center space-x-4"
        >
          <div
            :class="[
              props.coloresRentabilidadFondo.bruta,
              'flex h-full w-auto rounded px-3.5',
            ]"
          >
            <img src="/img/icono_bruta.svg" />
          </div>
          <div class="text-lg font-semibold">Rentabilidad Bruta</div>
        </div>
      </div>
      <div class="flex flex-col">
        <GraficaFinalizados
          :porcentaje="
            props.dataFinal.rentabilidad.neta
              ? props.dataFinal.rentabilidad.neta
              : props.data.rentabilidad.neta
          "
          :color="props.coloresRentabilidadTexto.neta"
        />
        <div
          class="min-h-10 flex h-10 w-full items-center justify-center space-x-4"
        >
          <div
            :class="[
              props.coloresRentabilidadFondo.neta,
              'flex h-full w-auto rounded px-3.5',
            ]"
          >
            <img src="/img/icono_neta.svg" />
          </div>
          <div class="text-lg font-semibold">Rentabilidad Neta</div>
        </div>
      </div>
      <div class="flex flex-col">
        <GraficaFinalizados
          :porcentaje="
            props.efectividad.neta
              ? (
                  (props.efectividad.neta + props.efectividad.bruta) /
                  2
                ).toFixed(2)
              : 100
          "
          :color="props.coloresEfectividad.texto"
        />
        <div
          class="min-h-10 flex h-10 w-full items-center justify-center space-x-4"
        >
          <div
            :class="[
              props.coloresEfectividad.fondo,
              'flex h-full rounded px-3.5',
            ]"
          >
            <img src="/img/efectividad.svg" />
          </div>
          <div class="text-lg font-semibold">Efectividad</div>
        </div>
      </div>
    </div>
    <div class="flex w-full items-center justify-center text-[#2166E5] mt-12">
      <div @click="detalle = detalle ? false : true" class="h-auto w-auto cursor-pointer hover:underline">
        Ver detalles
      </div>
    </div>
    <div v-if="detalle"><ProyectosFinalizadosDetalle :data="props.data" :dataFinal="props.dataFinal" /></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import GraficaFinalizados from "./GraficaFinalizados.vue";
import ProyectosFinalizadosDetalle from "./ProyectosFinalizadosDetalle.vue";

const detalle = ref(false);
const props = defineProps([
  "data",
  "dataFinal",
  "rentabilidadFinal",
  "efectividad",
  "coloresRentabilidadFondo",
  "coloresRentabilidadTexto",
  "coloresEfectividad",
]);
</script>
