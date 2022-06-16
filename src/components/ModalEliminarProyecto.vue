<template>
  <TransitionRoot
    appear
    :show="$store.state.b.isOpenModalEliminarProyecto"
    as="template"
  >
    <Dialog
      as="div"
      @close="$store.commit('closeModalEliminarProyecto')"
      class="relative z-50"
    >
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
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="flex flex-col text-lg font-medium leading-6 text-gray-900"
              >
                <div
                  class="flex w-full items-center justify-center text-xl font-semibold"
                >
                  Estás a punto de eliminar este proyecto
                </div>
                <div class="flex w-full justify-center text-xl font-semibold">
                    {{ props.data.val().nombre }}
                </div>
              </DialogTitle>
              <div class="mt-2 flex w-full flex-col">
                <div class="flex w-full items-center justify-center">
                  ¿Quieres continuar?
                </div>
                <div
                  class="mt-8 flex w-full items-center justify-center space-x-8"
                >
                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    @click="$store.commit('closeModalEliminarProyecto')"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    @click="eliminar"
                    class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    Si, continuar
                  </button>
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import { getDatabase, ref as refDB, remove } from "@firebase/database";


const props = defineProps(['data']);
const database = getDatabase();
const router = useRouter();

const eliminar = () => {
    remove(refDB(database, `proyectos/${props.data.key}`)).then(() => {
        router.go(0);
    });
}

</script>
