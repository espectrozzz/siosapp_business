<template>
    <div class="flex w-full justify-around h-[45%] h-fit">
    <div class="flex flex-col w-full">
      
      <!-- Avance -->
      <div class="flex flex-col w-full h-full">
        <!-- Tiempo -->
        <div class="flex w-full">
          <div class="flex flex-col w-full">
            <!-- Componente -->
            <div
              class="flex w-full justify-between"
              v-if="props.data.tiempo"
            >
              
              <div class="flex flex-col w-full">
                <div class="flex w-full justify-between py-1">
                  <div class="flex flex-col w-[38%] h-[60%]">
                    <label
                      class="flex w-full justify-start text-base"
                      for="tiempoTotal"
                      >Tiempo total</label
                    >
                    <div class="flex w-full">
                      <input
                        class="
                          w-full
                          h-full
                          rounded-md
                          text-center
                          bg-fondo-gris
                          border-none
                          text-lg
                          font-semibold
                        "
                        type="text"
                        id="tiempoTotal"
                        :value="props.data.tiempo"
                        readonly
                      />
                      <div class="flex justify-center items-end text-lg ml-1">
                        días
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col w-[38%] h-[60%]">
                    <label
                      class="flex w-full justify-start text-base"
                      for="tiempoActual"
                      >Realizado/s</label
                    >
                    <div class="flex w-full">
                      <input
                        class="
                          w-full
                          h-full
                          rounded-md
                          bg-fondo-gris
                          text-center
                          border-none
                          text-lg
                          font-semibold
                        "
                        type="text"
                        id="tiempoActual"
                        :value="tiempoAvance"
                        readonly
                      />
                      <div class="flex justify-center items-end text-lg ml-1">
                        días
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Progress bar-->
                <div class="flex flex-col w-full">
                  <div class="flex justify-between w-full mb-1">
                    <span class="text-base">Progreso</span>
                    <span class="text-sm font-medium"
                      >{{ tiempoPorcentaje }}%</span
                    >
                  </div>
                  <div
                    class="
                      w-full
                      bg-gray-200
                      rounded-full
                      h-2.5
                      dark:bg-gray-700
                    "
                  >
                    <div
                      class="bg-fondo-gris h-2.5 rounded-full"
                      :style="`width: ${tiempoPorcentaje}%`"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Fin componente 1-->
            <!-- Componente 2 -->
            <div
              class="flex w-full justify-between"
              v-for="(volumen, key, index) in props.data.volumetrias"
              :key="index"
            >
              <div class="flex flex-col w-full">
                <div class="flex w-full justify-between py-1">
                  <div class="flex flex-col w-[38%] h-[60%]">
                    <label
                      class="flex w-full justify-start text-base"
                      for="tiempoTotal"
                      >{{ volumen.unidad }} total {{ key }}</label
                    >
                    <div class="flex w-full">
                      <input
                        class="
                          w-full
                          h-full
                          rounded-md
                          text-center
                          bg-fondo-gris
                          border-none
                          text-lg
                          font-semibold
                        "
                        type="text"
                        id="tiempoTotal"
                        :value="volumen.cantidad"
                        readonly
                      />
                      <div class="flex justify-center items-end text-lg ml-1">
                        {{ volumen.unidad }}
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col w-[38%]  h-[60%]">
                    <label
                      class="flex w-full justify-start text-base"
                      :for="`volumetriaActual[${index}]`"
                      >Realizado/s</label
                    >
                    <div class="flex">
                      <input
                        v-model="avance[index]"
                        class="
                          w-full
                          h-full
                          rounded-md
                          bg-fondo-gris
                          text-center
                          border-none
                          text-lg
                          font-semibold
                        "
                        type="text"
                        :id="`volumetriaActual[${index}]`"
                        readonly
                      />
                      <div class="flex justify-center items-end text-lg ml-1">
                        {{ volumen.unidad }}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Progress bar-->
                <div class="flex flex-col w-full overflow-hidden">
                  <div class="flex justify-between w-full mb-1">
                    <span class="text-base">Progreso</span>
                    <span class="text-sm font-medium"
                      >{{ porcentaje[index] }}%</span
                    >
                  </div>
                  <div
                    class="
                      w-full
                      bg-gray-200
                      rounded-full
                      h-2.5
                      dark:bg-gray-700
                    "
                  >
                    <div
                      class="
                        bg-fondo-gris
                        h-2.5
                        rounded-full
                        transition-all
                        duration-500
                      "
                      :style="`width: ${porcentaje[index]}%`"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Volumetría -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import {
  getDatabase,
  ref as refDB,
  set,
  child,
  get,
  update,
} from "firebase/database";

const props = defineProps(['data', 'keyData']);
const tiempoAvance = ref(0);
const tiempoNuevoAvance = ref(0);
const tiempoPorcentaje = ref(0);
const database = getDatabase();
const refAvance = refDB(database);
const porcentaje = ref([]);
const avance = ref([]);
const sumaAvance = ref(0);
const rentabilidadAvance = ref({
  bruta:  null,
  neta: null,
})



await get(child(refAvance, `avanceProyectos/${props.keyData}`)).then(
  (snapshot) => {
    if (snapshot.exists()) {
      var i = 0;
      if (snapshot.hasChild("volumetrias")) {
        Object.values(snapshot.val().volumetrias).forEach((element) => {
          avance.value.push(element.avance);
          porcentaje.value[i] =
            ((element.avance /
              Object.values(props.data.volumetrias)[i].cantidad) *
            100).toFixed(2);
          i++;
        });
      }
      if (snapshot.hasChild("tiempo")) {
        tiempoAvance.value = snapshot.val().tiempo;
        tiempoPorcentaje.value = ((snapshot.val().tiempo / props.data.tiempo) * 100).toFixed(2);
      }
    } else {
      for (const element in props.data.volumetrias) {
        avance.value.push(0);
        porcentaje.value.push(0);
      }
    }
    if(snapshot.hasChild("rentabilidad")) {
      rentabilidadAvance.value.bruta = snapshot.val().rentabilidad.bruta;
      rentabilidadAvance.value.neta = snapshot.val().rentabilidad.neta;
    }
  }
);
</script>