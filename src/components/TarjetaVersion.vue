<template>
  <div class="flex flex-col space-y-4 bg-gray-50 w-fit p-2 rounded-md">
    <div class="flex text-2xl font-semibold">
      NOTAS DE LA VERSION {{ version }}
    </div>
    <div class="flex pl-5">
      <ol>
        <li v-for="value in notasVersion" class="mb-4" type="1">
          {{ value.descripcion }}
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { version } from '../../package.json';

const notasVersion = ref([
  {
    descripcion:
      "Este es un lanzamiento BETA, toda la información cargada será eliminada el día del lanzamiento oficial.",
  },
  {
    descripcion:
      "Si tienen problema o sugerencias con la aplicación enviar correo a: desarrollo@iosgs.com",
  },
  {
    descripcion:
      "La aplicación estará en constantes cambios de interfaz (diseño)",
  },
]);
</script>
