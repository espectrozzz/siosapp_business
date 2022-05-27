<template>
    <div class="flex flex-col h-auto w-full min-w-fit">
        <!-- Bienvenida de usuario -->
        <div class="
        flex
        w-full
        justify-center
        items-center
        space-x-4
        py-8
      "
      >
            <!-- ícono -->
            <div>
                <div class="w-14 h-14 rounded-full bg-[#C4C4C4]"></div>
            </div>
            <!-- Rol y nombre de usuario -->
            <div class="flex flex-col">
                <div class="text-xs">Gerente RRHH</div>
                <div>Diana Panfilo</div>
            </div>
        </div>
        <!-- Fin bienvenida de usuario -->

        <!-- Separador -->
        <div class="flex w-full justify-center">
            <div class="bg-[#101D2D] w-[80%] h-0.5 boder rounded-md"></div>
        </div>
        <!-- Fin separador -->

        <!-- Items para navegar -->
        <ul class="flex w-full px-8 mt-8 flex-col space-y-4 font-semibold">
            <li class="flex space-x-4 w-full cursor-pointer">
                <div class="w-6 h-6 rounded-full bg-[#C4C4C4]"></div>
                <div>
                    Home
                </div>
            </li>
            <li class="flex space-x-4 w-full cursor-pointer" @click="$router.push('/proyectos')">
                <div class="w-6 h-6 rounded-full bg-[#C4C4C4]"></div>
                <div>
                    Proyectos
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export { ref } from "vue";

export default {
    setup() { },
};
</script>