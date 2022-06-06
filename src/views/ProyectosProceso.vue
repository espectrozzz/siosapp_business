<template>
  <div class="flex flex-col w-full h-full px-6 py-6 space-y-6">
    <div class="flex w-full h-[20%]">
      <!-- Tarjeta de proyecto -->
      <div class="flex flex-col w-[40%] items-center w-full">
        <div class="flex flex-col w-[60%] space-y-4">
          <div class="flex justify-center text-lg font-semibold">
            {{ data.val().nombre }}
          </div>
          <div class="flex justify-between">
            <div class="font-semibold">Fecha de inicio:</div>
            <div>{{ creado }}</div>
          </div>
          <div class="flex justify-between">
            <div class="font-semibold">Estado:</div>
            <div>
              {{ data.val().estado }}
            </div>
          </div>
        </div>
      </div>
      <!-- Fin tarjeta de proyecto -->
      <div class="flex w-[60%] space-x-[10%] items-center">
        <div class="flex flex-col w-[30%] h-[60%]">
          <label class="text-base" for="iTotal">Ingreso total</label>
          <input
            class="w-full h-full rounded-md bg-fondo-gris border-none"
            type="text"
            id="iTotal"
            :value="iTotal"
            readonly
          />
        </div>
        <div class="flex flex-col w-[14%] h-[60%]">
          <label
            class="flex w-full justify-center text-lg font-semibold"
            for="iTotal"
            >B</label
          >
          <input
            class="
              w-full
              h-full
              rounded-md
              bg-fondo-gris
              border-none
              text-lg
              font-semibold
            "
            type="text"
            id="rBruta"
            :value="data.val().rentabilidad.bruta + '%'"
            readonly
          />
        </div>
        <div class="flex flex-col w-[14%] h-[60%]">
          <label
            class="flex w-full justify-center text-lg font-semibold"
            for="iTotal"
            >N</label
          >
          <input
            class="
              w-full
              h-full
              rounded-md
              bg-fondo-gris
              border-none
              text-lg
              font-semibold
            "
            type="text"
            id="rNeta"
            :value="data.val().rentabilidad.neta + '%'"
            readonly
          />
        </div>
      </div>
    </div>
    <!-- Componente avance -->
    <div class="flex flex-col w-full space-y-2">
      <!-- Tarjeta en proceso -->
      <div class="flex w-fit space-x-4">
        <div>
          <div class="w-12 h-12 rounded-full bg-fondo-gris"></div>
        </div>
        <div class="flex flex-col">
          <div class="font-semibold">En proceso</div>
          <div class="text-xs">Avance al día del proyecto</div>
        </div>
        <div class="flex justify-center items-center">
          <Popover class="relative">
            <PopoverButton><img class="w-5 h-5" src="/img/menu.svg" alt="menu" /></PopoverButton>

            <PopoverPanel
              class="
                absolute
                z-10
                w-[300px]
                rounded-md
                bg-white
                border-2 border-black
                
              "
            >
              <div class="flex flex-col w-full w-auto h-auto">
                <a
                  class="flex hover:bg-fondo-gris rounded-md cursor-pointer w-full h-7 items-center"
                  @click="[$store.commit('openModalEditarTiempoVolumetria')]"
                  >Editar tiempo/volumetria</a
                >
              </div>
            </PopoverPanel>
          </Popover>
          <modal-editar-tiempo-volumetria :data="data"/>
        </div>
      </div>
      <!-- Fin tarjeta en proceso -->
      <Suspense>
        <proyectos-proceso-avance :data="data" />
      </Suspense>
    </div>
    <div class="flex justify-between w-full h-full">
      <!-- Tarjeta costos / gastos -->
      <div
        class="
          flex flex-col
          bg-fondo-gris-claro
          w-[40%]
          rounded-lg
          px-8
          py-2
          space-y-2
        "
      >
        <div class="flex w-full justify-end">
          <modal-editar-costos-gastos :data="data"/>
          <Popover class="relative">
            <PopoverButton><img src="/img/menu.svg" alt="" /></PopoverButton>

            <PopoverPanel
              class="
                absolute
                z-10
                w-[300px]
                rounded-md
                bg-white
                border-2 border-black
              "
            >
              <div class="flex flex-col h-auto w-auto items-center justify-center">
                <a
                  class="flex p-0.5 hover:bg-fondo-gris rounded-md w-full h-8 cursor-pointer items-center"
                  @click="$store.commit('openModalEditarCostosGastos')"
                  >Editar costos/gastos</a
                >
              </div>
            </PopoverPanel>
          </Popover>
        </div>
        <!-- Costo interno -->
        <div class="flex space-x-6">
          <div class="w-16 h-14 bg-fondo-gris rounded-md"></div>
          <div class="flex flex-col w-full">
            Costo Interno
            <div class="flex w-full items-end justify-between">
              <span class="text-lg font-semibold">{{
                data.val().costoInterno.total
              }}</span>
              MXN <button class="hover:underline">Ver Detalles</button>
            </div>
          </div>
        </div>
        <div class="flex space-x-6">
          <div class="w-16 h-14 bg-fondo-gris rounded-md"></div>
          <div class="flex flex-col w-full">
            Costo Externo
            <div class="flex w-full items-end justify-between">
              <span class="text-lg font-semibold">{{
                data.val().costoExterno.total
              }}</span>
              MXN <button class="hover:underline">Ver Detalles</button>
            </div>
          </div>
        </div>
        <div class="flex space-x-6">
          <div class="w-16 h-14 bg-fondo-gris rounded-md"></div>
          <div class="flex flex-col w-full">
            Gastos
            <div class="flex w-full items-end justify-between">
              <span class="text-lg font-semibold">{{
                data.val().gastos.total
              }}</span>
              MXN <button class="hover:underline">Ver Detalles</button>
            </div>
          </div>
        </div>
      </div>
      <!-- Fin tarjeta costos/gastos -->
      <div class="flex justify-center items-center w-[50%]">
        <button class="p-6 bg-fondo-gris-claro rounded-lg">
          Finalizar y ver resultados
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { getDatabase, ref as refDB, get, child } from "firebase/database";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import ModalEditarTiempoVolumetria from "@/components/ModalEditarTiempoVolumetria.vue";
import ModalEditarCostosGastos from "@/components/ModalEditarCostosGastos.vue";
import ProyectosProcesoAvance from "@/components/ProyectosProcesoAvance.vue";

const database = getDatabase();
const route = useRoute();
const proyectoRef = refDB(database);
const data = ref({
  nombre: "",
});
const creado = ref();
const iTotal = ref();
const diasAvanzados = ref();

get(child(proyectoRef, `proyectos/${route.params.key}`)).then((snapshot) => {
  if (snapshot.exists()) {
    data.value = snapshot;
    const date = new Date(snapshot.val().creado);
    creado.value =
      date.getDate() +
      "/" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "/" +
      date.getFullYear();
    iTotal.value = snapshot.val().ingresoTotal.toLocaleString("en", {
      style: "currency",
      currency: "MXN",
    });
  }
});
</script>