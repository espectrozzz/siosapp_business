<template>
  <div class="flex flex-col w-full h-full px-6 py-6 space-y-6">
    <div class="flex w-full h-[20%]">
      <!-- Tarjeta de proyecto -->
      <div class="flex flex-col w-[40%] items-center w-full">
        <div class="flex flex-col w-[60%] space-y-4">
          <div class="flex justify-center text-lg font-semibold">
            {{ data.nombre }}
          </div>
          <div class="flex justify-between">
            <div class="font-semibold">Fecha de inicio:</div>
            <div>{{ creado }}</div>
          </div>
          <div class="flex justify-between">
            <div class="font-semibold">Estado:</div>
            <div>
              {{ data.estado }}
            </div>
          </div>
        </div>
      </div>
      <!-- Fin tarjeta de proyecto -->
      <div class="flex w-[60%] space-x-[10%] items-center">
        <div class="flex flex-col w-[30%] h-[60%]">
          <label class="text-base" for="iTotal">Ingreso total</label>
          <input
            class="w-full h-full rounded-md bg-fondo-gris border-none"
            type="text"
            id="iTotal"
            :value="iTotal"
            readonly
          />
        </div>
      </div>
    </div>
    <div class="flex flex-col w-full space-y-2">
      <!-- Tarjeta en proceso -->
      <div class="flex w-full space-x-4">
        <div class="flex space-x-2 w-[50%]">
          <div>
            <div class="w-12 h-12 rounded-full bg-fondo-gris"></div>
          </div>
          <div class="flex flex-col">
            <div class="font-semibold">Resultados</div>
            <div class="text-xs">Logros del proyecto</div>
          </div>
        </div>
        <div class="flex space-x-24 justify-center w-[50%]">
          <button
            class="py-2 px-6 min-w-[150px] bg-fondo-gris-claro rounded-lg"
            type="button"
            @click="detalle = detalle ? false : true"
          >
            Detalle
          </button>
          <button
            class="py-2 px-6 min-w-[150px] bg-fondo-gris-claro rounded-lg"
            type="button"
            @click="$store.commit('openModalReabrirProyecto')"
          >
            Reabrir proyecto
          </button>
        </div>
      </div>
    </div>
    <div class="flex w-full">
      <proyectos-finalizados-resumen v-if="!detalle" :data="data" :rentabilidadFinal="rentabilidadFinal" :efectividad="efectividad" />
      <proyectos-finalizados-detalle v-if="detalle" :data="data" :keyData="$route.params.key" :rentabilidadFinal="rentabilidadFinal" :efectividad="efectividad"/>
    </div>
    <modal-reabrir-proyecto :keyData="$route.params.key" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getDatabase, ref as refDB, get, update } from "firebase/database";
import ProyectosFinalizadosResumen from "@/components/ProyectosFinalizadosResumen.vue";
import ProyectosFinalizadosDetalle from "@/components/ProyectosFinalizadosDetalle.vue";
import ModalReabrirProyecto from "@/components/ModalReabrirProyecto.vue";
import { useRoute } from "vue-router";

const database = getDatabase();
const route = useRoute();
const detalle = ref(false);
const data = ref({ nombre: "", rentabilidad: { bruta: 0, neta: 0 } });
const rentabilidadFinal = ref({
  bruta: 0,
  neta: 0,
});
const iTotal = ref(0);
const creado = ref();
const efectividad = ref({
  bruta: 0,
  neta: 0,
});

onMounted(() => {
  get(refDB(database, `proyectos/${route.params.key}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const date = new Date(snapshot.val().creado);
        data.value = snapshot.val();
        iTotal.value = snapshot.val().ingresoTotal.toLocaleString("en", {
          style: "currency",
          currency: "MXN",
        });
        creado.value =
          date.getDate() +
          "/" +
          String(date.getMonth() + 1).padStart(2, "0") +
          "/" +
          date.getFullYear();
      }
    })
    .then(() => {
      get(refDB(database, `avanceProyectos/${route.params.key}`)).then(
        (snapshot) => {
          if (snapshot.exists()) {
            if (snapshot.hasChild("rentabilidad")) {
              if (snapshot.hasChild("rentabilidad/bruta")) {
                rentabilidadFinal.value.bruta =
                  snapshot.val().rentabilidad.bruta;
                  (efectividad.value.bruta = (rentabilidadFinal.value.bruta * 100) / data.value.rentabilidad.bruta).toFixed(2);
              }
              if (snapshot.hasChild("rentabilidad/neta")) {
                rentabilidadFinal.value.neta = snapshot.val().rentabilidad.neta;
                efectividad.value.neta = ((rentabilidadFinal.value.neta * 100) / data.value.rentabilidad.neta).toFixed(2);
                }
            } else {
              efectividad.value.bruta = 100;
              efectividad.value.neta = 100;
            }
          }
        }
      );
    });
});
</script>