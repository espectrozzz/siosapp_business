<template>
  <div class="flex  w-full">
    <div class="flex flex-col w-[70%] h-fit">
      <!-- Avance -->
      <div class="flex h-full flex-col w-fit">
        <!-- Tiempo -->
        <div class="flex w-full">
          <div class="flex w-full flex-col">
            <!-- Componente -->
            <div
              class="mb-12 flex w-full justify-between"
              v-if="props.data.val().tiempo"
            >
              <div class="flex w-[70%] flex-col">
                <div class="flex w-full justify-between py-1">
                  <div class="flex h-[60%] w-[28%] flex-col p-2">
                    <label
                      class="flex w-full justify-start text-sm text-[#7C8495]"
                      for="iTotal"
                      >Avance</label
                    >
                    <div class="flex w-full">
                      <input
                        v-model="tiempoNuevoAvance"
                        @change="guardar('tiempo')"
                        class="h-full w-full rounded-md border border-[#7C8495] bg-white text-lg font-semibold"
                        type="number"
                        id="rNeta"
                        min="0"
                      />
                      <div
                        class="ml-1 flex items-end justify-center text-lg font-bold"
                      >
                        días
                      </div>
                    </div>
                  </div>
                  <div class="flex h-[60%] w-[28%] flex-col p-2">
                    <label
                      class="flex w-full justify-start text-sm text-[#7C8495]"
                      for="tiempoActual"
                      >A la fecha</label
                    >
                    <div class="flex w-full">
                      <input
                        class="h-full w-full rounded-md border border-[#7C8495] bg-white text-center text-lg font-semibold"
                        type="text"
                        id="tiempoActual"
                        :value="tiempoAvance"
                        readonly
                      />
                      <div
                        class="ml-1 flex items-end justify-center text-lg font-bold"
                      >
                        días
                      </div>
                    </div>
                  </div>

                  <div
                    class="flex w-[28%] flex-col rounded-md bg-[#E9F0FC] p-2"
                  >
                    <label
                      class="flex w-full justify-start text-sm font-bold text-[#1A52B7]"
                      for="tiempoTotal"
                      >Tiempo total</label
                    >
                    <div class="flex w-full">
                      <input
                        class="h-full w-full rounded-md border border-[#7C8495] bg-white text-center text-lg font-semibold"
                        type="text"
                        id="tiempoTotal"
                        :value="props.data.val().tiempo"
                        readonly
                      />
                      <div
                        class="ml-1 flex items-end justify-center text-lg font-bold"
                      >
                        días
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Progress bar-->
                <div class="flex w-full flex-col">
                  <div class="mb-1 flex w-full justify-between">
                    <span class="text-sm">Progreso</span>
                    <span class="text-sm font-medium"
                      >{{ tiempoPorcentaje }}%</span
                    >
                  </div>
                  <div class="h-2.5 w-full rounded-full bg-[#E9F0FC]">
                    <div
                      :class="[
                        colorFondoRentabilidadBruta(props.data.val().unidad),
                        'h-2.5 rounded-full transition-all duration-500',
                      ]"
                      :style="`width: ${tiempoPorcentaje}%`"
                    ></div>
                  </div>
                </div>
              </div>
              <div class="ml-2 flex h-full flex-col justify-center">
                <div class="text-lg font-semibold">Estado:</div>
                <div>Proyecto en buen camino</div>
              </div>
            </div>
            <!-- Fin componente 1-->
            <!-- Componente 2 -->
            <div
              class="mb-12 flex w-full justify-between"
              v-for="(volumen, key, index) in props.data.val().volumetrias"
              :key="index"
            >
              <div class="flex w-[70%] flex-col">
                <div class="flex w-full justify-between py-1">
                  <div class="flex h-[60%] w-[28%] flex-col p-2">
                    <label
                      class="flex w-full justify-start text-sm text-texto-gris"
                      :for="`nuevoAvance[${index}]`"
                      >Avance</label
                    >
                    <div class="flex w-full">
                      <input
                        v-model="nuevoAvance[index]"
                        @change="guardar(index)"
                        class="h-full w-full rounded-md border bg-white text-lg font-semibold"
                        type="number"
                      />
                      <div
                        class="ml-1 flex items-end justify-center text-lg font-bold"
                      >
                        {{ volumen.unidad }}
                      </div>
                    </div>
                  </div>
                  <div class="flex h-[60%] w-[25.5%] flex-col p-2">
                    <label
                      class="flex w-full justify-start text-sm text-texto-gris"
                      :for="`volumetriaActual[${index}]`"
                      >Actuales</label
                    >
                    <div class="flex w-full">
                      <input
                        v-model="avance[index]"
                        class="h-full w-full rounded-md border bg-white text-center text-lg font-semibold"
                        type="text"
                        :id="`volumetriaActual[${index}]`"
                        readonly
                      />
                      <div
                        class="ml-1 flex items-end justify-center text-lg font-bold"
                      >
                        {{ volumen.unidad }}
                      </div>
                    </div>
                  </div>

                  <div
                    class="flex w-[25.5%] flex-col rounded-md bg-[#E9F0FC] p-2"
                  >
                    <label
                      class="flex w-full justify-start text-sm font-bold text-[#1A52B7]"
                      for="tiempoTotal"
                      >{{ volumen.unidad }} total {{ key }}</label
                    >
                    <div class="flex w-full">
                      <input
                        class="h-full w-full rounded-md border bg-white text-center text-lg font-semibold"
                        type="text"
                        id="tiempoTotal"
                        :value="volumen.cantidad"
                        readonly
                      />
                      <div
                        class="ml-1 flex items-end justify-center text-lg font-bold"
                      >
                        {{ volumen.unidad }}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Progress bar-->
                <div class="flex w-full flex-col overflow-hidden">
                  <div class="mb-1 flex w-full justify-between">
                    <span class="text-sm">Progreso</span>
                    <span class="text-sm font-medium"
                      >{{ porcentaje[index] }}%</span
                    >
                  </div>
                  <div class="h-2.5 w-full rounded-full bg-[#E9F0FC]">
                    <div
                      :class="[
                        colorFondoRentabilidadBruta(props.data.val().unidad),
                        'h-2.5 rounded-full transition-all duration-500',
                      ]"
                      :style="`width: ${porcentaje[index]}%`"
                    ></div>
                  </div>
                </div>
              </div>
              <div class="ml-2 flex h-full flex-col justify-center">
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
      class="flex h-full flex-col items-center justify-center font-semibold w-[30%]"
    >
      <div class="flex w-full items-center justify-center space-x-4">
        <div
          :class="[
            colorFondoRentabilidadNeta(data.val().unidad),
            'h-5 w-5 rounded-full',
          ]"
        ></div>
        <div class="text-lg font-semibold">Rentabilidad Actual</div>
      </div>
      <div
        class="flex flex-col items-center justify-center space-y-3 rounded-lg bg-transparent p-4 w-[85%]"
      >
        <div class="flex w-full rounded-xl bg-white shadow-md border">
            <div
              class="flex w-full flex-col items-center justify-center space-y-2 py-5"
            >
              <div class="text-xl">Bruta</div>
              <div
                :class="[
                  colorTextoRentabilidadBruta(props.data.val().unidad),
                  'truncate text-3xl font-bold',
                ]"
                :title="rentabilidadBruta"
              >
                {{ (rentabilidadAvance.bruta
                ? rentabilidadAvance.bruta
                : props.data.val().rentabilidad.bruta) + '%' }}
              </div>
            </div>
            <div
              :class="[
                colorTextoRentabilidadBruta(props.data.val().unidad),
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
        <div class="flex w-full rounded-xl bg-white shadow-md border">
            <div
              class="flex w-full flex-col items-center justify-center space-y-2 py-5"
            >
              <div class="text-xl">Neta</div>
              <div
                :class="[
                  colorTextoRentabilidadNeta(props.data.val().unidad),
                  'truncate text-3xl font-bold',
                ]"
                :title="rentabilidadAvance.neta"
              >
                {{ (rentabilidadAvance.neta
                ? rentabilidadAvance.neta
                : props.data.val().rentabilidad.neta) + '%' }}
              </div>
            </div>
            <div
              :class="[
                colorTextoRentabilidadNeta(props.data.val().unidad),
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
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import {
  getDatabase,
  ref as refDB,
  set,
  child,
  get,
  update,
} from "firebase/database";
import { store } from "@/store";
import {
  colorFondoRentabilidadBruta,
  colorFondoRentabilidadNeta,
  colorTextoRentabilidadBruta,
  colorTextoRentabilidadNeta,
} from "@/utils/color.js";
import { useRouter } from "vue-router";

