<template>
  <div class="flex flex-col w-full bg-white h-[50%]">
    <div class="w-[100%] text-xl font-semibold min-w-min">
      En proceso
    </div>
    <!-- En proceso -->
    <div class="flex flex-row w-full h-full overflow-auto">
      <div
        class="flex w-[400px] h-full py-2 px-4 overflow-hidden"
        v-for="(item, index) in props.datos"
        :key="index"
      >
        <proyecto-tarjeta-en-proceso :data="item" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUpdate } from "vue";
import { useStore } from "vuex";
import ProyectoTarjetaEnProceso from "@/components/ProyectoTarjetaEnProceso.vue";

const props = defineProps(["datos"]);

</script>