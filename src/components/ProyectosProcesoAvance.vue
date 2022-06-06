<template>
  <div class="flex w-full h-[45%] h-fit">
    <div class="flex flex-col w-[70%]">
      
      <!-- Avance -->
      <div class="flex flex-col w-full h-full">
        <!-- Tiempo -->
        <div class="flex w-full">
          <div class="flex flex-col w-full">
            <!-- Componente -->
            <div
              class="flex w-full justify-between"
              v-if="props.data.val().tiempo"
            >
              
              <div class="flex flex-col w-[70%]">
                <div class="flex w-full justify-between py-1">
                  <div class="flex flex-col w-[28%] h-[60%]">
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
                        :value="props.data.val().tiempo"
                        readonly
                      />
                      <div class="flex justify-center items-end text-lg ml-1">
                        días
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col w-[28%] h-[60%]">
                    <label
                      class="flex w-full justify-start text-base"
                      for="tiempoActual"
                      >A la fecha</label
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
                  <div class="flex flex-col w-[28%] h-[60%]">
                    <label
                      class="flex w-full justify-start text-base"
                      for="iTotal"
                      >Avance</label
                    >
                    <div class="flex w-full">
                      <input
                        v-model="tiempoNuevoAvance"
                        @change="guardar('tiempo')"
                        class="
                          w-full
                          h-full
                          rounded-md
                          bg-fondo-gris
                          border-none
                          text-lg
                          font-semibold
                        "
                        type="number"
                        id="rNeta"
                        min="0"
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
              <div class="flex flex-col w-[25%] h-full justify-center ml-2">
                <div class="text-lg font-semibold">Estado:</div>
                <div>Proyecto en buen camino</div>
              </div>
            </div>
            <!-- Fin componente 1-->
            <!-- Componente 2 -->
            <div
              class="flex w-full justify-between"
              v-for="(volumen, key, index) in props.data.val().volumetrias"
              :key="index"
            >
              <div class="flex flex-col w-[70%]">
                <div class="flex w-full justify-between py-1">
                  <div class="flex flex-col w-[25.5%] h-[60%]">
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
                  <div class="flex flex-col w-[25.5%] h-[60%]">
                    <label
                      class="flex w-full justify-start text-base"
                      :for="`volumetriaActual[${index}]`"
                      >Actuales</label
                    >
                    <div class="flex w-full">
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
                  <div class="flex flex-col w-[28%] h-[60%]">
                    <label
                      class="flex w-full justify-start text-base"
                      :for="`nuevoAvance[${index}]`"
                      >Avance</label
                    >
                    <div class="flex w-full">
                      <input
                        v-model="nuevoAvance[index]"
                        @change="guardar(index)"
                        class="
                          w-full
                          h-full
                          rounded-md
                          bg-fondo-gris
                          border-none
                          text-lg
                          font-semibold
                        "
                        type="number"
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
              <div class="flex flex-col w-[25%] h-full justify-center ml-2">
                <div class="text-lg font-semibold">Estado:</div>
                <div>Proyecto en buen camino</div>
              </div>
            </div>
          </div>
        </div>
        <!-- Volumetría -->
      </div>
    </div>
    <div
      class="
        flex flex-col
        items-center
        justify-center
        font-semibold
        w-[20%]
        h-full
      "
    >
      <div class="text-lg font-semibold mb-4">Rentabilidad</div>
      <div
        class="
          flex flex-col
          w-[80%]
          bg-fondo-gris-claro
          rounded-lg
          p-4
          justify-center
          items-center
          space-y-3
        "
      >
        <div class="flex flex-col w-[60%] h-[60%]">
          <label class="flex w-full justify-start text-base" for="iTotal"
            >Bruta</label
          >
          <input
            class="
              w-full
              h-full
              rounded-md
              bg-fondo-gris
              border-none
              text-lg
              font-semibold
            "
            type="text"
            id="rBruta"
            :value="(rentabilidadAvance.bruta ? rentabilidadAvance.bruta : props.data.val().rentabilidad.bruta) + '%'"
            readonly
          />
        </div>
        <div class="flex flex-col w-[60%] h-[60%]">
          <label class="flex w-full justify-start text-base" for="iTotal"
            >Neta</label
          >
          <input
            class="
              w-full
              h-full
              rounded-md
              bg-fondo-gris
              border-none
              text-lg
              font-semibold
            "
            type="text"
            id="rBruta"
            :value="(rentabilidadAvance.neta ? rentabilidadAvance.neta : props.data.val().rentabilidad.neta) + '%'"
            readonly
          />
        </div>
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

