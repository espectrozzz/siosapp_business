<template>
  <div class="flex h-full w-full flex-col space-y-6 px-6 py-6">
    <div class="flex h-[20%] w-full">
      <!-- Tarjeta de proyecto -->
      <div class="flex w-[40%] w-full flex-col items-center">
        <div class="flex w-[60%] flex-col space-y-4">
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
      <div class="flex w-[60%] items-center space-x-[10%]">
        <div class="flex w-[30%] flex-col space-y-4">
          <div class="flex h-[60%] w-full flex-col">
            <label class="text-base font-semibold" for="iTotal"
              >Ingreso {{ $store.state.b.ingresoFinal == 'MX$0.00' ? 'final' : 'esperado' }}</label
            >
            <input
              class="h-full w-full rounded-md border-none bg-fondo-gris"
              type="text"
              id="iTotal"
              :value="iTotal"
              readonly
            />
          </div>
          <TransitionRoot
            appear
            :show="$store.state.b.ingresoFinal != 'MX$0.00'"
            enter="transition-opacity duration-500"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="transition-opacity duration-500"
            leave-from="opacity-100"
            leave-to="opacity-0"
            :class="$store.state.b.ingresoFinal != 'MX$0.00' ? '' : 'absolute'"
          >
            <div class="flex h-[60%] w-full flex-col">
              <label class="text-base font-semibold" for="iTotal"
                >Ingreso final</label
              >
              <input
                class="h-full w-full rounded-md border-none bg-fondo-gris"
                type="text"
                id="iTotal"
                :value="$store.state.b.ingresoFinal"
                readonly
              />
            </div>
          </TransitionRoot>
        </div>

        <div class="flex h-[60%] w-[14%] flex-col">
          <label
            class="flex w-full justify-center text-lg font-semibold"
            for="iTotal"
            >B</label
          >
          <input
            class="h-full w-full rounded-md border-none bg-fondo-gris text-lg font-semibold"
            type="text"
            id="rBruta"
            :value="data.val().rentabilidad.bruta + '%'"
            readonly
          />
        </div>
        <div class="flex h-[60%] w-[14%] flex-col">
          <label
            class="flex w-full justify-center text-lg font-semibold"
            for="iTotal"
            >N</label
          >
          <input
            class="h-full w-full rounded-md border-none bg-fondo-gris text-lg font-semibold"
            type="text"
            id="rNeta"
            :value="data.val().rentabilidad.neta + '%'"
            readonly
          />
        </div>
      </div>
    </div>
    <!-- Componente avance -->
    <div class="flex w-full flex-col space-y-2">
      <!-- Tarjeta en proceso -->
      <div class="flex w-fit space-x-4">
        <div>
          <div class="h-12 w-12 rounded-full bg-fondo-gris"></div>
        </div>
        <div class="flex flex-col">
          <div class="font-semibold">En proceso</div>
          <div class="text-xs">Avance al día del proyecto</div>
        </div>
        <div class="flex items-center justify-center">
          <Popover class="relative">
            <PopoverButton
              ><img class="h-5 w-5" src="/img/menu.svg" alt="menu"
            /></PopoverButton>

            <PopoverPanel
              class="absolute z-10 w-[300px] rounded-md border-2 border-black bg-white"
            >
              <div class="flex h-auto w-full w-auto flex-col">
                <a
                  class="flex h-7 w-full cursor-pointer items-center rounded-md hover:bg-fondo-gris"
                  @click="[$store.commit('openModalEditarTiempoVolumetria')]"
                  >Editar tiempo/volumetria</a
                >
              </div>
            </PopoverPanel>
          </Popover>
          <modal-editar-tiempo-volumetria :data="data" />
        </div>
      </div>
      <!-- Fin tarjeta en proceso -->
      <Suspense>
        <proyectos-proceso-avance :data="data" />
      </Suspense>
    </div>
    <div class="flex h-full w-full justify-between">
      <!-- Tarjeta costos / gastos -->
      <div
        class="flex w-[40%] flex-col space-y-2 rounded-lg bg-fondo-gris-claro px-8 py-2"
      >
        <div class="flex w-full justify-end">
          <modal-editar-costos-gastos :data="data" />
          <Popover class="relative">
            <PopoverButton><img src="/img/menu.svg" alt="" /></PopoverButton>

            <PopoverPanel
              class="absolute z-10 w-[300px] rounded-md border-2 border-black bg-white"
            >
              <div
                class="flex h-auto w-auto flex-col items-center justify-center"
              >
                <a
                  class="flex h-8 w-full cursor-pointer items-center rounded-md p-0.5 hover:bg-fondo-gris"
                  @click="$store.commit('openModalEditarCostosGastos')"
                  >Editar costos/gastos</a
                >
              </div>
            </PopoverPanel>
          </Popover>
        </div>
        <!-- Costo interno -->
        <div class="flex space-x-6" v-if="data.val().costoInterno">
          <div class="h-14 w-16 rounded-md bg-fondo-gris"></div>
          <div class="flex w-full flex-col">
            Costo Interno
            <div class="flex w-full items-end justify-between">
              <span class="text-lg font-semibold">{{
                data.val().costoInterno.total
              }}</span>
              MXN <button class="hover:underline">Ver Detalles</button>
            </div>
          </div>
        </div>
        <div class="flex space-x-6" v-if="data.val().costoExterno">
          <div class="h-14 w-16 rounded-md bg-fondo-gris"></div>
          <div class="flex w-full flex-col">
            Costo Externo
            <div class="flex w-full items-end justify-between">
              <span class="text-lg font-semibold">{{
                data.val().costoExterno.total
              }}</span>
              MXN <button class="hover:underline">Ver Detalles</button>
            </div>
          </div>
        </div>
        <div class="flex space-x-6" v-if="data.val().gastos">
          <div class="h-14 w-16 rounded-md bg-fondo-gris"></div>
          <div class="flex w-full flex-col">
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
      <div class="flex w-[50%] items-center justify-center">
        <button
          class="rounded-lg bg-fondo-gris-claro p-6"
          type="button"
          @click="$store.commit('openModalFinalizarProyecto')"
        >
          Finalizar y ver resultados
        </button>
      </div>
      <modal-finalizar-proyectos :data="data" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { getDatabase, ref as refDB, get, child } from "firebase/database";
import ModalFinalizarProyectos from "@/components/ModalFinalizarProyectos.vue";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import ModalEditarTiempoVolumetria from "@/components/ModalEditarTiempoVolumetria.vue";
import ModalEditarCostosGastos from "@/components/ModalEditarCostosGastos.vue";
import ProyectosProcesoAvance from "@/components/ProyectosProcesoAvance.vue";
import { TransitionRoot } from "@headlessui/vue";

const database = getDatabase();
const route = useRoute();
const proyectoRef = refDB(database);
const data = ref({
  nombre: "",
});
const creado = ref();
const iTotal = ref();
const diasAvanzados = ref();
const key = ref();

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