const props = defineProps(["data"]);
const tiempoAvance = ref(0);
const tiempoNuevoAvance = ref(0);
const tiempoPorcentaje = ref(0);
const database = getDatabase();
const refAvance = refDB(database);
const porcentaje = ref([]);
const avance = ref([]);
const nuevoAvance = ref([]);
const sumaAvance = ref(0);
const rentabilidadAvance = ref({
  bruta: null,
  neta: null,
});
const router = useRouter();

const rentabilidad = (ingreso) => {
  update(refDB(database, `avanceProyectos/${props.data.key}`), {
    rentabilidad: {
      bruta: (
        (1 -
          ((props.data.val().costoExterno.manoDeObra
            ? props.data.val().costoExterno.manoDeObra
            : 0) +
            (props.data.val().costoExterno.material
              ? props.data.val().costoExterno.material
              : 0) +
            ((props.data.val().costoInterno.manoDeObra
              ? props.data.val().costoInterno.manoDeObra
              : 0) +
              (props.data.val().costoInterno.material
                ? props.data.val().costoInterno.material
                : 0))) /
            ingreso) *
        100
      ).toFixed(2),
      neta: (
        (1 -
          ((props.data.val().costoExterno.manoDeObra
            ? props.data.val().costoExterno.manoDeObra
            : 0) +
            (props.data.val().costoExterno.material
              ? props.data.val().costoExterno.material
              : 0) +
            ((props.data.val().costoInterno.manoDeObra
              ? props.data.val().costoInterno.manoDeObra
              : 0) +
              (props.data.val().costoInterno.material
                ? props.data.val().costoInterno.material
                : 0)) +
            ((props.data.val().gastos.fijo ? props.data.val().gastos.fijo : 0) +
              (props.data.val().gastos.nomina
                ? props.data.val().gastos.nomina
                : 0) +
              (props.data.val().gastos.otros
                ? props.data.val().gastos.otros
                : 0) +
              (props.data.val().gastos.variable
                ? props.data.val().gastos.variable
                : 0))) /
            ingreso) *
        100
      ).toFixed(2),
    },
  });
};

