<template>
    <div class="flex w-full h-[45%]">
      <div class="flex flex-col w-[70%]">
        <!-- Tarjeta en proceso -->
        <div class="flex w-fit space-x-4">
          <div>
            <div class="w-12 h-12 rounded-full bg-fondo-gris"></div>
          </div>
          <div class="flex flex-col">
            <div class="font-semibold">En proceso</div>
            <div class="text-xs">Avance al día del proyecto</div>
          </div>
        </div>
        <!-- Fin tarjeta en proceso -->
        <!-- Avance -->
        <div class="flex flex-col w-full h-full">
          <!-- Tiempo -->
          <div class="flex w-full">
            <div class="flex flex-col w-full">
              <!-- Componente -->
              <div class="flex w-full justify-between">
                <div class="flex justify-center items-center w-[5%]">
                  <Popover class="relative">
                    <PopoverButton
                      ><img src="/img/menu.svg" alt=""
                    /></PopoverButton>

                    <PopoverPanel
                      class="
                        absolute
                        z-10
                        p-2
                        w-[300px]
                        rounded-md
                        bg-white
                        border-2 border-black
                      "
                    >
                      <div class="flex flex-col">
                        <a
                          class="
                            p-0.5
                            hover:bg-fondo-gris
                            rounded-md
                            cursor-pointer
                          "
                          @click="$router.push(`/proyectos/${props.data.key}`)"
                          >Editar proyecto</a
                        >
                      </div>
                    </PopoverPanel>
                  </Popover>
                </div>
                <div class="flex flex-col w-full">
                  <div class="flex w-full justify-between py-1">
                    <div class="flex flex-col w-[28%] h-[60%]">
                      <label
                        class="flex w-full justify-start text-base"
                        for="tiempoTotal"
                        >Tiempo total</label
                      >
                      <div class="flex w-full">
                        <input
                          class="
                            w-full
                            h-full
                            rounded-md
                            text-center
                            bg-fondo-gris
                            border-none
                            text-lg
                            font-semibold
                          "
                          type="text"
                          id="tiempoTotal"
                          :value="data.tiempo"
                          readonly
                        />
                        <div class="flex justify-center items-end text-lg ml-1">
                          días
                        </div>
                      </div>
                    </div>
                    <div class="flex flex-col w-[28%] h-[60%]">
                      <label
                        class="flex w-full justify-start text-base"
                        for="tiempoActual"
                        >A la fecha</label
                      >
                      <div class="flex w-full">
                        <input
                          class="
                            w-full
                            h-full
                            rounded-md
                            bg-fondo-gris
                            text-center
                            border-none
                            text-lg
                            font-semibold
                          "
                          type="text"
                          id="tiempoActual"
                          value="0"
                          readonly
                        />
                        <div class="flex justify-center items-end text-lg ml-1">
                          días
                        </div>
                      </div>
                    </div>
                    <div class="flex flex-col w-[28%] h-[60%]">
                      <label
                        class="flex w-full justify-start text-base"
                        for="iTotal"
                        >Avance</label
                      >
                      <div class="flex w-full">
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
                          type="number"
                          id="rNeta"
                          min="0"
                          :max="data.tiempo"
                        />
                        <div class="flex justify-center items-end text-lg ml-1">
                          días
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Progress bar-->
                  <div class="flex flex-col w-full">
                    <div class="flex justify-between w-full mb-1">
                      <span class="text-base">Progreso</span>
                      <span class="text-sm font-medium">45%</span>
                    </div>
                    <div
                      class="
                        w-full
                        bg-gray-200
                        rounded-full
                        h-2.5
                        dark:bg-gray-700
                      "
                    >
                      <div
                        class="bg-fondo-gris h-2.5 rounded-full"
                        style="width: 45%"
                      ></div>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col w-[30%] h-full justify-center ml-2">
                  <div class="text-lg font-semibold">Estado:</div>
                  <div>Proyecto en buen camino</div>
                </div>
              </div>
              <!-- Fin componente 1-->
              <!-- Componente 2 -->
              <div class="flex w-full justify-between">
                <div class="flex justify-center items-center w-[5%]">
                  <Popover class="relative">
                    <PopoverButton
                      ><img src="/img/menu.svg" alt=""
                    /></PopoverButton>

                    <PopoverPanel
                      class="
                        absolute
                        z-10
                        p-2
                        w-[300px]
                        rounded-md
                        bg-white
                        border-2 border-black
                      "
                    >
                      <div class="flex flex-col">
                        <a
                          class="
                            p-0.5
                            hover:bg-fondo-gris
                            rounded-md
                            cursor-pointer
                          "
                          @click="$router.push(`/proyectos/${props.data.key}`)"
                          >Editar proyecto</a
                        >
                      </div>
                    </PopoverPanel>
                  </Popover>
                </div>
                <div class="flex flex-col w-full">
                  <div class="flex w-full justify-between py-1">
                    <div class="flex flex-col w-[25.5%] h-[60%]">
                      <label
                        class="flex w-full justify-start text-base"
                        for="tiempoTotal"
                        >Mts totales</label
                      >
                      <div class="flex w-full">
                        <input
                          class="
                            w-full
                            h-full
                            rounded-md
                            text-center
                            bg-fondo-gris
                            border-none
                            text-lg
                            font-semibold
                          "
                          type="text"
                          id="tiempoTotal"
                          :value="props.data.tiempo"
                          readonly
                        />
                        <div class="flex justify-center items-end text-lg ml-1">
                          m
                        </div>
                      </div>
                    </div>
                    <div class="flex flex-col w-[25.5%] h-[60%]">
                      <label
                        class="flex w-full justify-start text-base"
                        for="tiempoActual"
                        >Actuales</label
                      >
                      <div class="flex w-full">
                        <input
                          class="
                            w-full
                            h-full
                            rounded-md
                            bg-fondo-gris
                            text-center
                            border-none
                            text-lg
                            font-semibold
                          "
                          type="text"
                          id="tiempoActual"
                          value="0"
                          readonly
                        />
                        <div class="flex justify-center items-end text-lg ml-1">
                          m
                        </div>
                      </div>
                    </div>
                    <div class="flex flex-col w-[28%] h-[60%]">
                      <label
                        class="flex w-full justify-start text-base"
                        for="iTotal"
                        >Avance</label
                      >
                      <div class="flex w-full">
                        <input
                        v-model="avance"
                          class="
                            w-full
                            h-full
                            rounded-md
                            bg-fondo-gris
                            border-none
                            text-lg
                            font-semibold
                          "
                          type="number"
                          id="rNeta"
                          min="0"
                          :max="data.tiempo"
                        />
                        <div class="flex justify-center items-end text-lg ml-1">
                          m
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Progress bar-->
                  <div class="flex flex-col w-full">
                    <div class="flex justify-between w-full mb-1">
                      <span class="text-base">Progreso</span>
                      <span class="text-sm font-medium">20%</span>
                    </div>
                    <div
                      class="
                        w-full
                        bg-gray-200
                        rounded-full
                        h-2.5
                        dark:bg-gray-700
                      "
                    >
                      <div
                        class="bg-fondo-gris h-2.5 rounded-full"
                        style="width: 20%"
                      ></div>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col w-[30%] h-full justify-center ml-2">
                  <div class="text-lg font-semibold">Estado:</div>
                  <div>Proyecto en buen camino</div>
                </div>
              </div>
            </div>
          </div>
          <!-- Volumetría -->
        </div>
      </div>
      <div
        class="
          flex flex-col
          items-center
          justify-center
          font-semibold
          w-[20%]
          h-full
        "
      >
        <div class="text-lg font-semibold mb-4">Rentabilidad</div>
        <div
          class="
            flex flex-col
            w-[80%]
            bg-fondo-gris-claro
            rounded-lg
            p-4
            justify-center
            items-center
            space-y-3
          "
        >
          <div class="flex flex-col w-[60%] h-[60%]">
            <label class="flex w-full justify-start text-base" for="iTotal"
              >Bruta</label
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
              :value="data.rentabilidad.bruta + '%'"
              readonly
            />
          </div>
          <div class="flex flex-col w-[60%] h-[60%]">
            <label class="flex w-full justify-start text-base" for="iTotal"
              >Neta</label
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
              :value="data.rentabilidad.neta + '%'"
              readonly
            />
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import { getDatabase, ref as refDB, set } from 'firebase/database';

const props = defineProps(['data'])

const database = getDatabase();
const refAvance = refDB(database, 'avance');

const avance = ref(0);
</script>