<template>
  <TransitionRoot
    appear
    :show="$store.state.b.isOpenModalNuevoProyecto"
    as="template"
  >
    <Dialog as="div" @close="closeModal" class="relative z-50">
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
                max-w-md
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
                <div class="w-[95%]">Crear nuevo proyecto</div>
                <div class="w-[5%]">
                  <div class="w-5 h-5 bg-fondo-gris rounded-full"></div>
                </div>
              </DialogTitle>
              <div class="mt-2">
                <div class="flex px-5 text-red-500 text-sm">
                  <ul type="A" class="flex flex-col space-y-1">
                    <li v-for="error in errores" :key="error" type="disc">
                      {{ error }}
                    </li>
                  </ul>
                </div>
                <form
                  @submit.prevent="crearProyecto"
                  class="w-full h-auto space-y-8 mt-6"
                >
                  <input
                    v-model="nombre"
                    class="
                      w-full
                      border-x-0 border-t-0 border-fondo-gris
                      focus:ring-0
                      placeholder:opacity-60
                    "
                    type="text"
                    placeholder="Nombre del proyecto"
                    maxlength="20"
                    minlength="5"
                  />
                  <div class="flex flex-row w-full">
                    <Listbox v-model="selectedUnidadNegocio">
                      <div class="relative w-full">
                        <ListboxLabel
                          ><div class="text-sm text-slate-400 mb-1">
                            Unidades de negocio
                          </div>
                        </ListboxLabel>
                        <ListboxButton
                          class="
                            relative
                            w-full
                            cursor-default
                            rounded-md
                            bg-white
                            py-2
                            pl-3
                            pr-10
                            text-left
                            focus:outline-none
                            focus-visible:border-indigo-500
                            focus-visible:ring-2
                            focus-visible:ring-white
                            focus-visible:ring-opacity-75
                            focus-visible:ring-offset-2
                            focus-visible:ring-offset-orange-300
                            sm:text-sm
                            border-2 border-fondo-gris
                          "
                        >
                          <span class="block truncate font-semibold">{{
                            selectedUnidadNegocio.name
                          }}</span>
                          <span
                            class="
                              pointer-events-none
                              absolute
                              inset-y-0
                              right-0
                              flex
                              items-center
                              pr-2
                            "
                          >
                            <SelectorIcon
                              class="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </ListboxButton>

                        <transition
                          leave-active-class="transition duration-100 ease-in"
                          leave-from-class="opacity-100"
                          leave-to-class="opacity-0"
                        >
                          <ListboxOptions
                            class="
                              absolute
                              mt-1
                              max-h-60
                              w-full
                              overflow-auto
                              rounded-md
                              bg-white
                              py-1
                              text-base
                              shadow-lg
                              z-50
                              ring-1 ring-black ring-opacity-5
                              focus:outline-none
                              sm:text-sm
                            "
                          >
                            <ListboxOption
                              v-slot="{ active, selected }"
                              v-for="unidad in unidades"
                              :key="unidad.name"
                              :value="unidad"
                              :disabled="unidad.deshabilitado"
                              as="template"
                            >
                              <li
                                :class="[
                                  active
                                    ? 'bg-fondo-gris-claro text-black'
                                    : 'text-gray-900',
                                  'relative cursor-default select-none py-2 pl-10 pr-4',
                                ]"
                              >
                                <span
                                  :class="[
                                    selected ? 'font-medium' : 'font-normal',
                                    'block truncate',
                                  ]"
                                  >{{ unidad.name }}</span
                                >
                                <span
                                  v-if="selected"
                                  class="
                                    absolute
                                    inset-y-0
                                    left-0
                                    flex
                                    items-center
                                    pl-3
                                    text-amber-600
                                  "
                                >
                                  <CheckIcon
                                    class="h-5 w-5 text-black"
                                    aria-hidden="true"
                                  />
                                </span>
                              </li>
                            </ListboxOption>
                          </ListboxOptions>
                        </transition>
                      </div>
                    </Listbox>
                  </div>
                  <div class="flex flex-col w-full">
                    <label class="text-sm text-slate-400 mb-1" for="tiempo"
                      >Tiempo</label
                    >
                    <input
                      v-model="tiempo"
                      class="
                        w-full
                        rounded-md
                        bg-white
                        border-2 border-fondo-gris
                        font-semibold
                      "
                      type="number"
                      id="tiempo"
                      min="0"
                    />
                  </div>
                  <!-- Componente volumen -->
                  <modal-nuevo-proyecto-volumen :volumetrias="volumetrias" :medidas="medidas" @agregarVolumetria="agregarVolumetria" />
                  <div class="flex flex-col w-full">
                    <label class="text-sm" for="iTotal">Ingreso total</label>
                    <input
                      v-model="ingresoTotal"
                      class="
                        w-full
                        rounded-md
                        bg-white
                        border-2 border-fondo-gris
                      "
                      type="number"
                      id="iTotal"
                      min="1"
                    />
                  </div>

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
                      @click="$store.commit('closeModalNuevoProyecto')"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
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
                      Crear
                    </button>
                  </div>
                </form>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref, watch } from "vue";
