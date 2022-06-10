<template>
  <div class="flex flex-col w-full h-full">
    <!-- Navbar -->
    <div class="w-full h-[13%]">
      <Navbar />
    </div>
    <div class="w-full h-full py-8 mb-12 px-4 overflow-y-auto bg-white">
      <router-view></router-view>
      <ModalNuevoProyecto />
    </div>
    <!-- Fin de Navbar -->
  </div>
</template>

<script>
import Navbar from "@/components/MainNavbar.vue";
import ModalNuevoProyecto from "@/components/ModalNuevoProyecto.vue";
export default {
  components: {
    Navbar,
    ModalNuevoProyecto,
  },
  setup() {},
};
</script>