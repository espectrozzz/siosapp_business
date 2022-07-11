<template>
  <div class="flex h-auto w-full select-none space-x-[4%]">
    <div
      class="flex w-[32%] flex-col rounded-2xl border bg-white p-8 shadow-md"
    >
      <!-- Icono / Nombre proyecto / Funciones -->
      <div class="flex w-full flex-col items-center justify-center space-y-6">
        <!-- icono -->
        <div class="flex h-full w-full items-center justify-center">
          <div
            :class="[colorDegradado(data.unidad), 'h-32 w-32 rounded-full p-1']"
          >
            <div
              :class="[
                colorFondo(data.unidad),
                'flex h-full w-full flex-col items-center justify-center rounded-full border-8 border-white',
              ]"
            >
              <div class="text-xs text-white">Unidad</div>
              <div class="text-sm font-semibold text-white">
                {{ data.unidad }}
              </div>
            </div>
          </div>
        </div>
        <!-- Nombre proyecto / Funciones -->
        <div class="flex w-full flex-row items-center justify-center space-x-6">
          <div
            class="h-auto w-auto max-w-[40%] truncate text-xl font-bold"
            :title="nombre"
          >
            {{ nombre }}
          </div>
          <div class="h-auto w-auto max-w-[30%] truncate" :title="nombre">
            <img src="/img/menu.svg" alt="" />
          </div>
        </div>
      </div>
      <!-- FIN Icono / Nombre proyecto / Funciones -->
      <!-- Fecha creación / estado -->
      <div class="mt-14 flex w-full flex-col space-y-4">
        <div class="flex w-full items-center">
          <div class="h-3 w-3 rounded-full bg-[#7C8495]"></div>
          <div class="ml-3 w-[50%] min-w-[60%] text-lg text-[#7C8495]">
            Fecha de creación:
          </div>
          <div class="flex w-[35%] justify-end text-base font-bold">
            {{ creado }}
          </div>
        </div>
        <div class="flex w-full items-center">
          <div class="h-3 w-3 rounded-full bg-[#7C8495]"></div>
          <div class="ml-3 w-[30%] text-lg text-[#7C8495]">Estado:</div>
          <div
            class="flex w-[70%] justify-end text-base font-bold text-[#2166E5]"
          >
            {{ estado }}
          </div>
        </div>
      </div>
      <!-- Fin fecha creación / estado -->
      <!-- Ingreso total -->
      <div
        class="mt-14 flex w-full flex-col items-center justify-center space-y-4"
      >
        <div class="text-lg font-semibold">Ingresos totales</div>
        <div class="text-lg font-bold text-[#2166E5]">{{ iTotal }}</div>
      </div>
      <!-- Fin ingreso total -->
      <div
        class="mt-14 flex w-full flex-col items-center justify-center space-y-4"
      >
        <!-- Volumetrías / Tiempo -->
        <div class="flex w-full font-semibold">Volumetrías</div>
        <!-- Tiempo -->
        <div class="flex w-full items-center justify-between">
          <div
            class="flex h-10 w-10 items-center justify-center rounded-md bg-[#E9F0FC]"
          >
            <img src="/img/time.svg" />
          </div>
          <div class="-ml-9 text-[#7C8495]">Tiempo total</div>
          <div class="text-lg font-semibold">{{ tiempo }}</div>
          <div>días</div>
        </div>
        <!-- Separador -->
        <div class="flex h-[1.5px] w-[70%] justify-center bg-[#7C8495]"></div>
        <!-- Volumetrias -->
        <div class="flex w-full flex-col">
          <div class="flex w-full items-center space-x-4">
            <div
              class="flex h-10 w-10 items-center justify-center rounded-md bg-[#E9F0FC]"
            >
              <img src="/img/volumetria.svg" />
            </div>
            <div class="text-[#7C8495]">Volumetrías</div>
          </div>
          <div class="flex w-full">
            <ul class="flex w-full flex-col justify-between">
              <li
                class="flex pl-16"
                v-for="(volumen, key) in volumetrias"
                :key="volumen"
              >
                <div class="flex w-full justify-between">
                  <div class="text-base text-[#7C8495]">{{ key }}</div>
                  <div class="text-lg font-semibold">
                    {{ volumen.cantidad.toLocaleString("en") }}
                  </div>
                  <div>{{ volumen.unidad }}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="flex w-[32%] flex-col space-y-[4%]">
      <!-- Costo Interno -->
      <div
        class="flex h-full min-h-[32%] flex-col space-y-6 rounded-2xl border bg-white p-8 shadow-md"
      >
        <div class="flex w-full items-center space-x-4">
          <div
            :class="[
              colorDegradadoDos(data.unidad),
              'h-12 w-12 rounded-full p-1',
            ]"
          >
            <div
              :class="[
                colorTextoRentabilidadNeta(data.unidad),
                'flex h-full w-full flex-col items-center justify-center rounded-full bg-white',
              ]"
            >
              <div class="text-xl font-bold">CI</div>
            </div>
          </div>
          <div class="text-lg font-semibold">Costo Interno</div>
        </div>

        <div class="flex w-full items-center justify-center space-x-[10%]">
          <div class="flex w-[35%] flex-col">
            <label for="costoInternoMaterial" class="text-[#7C8495]"
              >Material</label
            >
            <input
              v-model="costoInternoMaterial"
              @change="totalCostoInterno"
              class="rounded-lg border-2 border-[#7C8495] bg-white"
              type="number"
              min="0"
            />
          </div>
          <div class="flex w-[35%] flex-col">
            <label for="costoInternoMaterial" class="text-[#7C8495]"
              >Mano de obra</label
            >
            <input
              v-model="costoInternoManoObra"
              @change="totalCostoInterno"
              class="rounded-lg border-2 border-[#7C8495] bg-white"
              type="number"
              min="0"
            />
          </div>
        </div>
        <div
          class="flex w-full items-center justify-end space-x-4"
          v-if="costoInternoMaterial || costoInternoManoObra"
        >
          <div>Total |</div>
          <div
            class="truncate text-lg font-semibold text-[#2166E5]"
            :title="costoInternoTotal"
          >
            {{ costoInternoTotal }} mxn
          </div>
        </div>
      </div>
      <!-- Costo Externo -->
      <div
        class="flex h-full min-h-[28%] flex-col space-y-6 rounded-2xl border bg-white p-8 shadow-md"
      >
        <div class="flex w-full items-center space-x-4">
          <div
            :class="[
              colorDegradadoDos(data.unidad),
              'h-12 w-12 rounded-full p-1',
            ]"
          >
            <div
              :class="[
                colorTextoRentabilidadNeta(data.unidad),
                'flex h-full w-full flex-col items-center justify-center rounded-full bg-white',
              ]"
            >
              <div class="text-xl font-bold">CE</div>
            </div>
          </div>
          <div class="text-lg font-semibold">Costo Externo</div>
        </div>
        <div class="flex w-full items-center justify-center space-x-[10%]">
          <div class="flex w-[35%] flex-col">
            <label for="costoInternoMaterial" class="text-[#7C8495]"
              >Material</label
            >
            <input
              v-model="costoExternoMaterial"
              @change="totalCostoExterno"
              class="rounded-lg border-2 border-[#7C8495] bg-white"
              type="number"
              min="0"
            />
          </div>
          <div class="flex w-[35%] flex-col">
            <label for="costoInternoMaterial" class="text-[#7C8495]"
              >Mano de obra</label
            >
            <input
              v-model="costoExternoManoObra"
              @change="totalCostoExterno"
              class="rounded-lg border-2 border-[#7C8495] bg-white"
              type="number"
              min="0"
            />
          </div>
        </div>
        <div
          class="flex w-full items-center justify-end space-x-4"
          v-if="costoExternoMaterial || costoExternoManoObra"
        >
          <div>Total |</div>
          <div
            class="truncate text-lg font-semibold text-[#2166E5]"
            :title="costoExternoTotal"
          >
            {{ costoExternoTotal }} mxn
          </div>
        </div>
      </div>
      <!-- Gastos Administrativos -->
      <div
        class="flex h-full flex-col space-y-2 rounded-2xl border bg-white p-8 shadow-md"
      >
        <div class="flex w-full items-center space-x-4">
          <div
            :class="[
              colorDegradadoDos(data.unidad),
              'h-12 w-12 rounded-full p-1',
            ]"
          >
            <div
              :class="[
                colorTextoRentabilidadNeta(data.unidad),
                'flex h-full w-full flex-col items-center justify-center rounded-full bg-white',
              ]"
            >
              <div class="text-xl font-bold">GA</div>
            </div>
          </div>
          <div class="text-lg font-semibold">Gastos Administrativos</div>
        </div>
        <div class="flex w-full items-center justify-center space-x-[10%]">
          <div class="flex w-[35%] flex-col">
            <label for="gastoFijo" class="text-[#7C8495]">Fijo</label>
            <input
              v-model="gastoFijo"
              @change="totalGastos"
              class="rounded-lg border-2 border-[#7C8495] bg-white"
              type="number"
              min="0"
            />
          </div>
          <div class="flex w-[35%] flex-col">
            <label for="gastoNomina" class="text-[#7C8495]">Nomina</label>
            <input
              v-model="gastoNomina"
              @change="totalGastos"
              class="rounded-lg border-2 border-[#7C8495] bg-white"
              type="number"
              min="0"
            />
          </div>
        </div>
        <div class="flex w-full items-center justify-center space-x-[10%]">
          <div class="flex w-[35%] flex-col">
            <label for="gastoVariable" class="text-[#7C8495]">Variable</label>
            <input
              v-model="gastoVariable"
              @change="totalGastos"
              class="rounded-lg border-2 border-[#7C8495] bg-white"
              type="number"
              min="0"
            />
          </div>
          <div class="flex w-[35%] flex-col">
            <label for="gastoOtros" class="text-[#7C8495]">Otros</label>
            <input
              v-model="gastoOtros"
              @change="totalGastos"
              class="rounded-lg border-2 border-[#7C8495] bg-white"
              type="number"
              min="0"
            />
          </div>
        </div>
        <div
          class="flex w-full items-center justify-end space-x-4"
          v-if="gastoFijo || gastoNomina || gastoVariable || gastoOtros"
        >
          <div>Total |</div>
          <div
            class="truncate text-lg font-semibold text-[#2166E5]"
            :title="gastoTotal"
          >
            {{ gastoTotal }} mxn
          </div>
        </div>
      </div>
    </div>
    <div class="flex w-[32%] flex-col items-center space-y-[4%] px-8">
      <div
        class="flex h-full w-full flex-col items-center rounded-md bg-[#E9F0FC] p-8"
      >
        <!-- titulo -->
        <div class="mb-8 flex items-center justify-around space-x-4">
          <div class="flex items-center justify-center rounded-md bg-white p-2">
            <img src="/img/rentabilidad_parcial.svg" />
          </div>
          <div class="flex text-xl font-semibold">
            Rentabilidad <br />
            Parcial
          </div>
        </div>
        <div class="flex w-full flex-col space-y-8">
          <!-- tarjeta bruta -->
          <div class="flex w-full rounded-xl bg-white">
            <div
              class="flex w-full flex-col items-center justify-center space-y-2 py-5"
            >
              <div class="text-xl">Bruta</div>
              <div
                :class="[
                  colorTextoRentabilidadBruta(data.unidad),
                  'truncate text-3xl font-bold',
                ]"
                :title="rentabilidadBruta"
              >
                {{ rentabilidadBruta }}
              </div>
            </div>
            <div
              :class="[
                colorTextoRentabilidadBruta(data.unidad),
                'flex w-[40%] justify-end',
              ]"
            >
              <svg
                width="68"
                height="120"
                viewBox="0 0 68 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M56.8598 52.9673H28.4299C24.6599 52.9673 21.0442 51.4696 18.3784 48.8038C15.7126 46.138 14.215 42.5224 14.215 38.7523C14.215 34.9823 15.7126 31.3667 18.3784 28.7008C21.0442 26.035 24.6599 24.5374 28.4299 24.5374H63.9673C65.8523 24.5374 67.6601 25.2862 68.993 26.6191C70.3259 27.952 71.0748 29.7598 71.0748 31.6449C71.0748 33.5299 71.8236 35.3377 73.1565 36.6706C74.4894 38.0035 76.2972 38.7523 78.1822 38.7523C80.0672 38.7523 81.8751 38.0035 83.208 36.6706C84.5409 35.3377 85.2897 33.5299 85.2897 31.6449C85.2897 25.9898 83.0432 20.5664 79.0445 16.5676C75.0458 12.5689 69.6223 10.3224 63.9673 10.3224H49.7523V-3.89252C49.7523 -5.77754 49.0035 -7.58536 47.6706 -8.91827C46.3377 -10.2512 44.5299 -11 42.6449 -11C40.7598 -11 38.952 -10.2512 37.6191 -8.91827C36.2862 -7.58536 35.5374 -5.77754 35.5374 -3.89252V10.3224H28.4299C20.8898 10.3224 13.6586 13.3177 8.32692 18.6494C2.99528 23.981 0 31.2123 0 38.7523C0 46.2924 2.99528 53.5237 8.32692 58.8553C13.6586 64.187 20.8898 67.1822 28.4299 67.1822H56.8598C60.6298 67.1822 64.2455 68.6799 66.9113 71.3457C69.5771 74.0115 71.0748 77.6271 71.0748 81.3972C71.0748 85.1672 69.5771 88.7829 66.9113 91.4487C64.2455 94.1145 60.6298 95.6121 56.8598 95.6121H21.3224C19.4374 95.6121 17.6296 94.8633 16.2967 93.5304C14.9638 92.1975 14.215 90.3897 14.215 88.5047C14.215 86.6197 13.4661 84.8118 12.1332 83.4789C10.8003 82.146 8.99249 81.3972 7.10748 81.3972C5.22246 81.3972 3.41464 82.146 2.08173 83.4789C0.748823 84.8118 0 86.6197 0 88.5047C0 94.1597 2.24646 99.5832 6.24519 103.582C10.2439 107.581 15.6674 109.827 21.3224 109.827H35.5374V124.042C35.5374 125.927 36.2862 127.735 37.6191 129.068C38.952 130.401 40.7598 131.15 42.6449 131.15C44.5299 131.15 46.3377 130.401 47.6706 129.068C49.0035 127.735 49.7523 125.927 49.7523 124.042V109.827H56.8598C64.3999 109.827 71.6311 106.832 76.9628 101.5C82.2944 96.1685 85.2897 88.9373 85.2897 81.3972C85.2897 73.8571 82.2944 66.6259 76.9628 61.2942C71.6311 55.9626 64.3999 52.9673 56.8598 52.9673Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
          <!-- tarjeta neta -->
          <div class="flex w-full rounded-xl bg-white">
            <div
              class="flex w-full flex-col items-center justify-center space-y-2 py-5"
            >
              <div class="text-xl">Neta</div>
              <div
                :class="[
                  colorTextoRentabilidadNeta(data.unidad),
                  'truncate text-3xl font-bold',
                ]"
                :title="rentabilidadNeta"
              >
                {{ rentabilidadNeta }}
              </div>
            </div>
            <div
              :class="[
                colorTextoRentabilidadNeta(data.unidad),
                'flex w-[40%] justify-end',
              ]"
            >
              <svg
                width="68"
                height="120"
                viewBox="0 0 68 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M56.86 52.9675H49.7525V24.5375H63.9675C65.8525 24.5375 67.6603 25.2863 68.9933 26.6192C70.3262 27.9522 71.075 29.76 71.075 31.645C71.075 33.53 71.8238 35.3378 73.1567 36.6708C74.4896 38.0037 76.2975 38.7525 78.1825 38.7525C80.0675 38.7525 81.8754 38.0037 83.2083 36.6708C84.5412 35.3378 85.29 33.53 85.29 31.645C85.29 25.9899 83.0435 20.5665 79.0448 16.5677C75.046 12.569 69.6226 10.3225 63.9675 10.3225H49.7525V-3.8925C49.7525 -5.77753 49.0037 -7.58535 47.6708 -8.91826C46.3378 -10.2512 44.53 -11 42.645 -11C40.76 -11 38.9522 -10.2512 37.6192 -8.91826C36.2863 -7.58535 35.5375 -5.77753 35.5375 -3.8925V10.3225H28.43C20.8899 10.3225 13.6586 13.3178 8.32695 18.6495C2.99529 23.9811 0 31.2124 0 38.7525C0 46.2926 2.99529 53.5239 8.32695 58.8556C13.6586 64.1872 20.8899 67.1825 28.43 67.1825H35.5375V95.6125H21.3225C19.4375 95.6125 17.6297 94.8637 16.2967 93.5308C14.9638 92.1979 14.215 90.39 14.215 88.505C14.215 86.62 13.4662 84.8122 12.1333 83.4792C10.8003 82.1463 8.99253 81.3975 7.1075 81.3975C5.22247 81.3975 3.41465 82.1463 2.08174 83.4792C0.748825 84.8122 0 86.62 0 88.505C0 94.1601 2.24647 99.5835 6.24522 103.582C10.244 107.581 15.6674 109.828 21.3225 109.828H35.5375V124.043C35.5375 125.928 36.2863 127.735 37.6192 129.068C38.9522 130.401 40.76 131.15 42.645 131.15C44.53 131.15 46.3378 130.401 47.6708 129.068C49.0037 127.735 49.7525 125.928 49.7525 124.043V109.828H56.86C64.4001 109.828 71.6314 106.832 76.963 101.501C82.2947 96.1689 85.29 88.9376 85.29 81.3975C85.29 73.8574 82.2947 66.6261 76.963 61.2945C71.6314 55.9628 64.4001 52.9675 56.86 52.9675ZM35.5375 52.9675H28.43C24.6599 52.9675 21.0443 51.4699 18.3785 48.804C15.7127 46.1382 14.215 42.5226 14.215 38.7525C14.215 34.9825 15.7127 31.3668 18.3785 28.701C21.0443 26.0351 24.6599 24.5375 28.43 24.5375H35.5375V52.9675ZM56.86 95.6125H49.7525V67.1825H56.86C60.6301 67.1825 64.2457 68.6802 66.9115 71.346C69.5773 74.0118 71.075 77.6275 71.075 81.3975C71.075 85.1676 69.5773 88.7832 66.9115 91.449C64.2457 94.1149 60.6301 95.6125 56.86 95.6125Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex h-full w-full flex-col items-center justify-center space-y-20"
      >
        <button
          @click="$router.push('/proyectos')"
          class="cursor-pointer font-medium text-[#2166E5] hover:underline"
        >
          Ir a proyectos
        </button>
        <button
          v-if="(costoInternoTotal || costoExternoTotal) && gastoTotal"
          @click="$store.commit('openModalConfirmacion')"
          class="cursor-pointer rounded-xl bg-[#2166E5] px-8 py-4 font-medium text-white"
        >
          Iniciar proyecto
        </button>
      </div>
    </div>
    <modal-confirmacion
      :id="$route.params.key"
      :rentabilidad="{ bruta: rentabilidadBruta, neta: rentabilidadNeta }"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import ModalConfirmacion from "@/components/ModalConfirmacion.vue";
