<template>
  <div class="flex flex-col justify-start w-full h-full">
    <div class="flex w-full">
      <div class="flex w-[35%]">
        <Suspense>
          <proyectos-finalizados-detalle-tarjeta
            :data="props.data"
            :keyData="props.keyData"
          />
        </Suspense>
      </div>
      <div class="flex items-center w-[65%]">
        <div class="flex justify-around w-full h-[75%]">
          <div
            class="
              flex flex-col
              w-[30%]
              h-full
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
                    props.rentabilidadFinal.bruta
                      ? props.data.rentabilidad.bruta + "%"
                      : ""
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
              h-full
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
              <div v-show="props.rentabilidadFinal.neta" class="flex flex-col">
                <div>Inicial</div>
                <div>
                  {{
                    props.rentabilidadFinal.neta
                      ? props.data.rentabilidad.neta + "%"
                      : ""
                  }}
                </div>
              </div>
              <div class="flex flex-col items-center">
                <div>Efectividad</div>
                <div>{{ props.efectividad.neta }}%</div>
              </div>
            </div>
          </div>
          <!-- Fin tarjeta rentabilidad bruta -->
        </div>
      </div>
    </div>
    <div class="flex justify-between w-full h-full mt-4">
        <!-- Tarjeta costos / gastos -->
      <div
        class="
          flex flex-col
          bg-fondo-gris-claro
          w-[40%]
          rounded-lg
          px-8
          py-2
          space-y-2
        "
      >
        <!-- Costo interno -->
        <div class="flex space-x-6">
          <div class="w-16 h-14 bg-fondo-gris rounded-md"></div>
          <div class="flex flex-col w-full">
            Costo Interno
            <div class="flex w-full items-end justify-between">
              <span class="text-lg font-semibold">{{
                data.costoInterno.total
              }}</span>
              MXN <button class="hover:underline">Ver Detalles</button>
            </div>
          </div>
        </div>
        <div class="flex space-x-6">
          <div class="w-16 h-14 bg-fondo-gris rounded-md"></div>
          <div class="flex flex-col w-full">
            Costo Externo
            <div class="flex w-full items-end justify-between">
              <span class="text-lg font-semibold">{{
                data.costoExterno.total
              }}</span>
              MXN <button class="hover:underline">Ver Detalles</button>
            </div>
          </div>
        </div>
        <div class="flex space-x-6">
          <div class="w-16 h-14 bg-fondo-gris rounded-md"></div>
          <div class="flex flex-col w-full">
            Gastos
            <div class="flex w-full items-end justify-between">
              <span class="text-lg font-semibold">{{ data.gastos.total }}</span>
              MXN <button class="hover:underline">Ver Detalles</button>
            </div>
          </div>
        </div>
      </div>
      <!-- Fin tarjeta costos/gastos -->
    </div>
  </div>
</template>

<script setup>
import ProyectosFinalizadosDetalleTarjeta from "./ProyectosFinalizadosDetalleTarjeta.vue";

const props = defineProps([
  "data",
  "keyData",
  "rentabilidadFinal",
  "efectividad",
]);
console.log(props.keyData);
</script>