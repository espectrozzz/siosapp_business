<script setup>
import { ref } from "vue";
import Sidebar from './components/Sidebar.vue';
import MainContainer from './components/Main.vue';
import { useStore } from 'vuex';
const store = useStore();
</script>

<template>
  <div class="flex w-full h-screen">
    <div class="bg-white border h-full transition-all ease-in duration-300 rounded-r-3xl " :class="[$store.state.a.open ? 'w-[18%] z-40 shadow-right' : 'w-[0%]']">
      <Sidebar />
    </div>
    <div class="bg-white w-full h-full"> <MainContainer /> </div>
  </div>
</template>
