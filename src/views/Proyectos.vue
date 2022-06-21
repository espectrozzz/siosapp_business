<template>
  <div class="flex flex-col w-full h-full space-y-14">
    <!-- Nuevos proyectos / pendientes -->
    <div class="flex w-full h-[32%] min-h-[32%]">
      <div class="w-[12%] text-xl font-semibold min-w-min">
        Agregar nuevo proyecto
      </div>
      <div class="h-full w-[5%]">
        <ProyectoNuevo />
      </div>
      <!-- pendientes -->
      <div class="scroll-barra flex flex-row w-[83%] h-[100%] overflow-auto snap-x scroll-auto cursor-pointer select-none">
        <div
          class="
            flex
            snap-start
            ProyectoTarjetaEnProceso
            w-[20%]
            min-w-[20%]
            max-w-[40%]
            h-full
            space-x-none
            py-2
            px-4
          "
          v-for="(item, index) in proyectosPendientes"
          :key="index"
        >

          <proyectos-tarjeta-pendiente-vue :data="item" />
        </div>
      </div>
    </div>
    <!-- Fin nuevos proyectos / pendientes -->
    <!-- Pestañas -->
    <div class="flex flex-col bg-white w-full h-full">
      <TabGroup @change="cambioPestana">
        <TabList class="border-b-2">
          <Tab
            v-slot="{ selected }"
            as="template"
            v-for="item in unidadesNegocio"
            :key="item"
            ><button
              class="px-14 py-2 bg-white border-b-2"
              :class="[selected ? 'border-black font-semibold' : 'border-none']"
            >
              {{ item.name }}
            </button></Tab
          >
        </TabList>
        <TabPanels>
          <TabPanel>
            <div class="mt-4">
              <proyectos-pestanas-todos :enProceso="proyectosEnProceso" :finalizados="proyectosFinalizados"/>
            </div>
          </TabPanel>
          <TabPanel
            ><div class="mt-4">
              <proyectos-pestanas-todos
                :enProceso="proyectosEnProceso"
                :finalizados="proyectosFinalizados"
              />
            </div>
          </TabPanel>
          <TabPanel>
            <div class="mt-4">
              <proyectos-pestanas-todos
                :enProceso="proyectosEnProceso"
                :finalizados="proyectosFinalizados"
              /></div
          ></TabPanel>
          <TabPanel>
            <div class="mt-4">
              <proyectos-pestanas-todos
                :enProceso="proyectosEnProceso"
                :finalizados="proyectosFinalizados"
              /></div
          ></TabPanel>
          <TabPanel>
            <div class="mt-4">
              <proyectos-pestanas-todos
                :enProceso="proyectosEnProceso"
                :finalizados="proyectosFinalizados"
              /></div
          ></TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
    <!-- Fin de proyectos en proceso -->
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import { useStore } from "vuex";
import ProyectoNuevo from "@/components/ProyectosNuevo.vue";
import ProyectosTarjetaPendienteVue from "@/components/ProyectosTarjetaPendiente.vue";
import ProyectosPestanas from "@/components/ProyectosPestanas.vue";
import ProyectosPestanasTodos from "@/components/ProyectosPestanasTodos.vue";
import ProyectoTarjetaEnProceso from "@/components/ProyectoTarjetaEnProceso.vue";
import {
  getDatabase,
  ref as refDB,
  onValue,
  orderByChild,
  query,
  limitToLast,
  get,
  orderByKey,
} from "@firebase/database";
import { async } from "@firebase/util";

const database = getDatabase();
const store = useStore();
const proyectosRef = refDB(database, "proyectos");
const proyectosPendientes = ref([]);
const proyectosEnProceso = ref([]);
const proyectosFinalizados = ref([]);
const snapshotData = ref();
const consulta = ref();

const unidadesNegocio = ref([
  { name: "Todos", disabled: false },
  { name: "Infraestructura", disabled: false },
  { name: "Poliza", disabled: false },
  { name: "Megacable", disabled: false },
  { name: "Ventas", disabled: false },
]);

const drag = () => {
  alert("Hola");
}

const listaProyectos = query(proyectosRef, orderByKey());

function cambioPestana(index) {
  proyectosEnProceso.value = [];
  proyectosFinalizados.value = [];

  Object.entries(snapshotData.value).forEach(([key, value]) => {
    // En proceso
    if (
      (value.estado === "En proceso" &&
        value.unidad === unidadesNegocio.value[index].name) ||
      (value.estado === "En proceso" &&
        unidadesNegocio.value[index].name === "Todos")
    ) {
      proyectosEnProceso.value.push({
        key: key,
        value: value,
      });
    }
    // Finalizados
    if (
      (value.estado === "Finalizado" &&
        value.unidad === unidadesNegocio.value[index].name) ||
      (value.estado === "Finalizado" &&
        unidadesNegocio.value[index].name === "Todos")
    ) {
      proyectosFinalizados.value.push({
        key: key,
        value: value,
      });
    }
  });
}

get(listaProyectos).then((snapshot) => {
  snapshot.forEach((dataSnapshot) => {
    if (dataSnapshot.val().estado === "Pendiente de información") {
      proyectosPendientes.value.push(dataSnapshot);
    }
  });
  // store.commit("queryResult", snapshot.val());
  snapshotData.value = snapshot.val();
  cambioPestana(0);
});
</script>

<style>
.scroll-barra::-webkit-scrollbar{
  height: 8px;
}
 /* Estilos barra (thumb) de scroll */
.scroll-barra::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 4px;
}

.scroll-barra::-webkit-scrollbar-thumb:active {
  background-color: #999999;
}

.scroll-barra::-webkit-scrollbar-thumb:hover {
  background: #b3b3b3;
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
}

 /* Estilos track de scroll */
.scroll-barra::-webkit-scrollbar-track {
  background: #e1e1e1;
  border-radius: 4px;
}

.scroll-barra::-webkit-scrollbar-track:hover, 
.scroll-barra::-webkit-scrollbar-track:active {
  background: #d4d4d4;
}
</style>