import {
  colorDegradado,
  colorDegradadoDos,
  colorFondo,
  colorTextoRentabilidadBruta,
  colorTextoRentabilidadNeta,
} from "@/utils/color.js";
import {
  getDatabase,
  get,
  ref as refDB,
  child,
  update,
} from "@firebase/database";

const route = useRoute();
const router = useRouter();
const database = getDatabase();
const proyectoRef = refDB(database);
const nombre = ref("");
const creado = ref();
const estado = ref();
const iTotal = ref();
const iTotalAritmetico = ref(0);
const volumetrias = ref();
const costoInternoMaterial = ref(0);
const costoInternoManoObra = ref(0);
const costoInternoTotal = ref(0);

const datosSinFormato = ref({
  costoExternoTotal: 0,
  costoInternoTotal: 0,
  gastoTotal: 0,
});

const costoExternoMaterial = ref(0);
const costoExternoManoObra = ref(0);
const costoExternoTotal = ref(0);
const costoTotal = ref(0);
const tiempo = ref();

const gastoFijo = ref(0);
const gastoNomina = ref(0);
const gastoVariable = ref(0);
const gastoOtros = ref(0);
const gastoTotal = ref(0);

const rentabilidadNeta = ref(0);
const rentabilidadBruta = ref(0);

const data = ref({
  unidad: String,
});