const props = defineProps(["data"]);
const tiempoAvance = ref(0);
const tiempoNuevoAvance = ref(0);
const tiempoPorcentaje = ref(0);
const database = getDatabase();
const refAvance = refDB(database);
const porcentaje = ref([]);
const avance = ref([]);
const nuevoAvance = ref([]);
const sumaAvance = ref(0);
const rentabilidadAvance = ref({
  bruta:  null,
  neta: null,
})

const guardar = (index) => {
  get(child(refAvance, `avanceProyectos/${props.data.key}`)).then(
    (snapshot) => {
      if (index != "tiempo") {
        // Actualizar las volumetrías
        if (
          snapshot.hasChild(
            `volumetrias/${Object.keys(props.data.val().volumetrias)[index]}`
          )
        ) {
          sumaAvance.value =
            snapshot.val().volumetrias[
              Object.keys(props.data.val().volumetrias)[index]
            ].avance + nuevoAvance.value[index];
        } else sumaAvance.value = nuevoAvance.value[index];
        update(
          refDB(
            database,
            `avanceProyectos/${props.data.key}/volumetrias/${
              Object.keys(props.data.val().volumetrias)[index]
            }`
          ),
          {
            avance: sumaAvance.value,
          }
        ).then(() => {
          porcentaje.value[index] =
            ((sumaAvance.value /
              Object.values(props.data.val().volumetrias)[index].cantidad) *
            100).toFixed(2);
          avance.value[index] = sumaAvance.value;
          nuevoAvance.value[index] = 0;
        });
        // Actualizar el tiempo
      } else {
        if (snapshot.hasChild("tiempo")) {
          sumaAvance.value = tiempoNuevoAvance.value + snapshot.val().tiempo;
        } else {
          sumaAvance.value = tiempoNuevoAvance.value;
        }
        update(refDB(database, `avanceProyectos/${props.data.key}`), {
          tiempo: sumaAvance.value,
        }).then(() => {
          tiempoPorcentaje.value = 
            ((sumaAvance.value / props.data.val().tiempo) * 100).toFixed(2);
          tiempoAvance.value = sumaAvance.value;
          tiempoNuevoAvance.value = 0;
        });
      }
    }
  );
};

if (props.data.val().volumetrias)
for (const element in props.data.val().volumetrias) {
  nuevoAvance.value.push(0);
}

await get(child(refAvance, `avanceProyectos/${props.data.key}`)).then(
  (snapshot) => {
    if (snapshot.exists()) {
      var i = 0;
      if (snapshot.hasChild("volumetrias")) {
        Object.values(snapshot.val().volumetrias).forEach((element) => {
          avance.value.push(element.avance);
          porcentaje.value[i] =
            ((element.avance /
              Object.values(props.data.val().volumetrias)[i].cantidad) *
            100).toFixed(2);
          i++;
        });
      }
      if (snapshot.hasChild("tiempo")) {
        tiempoAvance.value = snapshot.val().tiempo;
        tiempoPorcentaje.value = ((snapshot.val().tiempo / props.data.val().tiempo) * 100).toFixed(2);
      }
    } else {
      for (const element in props.data.val().volumetrias) {
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