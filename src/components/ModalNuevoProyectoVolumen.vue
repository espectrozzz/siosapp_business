<template>
  <div class="flex flex-col w-full space-y-2">
    <div class="flex flex-col w-full" v-for="n in $store.state.b.controlVolumetria" :key="n">
      <label class="text-sm text-slate-400 mb-1">Volumetria</label>
      <div class="flex w-full">
        <div
          class="
            flex
            w-full
            h-full
            bg-white
            border-2 border-fondo-gris
            rounded-lg
            p-1
          "
        >
          <div class="w-[30%]">
            <input
              v-model="$store.state.b.volumetrias[n - 1]"
              class="w-full bg-white border-none focus:ring-0 font-semibold"
              type="number"
              min="0"
            />
          </div>
          <div class="w-[40%]">
            <!-- Volumetría -->
            <Listbox v-model="$store.state.b.tipoVolumetrias[n - 1]">
              <div class="relative w-full">
                <ListboxButton
                  class="
                    relative
                    w-full
                    cursor-default
                    bg-white
                    py-2.5
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
                    border-l-2 border-fondo-gris
                  "
                >
                  <span class="block truncate font-semibold">{{
                    $store.state.b.tipoVolumetrias[n - 1]
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
                      z-50
                      py-1
                      text-base
                      shadow-lg
                      ring-1 ring-black ring-opacity-5
                      focus:outline-none
                      sm:text-sm
                    "
                  >
                    <ListboxOption
                      v-slot="{ active, selected }"
                      v-for="volumetria in props.volumetrias"
                      :key="volumetria.name"
                      :value="volumetria.name"
                      :disabled="volumetria.deshabilitado"
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
                          >{{ volumetria.name }}</span
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
          <!-- Unidad de medida -->
          <div class="w-[30%]">
            <Listbox v-model="$store.state.b.unidadVolumetrias[n - 1]">
              <div class="relative w-full">
                <ListboxButton
                  class="
                    relative
                    w-full
                    cursor-default
                    bg-white
                    py-2.5
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
                    border-l-2 border-fondo-gris
                  "
                >
                  <span class="block truncate font-semibold">{{
                    $store.state.b.unidadVolumetrias[n - 1]
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
                      z-50
                      shadow-lg
                      ring-1 ring-black ring-opacity-5
                      focus:outline-none
                      sm:text-sm
                    "
                  >
                    <ListboxOption
                      v-slot="{ active, selected }"
                      v-for="medida in props.medidas"
                      :key="medida.atajo"
                      :value="medida.atajo"
                      :disabled="medida.deshabilitado"
                      as="template"
                      :title="medida.atajo"
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
                          >{{ medida.atajo }}</span
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
        </div>

        <div
          @click="eliminarVolumetria(n)"
          class="w-5 h-15 flex items-center justify-center cursor-pointer"
          v-if="n != 1"
        >
          <XCircleIcon class="w-full h-full" aria-hidden="true" />
        </div>
      </div>
    </div>
    <div
      v-if="props.volumetrias.length != $store.state.b.controlVolumetria"
      class="flex items-center space-x-1 w-fit cursor-pointer"
      @click="$emit('agregarVolumetria')"
    >
      <PlusCircleIcon class="h-5 w-5" aria-hidden="true" />
      <div class="text-md">agregar volumetría</div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useStore } from "vuex";
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

// Inicializar store
const store = useStore();

// Definir props
const props = defineProps(['volumetrias', 'medidas'])

// Variables de control
const selectedVolumetria = ref([props.volumetrias[0].name]);


// Inicializar inputs
store.state.b.volumetrias.push(0);
store.state.b.tipoVolumetrias.push(props.volumetrias[0].name);
store.state.b.unidadVolumetrias.push(props.medidas[0].atajo);

// Eliminar volumetría
const eliminarVolumetria = (index) => {
  store.state.b.controlVolumetria == 1 ? "" : store.state.b.controlVolumetria--;
  store.state.b.volumetrias.splice(index - 1, 1);
  store.state.b.tipoVolumetrias.splice(index - 1, 1);
  store.state.b.unidadVolumetrias.splice(index - 1, 1);
};
</script>