const totalCostoInterno = () => {
  costoInternoTotal.value =
    costoInternoMaterial.value + costoInternoManoObra.value;
  datosSinFormato.value.costoInternoTotal = costoInternoTotal.value;
  if (costoInternoTotal.value === 0) {
    costoInternoTotal.value = null;
  } else {
    costoInternoTotal.value = costoInternoTotal.value.toLocaleString("en");
  }

  update(refDB(database, `proyectos/${route.params.key}/costoInterno`), {
    material: costoInternoMaterial.value ? costoInternoMaterial.value : null,
    manoDeObra: costoInternoManoObra.value ? costoInternoManoObra.value : null,
    total: costoInternoTotal.value ? costoInternoTotal.value : null,
  }).then(() => {
    rentabilidad();
  });
};

const totalCostoExterno = () => {
  costoExternoTotal.value =
    costoExternoMaterial.value + costoExternoManoObra.value;
  datosSinFormato.value.costoExternoTotal = costoExternoTotal.value;
  if (costoExternoTotal.value === 0) {
    costoExternoTotal.value = null;
  } else {
    costoExternoTotal.value = costoExternoTotal.value.toLocaleString("en");
  }
  update(refDB(database, `proyectos/${route.params.key}/costoExterno`), {
    material: costoExternoMaterial.value ? costoExternoMaterial.value : null,
    manoDeObra: costoExternoManoObra.value ? costoExternoManoObra.value : null,
    total: costoExternoTotal.value ? costoExternoTotal.value : null,
  }).then(() => {
    rentabilidad();
  });
};