const calcPoliza = (index) => {
  console.log(props.data.val().ingresoTotal * (sumaAvance.value / 100));
  store.commit(
    "ingresoFinalSave",
    props.data.val().ingresoTotal * (sumaAvance.value / 100)
  );
  if(props.data.val().ingresoTotal * (sumaAvance.value / 100) != 0){
  rentabilidad(props.data.val().ingresoTotal * (sumaAvance.value / 100));
  }
  else{
    rentabilidad(props.data.val().ingresoTotal);
  }
};

const guardar = (index) => {
  get(child(refAvance, `avanceProyectos/${props.data.key}`)).then(
    (snapshot) => {
      if (index != "tiempo") {
        // Actualizar las volumetrías
        if (
          snapshot.hasChild(
            `volumetrias/${Object.keys(props.data.val().volumetrias)[index]}`
          )
        ) {
          sumaAvance.value =
            snapshot.val().volumetrias[
              Object.keys(props.data.val().volumetrias)[index]
            ].avance + nuevoAvance.value[index];
        } else sumaAvance.value = nuevoAvance.value[index];
        update(
          refDB(
            database,
            `avanceProyectos/${props.data.key}/volumetrias/${
              Object.keys(props.data.val().volumetrias)[index]
            }`
          ),
          {
            avance: sumaAvance.value,
          }
        ).then(() => {
          porcentaje.value[index] = (
            (sumaAvance.value /
              Object.values(props.data.val().volumetrias)[index].cantidad) *
            100
          ).toFixed(2);
          avance.value[index] = sumaAvance.value;
          nuevoAvance.value[index] = 0;
        });
        // Actualizar el tiempo
      } else {
        if (snapshot.hasChild("tiempo")) {
          sumaAvance.value = tiempoNuevoAvance.value + snapshot.val().tiempo;
        } else {
          sumaAvance.value = tiempoNuevoAvance.value;
        }
        update(refDB(database, `avanceProyectos/${props.data.key}`), {
          tiempo: sumaAvance.value,
        }).then(() => {
          tiempoPorcentaje.value = (
            (sumaAvance.value / props.data.val().tiempo) *
            100
          ).toFixed(2);
          tiempoAvance.value = sumaAvance.value;
          tiempoNuevoAvance.value = 0;
        });
      }
      if (
        props.data.val().unidad == "Poliza" &&
        Object.keys(props.data.val().volumetrias)[index] === "Poliza"
      ) {
        
        calcPoliza(index);
        update(refDB(database, `avanceProyectos/${props.data.key}`), {
          ingresoFinal:
            store.state.b.ingresoFinal == 0 || store.state.b.ingresoFinal === '$0.00' ? null : store.state.b.ingresoFinal,
        });
        router.go(0);
      }
    }
  );
};

if (props.data.val().volumetrias)
  for (const element in props.data.val().volumetrias) {
    nuevoAvance.value.push(0);
  }

await get(child(refAvance, `avanceProyectos/${props.data.key}`)).then(
  (snapshot) => {
    if (snapshot.exists()) {
      var i = 0;
      if (snapshot.hasChild("volumetrias")) {
        Object.values(snapshot.val().volumetrias).forEach((element) => {
          avance.value.push(element.avance);
          porcentaje.value[i] = (
            (element.avance /
              Object.values(props.data.val().volumetrias)[i].cantidad) *
            100
          ).toFixed(2);
          i++;
        });
      }
      if (snapshot.hasChild("tiempo")) {
        tiempoAvance.value = snapshot.val().tiempo;
        tiempoPorcentaje.value = (
          (snapshot.val().tiempo / props.data.val().tiempo) *
          100
        ).toFixed(2);
      }
    } else {
      for (const element in props.data.val().volumetrias) {
        avance.value.push(0);
        porcentaje.value.push(0);
      }
    }
    if (snapshot.hasChild("rentabilidad")) {
      rentabilidadAvance.value.bruta = snapshot.val().rentabilidad.bruta;
      rentabilidadAvance.value.neta = snapshot.val().rentabilidad.neta;
    }
    if (snapshot.hasChild("ingresoFinal")) {
      store.commit("ingresoFinalSave", snapshot.val().ingresoFinal);
    } else store.commit("ingresoFinalSave", 0.0);
  }
);
</script>