import ModalNuevoProyectoVolumen from "./ModalNuevoProyectoVolumen.vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { CheckIcon, SelectorIcon } from "@heroicons/vue/solid";
import { PlusCircleIcon, XCircleIcon } from "@heroicons/vue/outline";
import {
  getDatabase,
  ref as refDB,
  set,
  push,
  serverTimestamp,
} from "firebase/database";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const isOpen = ref(false);
const nombre = ref("");
const tiempo = ref(0);
const ingresoTotal = ref(1);
const unidades = [
  { name: "Elige una unidad de negocio", deshabilitado: true },
  { name: "Infraestructura", deshabilitado: false },
  { name: "Poliza", deshabilitado: false },
  { name: "Megacable", deshabilitado: false },
  { name: "Ventas", deshabilitado: false },
];
const selectedUnidadNegocio = ref(unidades[0]);

const router = useRouter();
const store = useStore();
const database = getDatabase();
const errores = ref([]);
const proyectoListRef = refDB(database, "proyectos");
const volumetriasCantidad = ref(new Object());
const poliza = ref(true);

const volumetrias = ref([
  { name: "Canalizada", deshabilitado: false },
  { name: "Cable", deshabilitado: false },
  { name: "Otro", deshabilitado: false },
  { name: "Poliza", deshabilitado: true },
]);

const medidas = ref([
  { name: "Metros", atajo: "M", deshabilitado: false },
  { name: "Kilometros", atajo: "Km", deshabilitado: false },
  { name: "Pieza", atajo: "Pieza", deshabilitado: false },
  { name: "Porcentaje", atajo: "%", deshabilitado: true},
]);

watch(selectedUnidadNegocio, () => {
  store.commit('unidadNegocioPoliza', selectedUnidadNegocio.value)
    volumetrias.value.forEach((element) => {
      if(element.name === 'Poliza' && selectedUnidadNegocio.value.name === 'Poliza') element.deshabilitado = false;
      else if (element.name === 'Poliza' && selectedUnidadNegocio.value.name != 'Poliza') element.deshabilitado = true;
    })
    medidas.value.forEach((element) => {
      if(element.name === 'Porcentaje' && selectedUnidadNegocio.value.name === 'Poliza') element.deshabilitado = false;
      else if (element.name === 'Porcentaje' && selectedUnidadNegocio.value.name != 'Poliza') element.deshabilitado = true;
    })
})

// Agregar volumetria
// Estas variables están en el store/index.js/proyectosControl
const agregarVolumetria = () => {
  store.state.b.volumetrias.push(0);

  if (volumetrias.value.length - 1 > store.state.b.controlVolumetria - 1) {
    store.state.b.tipoVolumetrias.push(
      volumetrias.value[store.state.b.controlVolumetria].name
    );
  } else {
    store.state.b.tipoVolumetrias.push(volumetrias.value[0].name);
  }

  if (medidas.value.length - 1 > store.state.b.controlVolumetria - 1) {
    store.state.b.unidadVolumetrias.push(
      medidas.value[store.state.b.controlVolumetria].atajo
    );
  } else {
    store.state.b.unidadVolumetrias.push(medidas.value[0].atajo);
 n   }
  store.state.b.controlVolumetria++;
};

const crearProyecto = () => {
  errores.value = [];

  const nuevoProyecto = push(proyectoListRef);

  for (const elements in volumetriasCantidad.value) {
    delete volumetriasCantidad.value[elements];
  }

  // validaciones
  if (!nombre.value) errores.value.push("El proyecto debe tener nombre.");
  if (tiempo.value < 0)
    errores.value.push("El tiempo no puede ser menor a cero.");
  if (selectedUnidadNegocio.value.deshabilitado)
    errores.value.push("Selecciona una unidad de negocio.");
  if (ingresoTotal.value < 1 || !ingresoTotal.value)
    errores.value.push("El ingreso es menor a uno o está vacio.");
  // Volumetrias
  store.state.b.tipoVolumetrias.forEach((element, index) => {
    if (
      store.state.b.volumetrias[index] == 0 ||
      !store.state.b.volumetrias[index] ||
      store.state.b.volumetrias[index] < 0
    )
      errores.value.push(
        `La volumetría no puede ser cero o menor a cero en ${element}`
      );

    volumetriasCantidad.value[element] = {
      cantidad: store.state.b.volumetrias[index],
      unidad: store.state.b.unidadVolumetrias[index],
    };
  });
  if (errores.value.length > 0) return errores.value;
  set(nuevoProyecto, {
    nombre: nombre.value,
    tiempo: tiempo.value ? tiempo.value : null,
    volumetrias: volumetriasCantidad.value,
    ingresoTotal: ingresoTotal.value,
    estado: "Pendiente de información",
    unidad: selectedUnidadNegocio.value.name,
    creado: serverTimestamp(),
  }).then(() => {
    store.commit("closeModalNuevoProyecto");
    closeModal();
    router.push(`/proyectos/${nuevoProyecto.key}`);
  });
};

const closeModal = () => {
  nombre.value = "";
  selectedUnidadNegocio.value = unidades[0];
  tiempo.value = 0;
  store.state.b.tipoVolumetrias = [];
  store.state.b.volumetrias = [];
  store.state.b.unidadVolumetrias = [];
  for (const elements in volumetriasCantidad.value) {
    delete volumetriasCantidad.value[elements];
  }
  volumetrias.value.forEach((element) => {
    if(element.name === 'Poliza') element.deshabilitado = true;
  })
  medidas.value.forEach((element) => {
    if(element.name === 'Porcentaje') element.deshabilitado = true;
  })
  errores.value = [];
  store.commit("closeModalNuevoProyecto");
};
</script>

<style>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>