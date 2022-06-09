<template>
    <div class="flex justify-around w-[85%]">
        <!-- Tarjeta rentabilidad bruta -->
        <div
          class="
            flex flex-col
            w-[30%]
            border-dashed border-2 border-fondo-gris
            rounded-lg
            pt-4
            pb-6
          "
        >
          <div class="flex w-full justify-center">Rentabilidad Bruta</div>
          <div class="flex justify-center mt-4 w-full">
            <div
              class="
                flex
                justify-center
                items-center
                font-semibold
                text-lg
                w-48
                h-48
                bg-fondo-gris
                rounded-full
              "
            >
              {{
                props.rentabilidadFinal.bruta
                  ? props.rentabilidadFinal.bruta
                  : props.data.rentabilidad.bruta
              }}%
            </div>
          </div>
          <div class="flex w-full justify-around mt-2">
            <div v-show="props.rentabilidadFinal.bruta" class="flex flex-col">
              <div>Inicial</div>
              <div>
                {{
                  props.rentabilidadFinal.bruta ? props.data.rentabilidad.bruta + "%" : ""
                }}
              </div>
            </div>
            <div class="flex flex-col items-center">
              <div>Efectividad</div>
              <div>{{ props.efectividad.bruta }}%</div>
            </div>
          </div>
        </div>
        <!-- Fin tarjeta rentabilidad bruta -->
        <!-- Tarjeta rentabilidad neta -->
        <div
          class="
            flex flex-col
            w-[30%]
            border-dashed border-2 border-fondo-gris
            rounded-lg
            pt-4
            pb-6
          "
        >
          <div class="flex w-full justify-center">Rentabilidad Neta</div>
          <div class="flex justify-center mt-4 w-full">
            <div
              class="
                flex
                justify-center
                items-center
                font-semibold
                text-lg
                w-48
                h-48
                bg-fondo-gris
                rounded-full
              "
            >
              {{
                props.rentabilidadFinal.neta
                  ? props.rentabilidadFinal.neta
                  : props.data.rentabilidad.neta
              }}%
            </div>
          </div>
          <div class="flex w-full justify-around mt-2">
            <div v-show="rentabilidadFinal.neta" class="flex flex-col">
              <div>Inicial</div>
              <div>
                {{ props.rentabilidadFinal.neta ? props.data.rentabilidad.neta + "%" : "" }}
              </div>
            </div>
            <div class="flex flex-col items-center">
              <div>Efectividad</div>
              <div>{{ props.efectividad.neta }}%</div>
            </div>
          </div>
        </div>
        <!-- Fin tarjeta rentabilidad neta -->
      </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps(['data', 'rentabilidadFinal', 'efectividad']);
</script>