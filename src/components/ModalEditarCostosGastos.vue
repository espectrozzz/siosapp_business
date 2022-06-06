<template>
  <TransitionRoot
    appear
    :show="$store.state.b.isOpenModalEditarCostosGastos"
    as="template"
  >
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>
      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="
                w-full
                max-w-lg
                transform
                rounded-2xl
                bg-white
                p-6
                text-left
                align-middle
                shadow-xl
                transition-all
              "
            >
              <DialogTitle
                as="h3"
                class="flex text-lg font-medium leading-6 text-gray-900"
              >
                <div class="w-[95%] font-semibold text-2xl">
                  {{ props.data.val().nombre }}
                </div>
                <div class="w-[5%]">
                  <div class="w-5 h-5 bg-fondo-gris rounded-full"></div>
                </div>
              </DialogTitle>
              <div class="mt-2">
                <div class="flex flex-col bg-white w-full h-full">
                  <TabGroup>
                    <TabList class="border-b-2">
                      <Tab v-slot="{ selected }" as="template"
                        ><button
                          class="px-7 text-gray-400 py-2 bg-white border-b-2"
                          :class="[
                            selected
                              ? 'border-black font-semibold'
                              : 'border-none',
                          ]"
                        >
                          Costo Interno
                        </button></Tab
                      >
                      <Tab v-slot="{ selected }" as="template"
                        ><button
                          class="px-7 text-gray-400 py-2 bg-white border-b-2"
                          :class="[
                            selected
                              ? 'border-black font-semibold'
                              : 'border-none',
                          ]"
                        >
                          Costo Externo
                        </button></Tab
                      >
                      <Tab v-slot="{ selected }" as="template"
                        ><button
                          class="px-7 text-gray-400 py-2 bg-white border-b-2"
                          :class="[
                            selected
                              ? 'border-black font-semibold'
                              : 'border-none',
                          ]"
                        >
                          Gastos
                        </button></Tab
                      >
                    </TabList>
                    <TabPanels>
                      <!-- Costo interno -->
                      <TabPanel>
                        <div class="flex flex-col w-full space-y-6 mt-4">
                          <div class="flex flex-col w-full">
                            <label
                              class="text-sm font-semibold mb-1"
                              for="costoInternoMaterial"
                              >Material</label
                            >
                            <input
                              v-model="costoInterno.material"
                              class="
                                w-full
                                rounded-md
                                bg-fondo-gris-claro
                                border-none
                              "
                              type="number"
                              id="costoInternoMaterial"
                              min="0"
                            />
                          </div>
                          <div class="flex flex-col w-full">
                            <label
                              class="text-sm font-semibold mb-1"
                              for="costoInternoManoObra"
                              >Mano de obra</label
                            >
                            <input
                              v-model="costoInterno.manoObra"
                              class="
                                w-full
                                rounded-md
                                bg-fondo-gris-claro
                                border-none
                              "
                              type="number"
                              id="costoInternoManoObra"
                              min="0"
                            />
                          </div>
                        </div>
                      </TabPanel>
                      <!-- Fin costo interno -->
                      <!-- Costo externo -->
                      <TabPanel
                        ><div class="flex flex-col w-full space-y-6 mt-4">
                          <div class="flex flex-col w-full">
                            <label
                              class="text-sm font-semibold mb-1"
                              for="costoExternoMaterial"
                              >Material</label
                            >
                            <input
                              v-model="costoExterno.material"
                              class="
                                w-full
                                rounded-md
                                bg-fondo-gris-claro
                                border-none
                              "
                              type="number"
                              id="costoExternoMaterial"
                              min="0"
                            />
                          </div>
                          <div class="flex flex-col w-full">
                            <label
                              class="text-sm font-semibold mb-1"
                              for="costoExternoManoObra"
                              >Mano de obra</label
                            >
                            <input
                              v-model="costoExterno.manoObra"
                              class="
                                w-full
                                rounded-md
                                bg-fondo-gris-claro
                                border-none
                              "
                              type="number"
                              id="costoExternoManoObra"
                              min="0"
                            />
                          </div>
                        </div>
                      </TabPanel>
                      <!-- Fin costo externo -->
                      <!-- gastos -->
                      <TabPanel>
                        <div class="mt-4">
                          <div class="flex flex-col w-full space-y-6 mt-4">
                            <div class="flex flex-col w-full">
                              <label
                                class="text-sm font-semibold mb-1"
                                for="gastoFijo"
                                >Fijo</label
                              >
                              <input
                                v-model="gastos.fijo"
                                class="
                                  w-full
                                  rounded-md
                                  bg-fondo-gris-claro
                                  border-none
                                "
                                type="number"
                                id="gastoFijo"
                                min="0"
                              />
                            </div>
                            <div class="flex flex-col w-full">
                              <label
                                class="text-sm font-semibold mb-1"
                                for="gastoNomina"
                                >Nómina</label
                              >
                              <input
                                v-model="gastos.nomina"
                                class="
                                  w-full
                                  rounded-md
                                  bg-fondo-gris-claro
                                  border-none
                                "
                                type="number"
                                id="gastoNomina"
                                min="0"
                              />
                            </div>
                            <div class="flex flex-col w-full">
                              <label
                                class="text-sm font-semibold mb-1"
                                for="gastoVariable"
                                >Variable</label
                              >
                              <input
                                v-model="gastos.variable"
                                class="
                                  w-full
                                  rounded-md
                                  bg-fondo-gris-claro
                                  border-none
                                "
                                type="number"
                                id="gastoVariable"
                                min="0"
                              />
                            </div>
                            <div class="flex flex-col w-full">
                              <label
                                class="text-sm font-semibold mb-1"
                                for="gastoOtros"
                                >Otros</label
                              >
                              <input
                                v-model="gastos.otros"
                                class="
                                  w-full
                                  rounded-md
                                  bg-fondo-gris-claro
                                  border-none
                                "
                                type="number"
                                id="gastoOtros"
                                min="0"
                              />
                            </div>
                          </div></div
                      ></TabPanel>
                      <!-- Fin gastos -->
                    </TabPanels>
                  </TabGroup>
                  <div
                    class="
                      flex
                      w-full
                      justify-center
                      items-center
                      space-x-8
                      mt-8
                    "
                  >
                    <button
                      type="button"
                      class="
                        inline-flex
                        justify-center
                        rounded-md
                        border border-transparent
                        bg-blue-100
                        px-4
                        py-2
                        text-sm
                        font-medium
                        text-blue-900
                        hover:bg-blue-200
                        focus:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-blue-500
                        focus-visible:ring-offset-2
                      "
                      @click="$store.commit('closeModalEditarCostosGastos')"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      @click="guardar"
                      class="
                        inline-flex
                        justify-center
                        rounded-md
                        border border-transparent
                        bg-blue-100
                        px-4
                        py-2
                        text-sm
                        font-medium
                        text-blue-900
                        hover:bg-blue-200
                        focus:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-blue-500
                        focus-visible:ring-offset-2
                      "
                    >
                      Guardar
                    </button>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ModalNuevoProyectoVolumen from "./ModalNuevoProyectoVolumen.vue";
