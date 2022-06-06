<template>
  <TransitionRoot
    appear
    :show="$store.state.b.isOpenModalEditarTiempoVolumetria"
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
                <div class="w-[95%] font-semibold text-2xl">
                  {{ props.data.val().nombre }}
                </div>
                <div class="w-[5%]">
                  <div class="w-5 h-5 bg-fondo-gris rounded-full"></div>
                </div>
              </DialogTitle>
              <div class="mt-2">
                <form
                  @submit.prevent="actualizarProyecto"
                  class="w-full h-auto space-y-8 mt-6"
                >
                  <!-- Tiempo -->
                  <div
                    class="flex flex-col w-full"
                    v-if="props.data.val().tiempo"
                  >
                    <label class="text-sm font-semibold mb-1" for="tiempo"
                      >Tiempo</label
                    >
                    <input
                      v-model="tiempo"
                      class="w-full rounded-md bg-fondo-gris-claro border-none"
                      type="number"
                      id="tiempo"
                      min="0"
                    />
                  </div>
                  <!-- Volumetrias -->
                  <div
                    class="flex flex-col w-full"
                    v-for="(volumen, key, index) in props.data.val()
                      .volumetrias"
                    :key="index"
                  >
                    <label class="text-sm font-semibold mb-1" for="tiempo">{{
                      key
                    }}</label>
                    <input
                      v-model="volumetriasModel[index]"
                      class="w-full rounded-md bg-fondo-gris-claro border-none"
                      type="number"
                      id="tiempo"
                      min="0"
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
                      @click="$store.commit('closeModalEditarTiempoVolumetria')"
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
                      Guardar
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
import { ref } from "vue";
import ModalNuevoProyectoVolumen from "./ModalNuevoProyectoVolumen.vue";
import { getDatabase, ref as refDB, update } from "firebase/database";
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
const store = useStore();
const router = useRouter();
const tiempo = ref(0);
const volumetriasModel = ref([]);
const volumetrias = new Object;
const database = getDatabase()

if (props.data.val().tiempo) tiempo.value = props.data.val().tiempo;

if(props.data.val().volumetrias)
Object.values(props.data.val().volumetrias).forEach((element) => {
  volumetriasModel.value.push(element.cantidad);
});

const closeModal = () => {
  store.commit("closeModalEditarTiempoVolumetria");
};

const actualizarProyecto = () => {
    let i = 0;
    Object.keys(props.data.val().volumetrias).forEach((element) => {
        volumetrias[element] = { cantidad: volumetriasModel.value[i], unidad: props.data.val().volumetrias[element].unidad }
        i++
    });
    update(refDB(database, `proyectos/${props.data.key}`), {
      tiempo: tiempo.value ? tiempo.value : null,
      volumetrias
    }).then(() => {
        router.go(0);
    })
}
</script>