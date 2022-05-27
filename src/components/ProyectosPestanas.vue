<template>
  <TabGroup>
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
      <TabPanel></TabPanel>
      <TabPanel><proyectos-pestanas-todos :datos="props.datos" /></TabPanel>
      <TabPanel>Content 3</TabPanel>
    </TabPanels>
  </TabGroup>
</template>

<script setup>
import { ref, onMounted, onBeforeMount } from "vue";
import ProyectosPestanasTodos from "./ProyectosPestanasTodos.vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";

const props = defineProps(["datos"]);

const unidadesNegocio = ref([
  { name: "Todos", disabled: false },
  { name: "Infraestructura", disabled: false },
  { name: "Poliza", disabled: false },
  { name: "Megacable", disabled: false },
  { name: "Ventas", disabled: false },
]);
</script>