import { getDatabase, ref as refDB, update } from "firebase/database";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const props = defineProps(["data"]);
const database = getDatabase();
const store = useStore();
const router = useRouter();
const costoInterno = ref({
  material: 0,
  manoObra: 0,
});
const costoExterno = ref({
  material: 0,
  manoObra: 0,
});
const gastos = ref({
  fijo: 0,
  nomina: 0,
  variable: 0,
  otros: 0,
});

const guardar = () => {
  update(refDB(database, `proyectos/${props.data.key}`), {
    costoExterno: {
      manoDeObra: costoExterno.value.manoObra
        ? costoExterno.value.manoObra
        : null,
      material: costoExterno.value.material
        ? costoExterno.value.material
        : null,
      total:
        costoExterno.value.manoObra || costoExterno.value.material
          ? (
              costoExterno.value.manoObra + costoExterno.value.material
            ).toLocaleString("en")
          : null,
    },
    costoInterno: {
      manoDeObra: costoInterno.value.manoObra
        ? costoInterno.value.manoObra
        : null,
      material: costoInterno.value.material
        ? costoInterno.value.material
        : null,
      total:
        costoInterno.manoDeObra || costoInterno.value.material
          ? (
              costoInterno.value.manoObra + costoInterno.value.material
            ).toLocaleString("en")
          : null,
    },
    gastos: {
      fijo: gastos.value.fijo ? gastos.value.fijo : null,
      nomina: gastos.value.nomina ? gastos.value.nomina : null,
      variable: gastos.value.variable ? gastos.value.variable : null,
      otros: gastos.value.otros ? gastos.value.otros : null,
      total:
        gastos.value.fijo ||
        gastos.value.nomina ||
        gastos.value.otros ||
        gastos.value.variable
          ? (
              gastos.value.fijo +
              gastos.value.nomina +
              gastos.value.variable +
              gastos.value.otros
            ).toLocaleString("en")
          : null,
    },
  }).then(() => {
    update(refDB(database, `avanceProyectos/${props.data.key}`), {
      rentabilidad: {
        bruta: (
          (1 -
            (costoExterno.value.manoObra +
              costoExterno.value.material +
              (costoInterno.value.manoObra + costoInterno.value.material)) /
              props.data.val().ingresoTotal) *
          100
        ).toFixed(2),
        neta: (
          (1 -
            (costoExterno.value.manoObra +
              costoExterno.value.material +
              (costoInterno.value.manoObra + costoInterno.value.material) +
              (gastos.value.fijo +
                gastos.value.nomina +
                gastos.value.otros +
                gastos.value.variable)) /
              props.data.val().ingresoTotal) *
          100
        ).toFixed(2),
      },
    });
    router.go(0);
  });
};

onMounted(() => {
  // Costo interno
  if (props.data.val().costoInterno) {
    Object.keys(props.data.val().costoInterno).forEach((element, index) => {
      if (element == "manoDeObra")
        costoInterno.value.manoObra = Object.values(
          props.data.val().costoInterno
        )[index];
      if (element == "material")
        costoInterno.value.material = Object.values(
          props.data.val().costoInterno
        )[index];
    });
  }
  //   Costo externo
  if (props.data.val().costoExterno) {
    Object.keys(props.data.val().costoExterno).forEach((element, index) => {
      if (element == "manoDeObra")
        costoExterno.value.manoObra = Object.values(
          props.data.val().costoExterno
        )[index];
      if (element == "material")
        costoExterno.value.material = Object.values(
          props.data.val().costoExterno
        )[index];
    });
  }
  //   gastos
  if (props.data.val().gastos) {
    Object.keys(props.data.val().gastos).forEach((element, index) => {
      if (element == "fijo")
        gastos.value.fijo = Object.values(props.data.val().gastos)[index];
      if (element == "nomina")
        gastos.value.nomina = Object.values(props.data.val().gastos)[index];
      if (element == "variable")
        gastos.value.variable = Object.values(props.data.val().gastos)[index];
      if (element == "otros")
        gastos.value.otros = Object.values(props.data.val().gastos)[index];
    });
  }
});

const closeModal = () => {
  store.commit("closeModalEditarCostosGastos");
};
</script>