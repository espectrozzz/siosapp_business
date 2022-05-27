<template>
    <div class="flex h-full">
        <div class="flex flex-col justify-end h-full">
            <input type="button" class="w-6 h-6 rounded-full bg-[#C4C4C4] cursor-pointer"
                @click="$store.commit('accion')">
        </div>
        <div class="flex w-[70%] items-center">
            <img src="/img/logo.svg" alt="logo_siosapp">
        </div>
        <div class="flex items-center w-[30%] space-x-6 px-8">
            <div class="bg-fondo-gris w-7 h-7 rounded-full"></div>
            <div class="bg-fondo-gris w-7 h-7 rounded-full"></div>
            <div>
                <button class="py-2 px-6 bg-fondo-gris-claro rounded-md" @click="$store.commit('openModalNuevoProyecto')">Nuevo proyecto</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    setup() {

    },
}
</script>