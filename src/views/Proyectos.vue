<template>
  <div class="flex flex-col w-full h-full space-y-14">
    <!-- Nuevos proyectos / pendientes -->
    <div class="flex w-full h-[43%]">
      <div class="w-[12%] text-xl font-semibold min-w-min">
        Agregar nuevo proyecto
      </div>
      <div class="h-full w-[5%]">
        <ProyectoNuevo />
      </div>
      <!-- pendientes -->
      <div class="flex flex-row w-[83%] h-[100%] overflow-auto">
        <div
          class="
            flex
            ,
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
              <proyectos-pestanas-todos :datos="proyectosEnProceso" />
            </div>
          </TabPanel>
          <TabPanel
            ><div class="mt-4">
              <proyectos-pestanas-todos :datos="proyectosEnProceso" />
            </div>
          </TabPanel>
          <TabPanel>
            <div class="mt-4">
              <proyectos-pestanas-todos :datos="proyectosEnProceso" /></div
          ></TabPanel>
          <TabPanel>
            <div class="mt-4">
              <proyectos-pestanas-todos :datos="proyectosEnProceso" /></div
          ></TabPanel>
          <TabPanel>
            <div class="mt-4">
              <proyectos-pestanas-todos :datos="proyectosEnProceso" /></div
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
const snapshotData = ref();
const consulta = ref();

const unidadesNegocio = ref([
  { name: "Todos", disabled: false },
  { name: "Infraestructura", disabled: false },
  { name: "Poliza", disabled: false },
  { name: "Megacable", disabled: false },
  { name: "Ventas", disabled: false },
]);

const listaProyectos = query(proyectosRef, orderByKey());

function cambioPestana(index) {
  proyectosEnProceso.value = [];
  Object.entries(snapshotData.value).forEach(([key, value]) => {
    console.log(value.estado === "En proceso");
    // console.log(value.unidad, unidadesNegocio.value[index].name);
    if (
      (value.estado === "En proceso" &&
        value.unidad === unidadesNegocio.value[index].name) ||
      (value.estado === "En proceso" &&
        unidadesNegocio.value[index].name === "Todos")
    ) {
      console.log("Entró");
      proyectosEnProceso.value.push({
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
console.log("Hola");
</script>