const totalGastos = () => {
  gastoTotal.value =
    gastoFijo.value +
    gastoNomina.value +
    gastoVariable.value +
    gastoOtros.value;
  datosSinFormato.value.gastoTotal = gastoTotal.value;
  if (gastoTotal.value === 0) {
    gastoTotal.value = null;
  } else {
    gastoTotal.value = gastoTotal.value.toLocaleString("en");
  }
  update(refDB(database, `proyectos/${route.params.key}/gastos`), {
    fijo: gastoFijo.value ? gastoFijo.value : null,
    nomina: gastoNomina.value ? gastoNomina.value : null,
    variable: gastoVariable.value ? gastoVariable.value : null,
    otros: gastoOtros.value ? gastoOtros.value : null,
    total: gastoTotal.value ? gastoTotal.value : null,
  }).then(() => {
    rentabilidad();
  });
};

const rentabilidad = () => {
  costoTotal.value =
    datosSinFormato.value.costoExternoTotal +
    datosSinFormato.value.costoInternoTotal;
  rentabilidadNeta.value =
    (1 -
      (costoTotal.value + datosSinFormato.value.gastoTotal) /
        iTotalAritmetico.value) *
    100;
  rentabilidadNeta.value = rentabilidadNeta.value.toFixed(2);
  rentabilidadBruta.value =
    (1 - costoTotal.value / iTotalAritmetico.value) * 100;
  rentabilidadBruta.value = rentabilidadBruta.value.toFixed(2);
};

