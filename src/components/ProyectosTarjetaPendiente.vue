<template>
  <div
    class="
      flex flex-col
      w-[100%]
      max-w-[100%]
      min-w-[40%]
      h-full
      bg-fondo-gris-claro
      py-2
      px-4
      rounded-lg
      space-y-2
    "
  >
    <!-- Nombre del proyecto -->
    <div class="flex w-full">
      <div
        class="
          w-[80%]
          h-[50px]
          min-h-[50px]
          break-words
          text-ellipsis
          overflow-hidden
        "
        :title="props.data.val().nombre"
      >
        {{ props.data.val().nombre }}
      </div>
      <div class="flex w-[40%] h-max h-[45%] justify-end">
        <Popover class="relative">
          <PopoverButton><img src="/img/menu.svg" alt="" /></PopoverButton>

          <PopoverPanel
            class="
              absolute
              z-10
              p-2
              w-[300px]
              rounded-md
              bg-white
              border-2 border-black
            "
          >
            <div class="flex flex-col">
              <a
                class="p-0.5 hover:bg-fondo-gris rounded-md cursor-pointer"
                @click="$router.push(`/proyectos/${props.data.key}`)"
                >Agregar información</a
              >
              <a
                class="p-0.5 hover:bg-fondo-gris rounded-md cursor-pointer"
                href="/engagement"
                >Editar proyecto</a
              >
              <a
                class="p-0.5 hover:bg-fondo-gris rounded-md cursor-pointer"
                @click="copy"
                >Copiar enlace del proyecto</a
              >
              <a
                class="p-0.5 hover:bg-fondo-gris rounded-md cursor-pointer"
                @click="$store.commit('openModalEliminarProyecto')"
                >Eliminar proyecto</a
              >
            </div>
          </PopoverPanel>
        </Popover>
      </div>
    </div>
    <!-- separador -->
    <div class="flex w-full h-[80%] justify-start">
      <div class="bg-[#101D2D] w-[80%] h-0.5 boder rounded-md"></div>
    </div>
    <div class="flex justify-between px-4 w-full h-full">
      <div
        class="
          flex
          justify-center
          items-center
          text-3xl
          font-semibold
          bg-fondo-gris
          rounded-md
          w-[40%]
        "
        :class="[costos ? 'bg-green-200' : '']"
      >
        <!-- <span class="bg-fondo-gris w-5 h-5 rounded-full"></span> -->
        C
      </div>
      <div
        class="
          flex
          justify-center
          items-center
          text-3xl
          font-semibold
          bg-fondo-gris
          rounded-md
          w-[40%]
        "
        :class="[gastos ? 'bg-green-200' : '']"
      >
        G
      </div>
    </div>
    <ModalEliminarProyecto :data="props.data"/>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import { useRoute } from "vue-router";
import { getDatabase, ref as refDB } from "@firebase/database";
import ModalEliminarProyecto from "./ModalEliminarProyecto.vue";

const props = defineProps(["data"]);
const route = useRoute();
const costos = ref(false);
const gastos = ref(false);

if (props.data) {
    if(props.data.hasChild('costoInterno') || props.data.hasChild('costoExterno')) costos.value = true
    if(props.data.hasChild('gastos')) gastos.value = true
}

const copy = () => {
  navigator.clipboard.writeText(
    `http://localhost:3000/proyectos/${props.data.key}`
  );
};
</script>