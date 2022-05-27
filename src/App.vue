<script setup>
import { ref } from "vue";
import Sidebar from './components/Sidebar.vue';
import MainContainer from './components/Main.vue';
import { useStore } from 'vuex';
const store = useStore();
</script>

<template>
  <div class="flex w-full h-screen">
    <div class="bg-fondo-gris-claro h-full transition-all duration-500 rounded-r-3xl" :class="[$store.state.a.open ? 'w-[18%]' : 'w-[0%]']">
      <Sidebar />
    </div>
    <div class="bg-white w-full h-full"> <MainContainer /> </div>
  </div>
</template>