onMounted(() => {
  get(child(proyectoRef, `proyectos/${route.params.key}`)).then((snapshot) => {
    if (snapshot.exists()) {
      data.value = snapshot.val();
      nombre.value = snapshot.val().nombre;
      const date = new Date(snapshot.val().creado);
      creado.value =
        date.getDate() +
        "/" +
        String(date.getMonth() + 1).padStart(2, "0") +
        "/" +
        date.getFullYear();
      estado.value = snapshot.val().estado;
      iTotalAritmetico.value = snapshot.val().ingresoTotal;
      iTotal.value = snapshot
        .val()
        .ingresoTotal.toLocaleString("en", {
          style: "currency",
          currency: "MXN",
        })
        .replace("MX", "");
      if (snapshot.hasChild("volumetrias")) {
        volumetrias.value = snapshot.val().volumetrias;
      }
      if (snapshot.hasChild("tiempo")) tiempo.value = snapshot.val().tiempo;
      if (snapshot.hasChild("costoInterno/material"))
        costoInternoMaterial.value = snapshot.val().costoInterno.material;
      if (snapshot.hasChild("costoInterno/manoDeObra"))
        costoInternoManoObra.value = snapshot.val().costoInterno.manoDeObra;
      // if (snapshot.hasChild('costoInterno/total')) costoInternoTotal.value = snapshot.val().costoInterno.total;

      if (snapshot.hasChild("costoExterno/material"))
        costoExternoMaterial.value = snapshot.val().costoExterno.material;
      if (snapshot.hasChild("costoExterno/manoDeObra"))
        costoExternoManoObra.value = snapshot.val().costoExterno.manoDeObra;
      // if (snapshot.hasChild('costoExterno/total')) costoExternoTotal.value = snapshot.val().costoExterno.total

      if (snapshot.hasChild("gastos/fijo"))
        gastoFijo.value = snapshot.val().gastos.fijo;
      if (snapshot.hasChild("gastos/nomina"))
        gastoNomina.value = snapshot.val().gastos.nomina;
      if (snapshot.hasChild("gastos/variable"))
        gastoVariable.value = snapshot.val().gastos.variable;
      if (snapshot.hasChild("gastos/otros"))
        gastoOtros.value = snapshot.val().gastos.otros;
      // if (snapshot.hasChild('gastos/total')) gastoTotal.value = snapshot.val().gastos.total
      totalCostoInterno();
      totalCostoExterno();
      totalGastos();
      rentabilidad();
    }
  });
});
</script>
