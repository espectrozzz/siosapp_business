<template>
  <div class="flex w-full h-auto space-x-[4%] pb-6">
    <div class="flex flex-col w-[32%] bg-fondo-gris-claro rounded-2xl p-8">
      <!-- Icono / Nombre proyecto / Funciones -->
      <div class="flex flex-col w-full items-center justify-center space-y-6">
        <!-- icono -->
        <div class="w-28 h-28 rounded-full bg-fondo-gris"></div>
        <!-- Nombre proyecto / Funciones -->
        <div class="flex flex-row w-full items-center justify-center space-x-6">
          <div
            class="w-auto h-auto max-w-[30%] truncate"
            :title="nombre"
          >
            {{ nombre }}
          </div>
          <div
            class="w-auto h-auto max-w-[30%] truncate"
            :title="nombre"
          >
            <img src="/img/arrow.svg" alt="" />
          </div>
        </div>
      </div>
      <!-- FIN Icono / Nombre proyecto / Funciones -->
      <!-- Fecha creación / estado -->
      <div class="flex flex-col w-full space-y-4 mt-14">
        <div class="flex w-full items-center">
          <div class="font-semibold text-lg w-[50%] min-w-[60%]">
            Fecha de creación:
          </div>
          <div class="flex text-base w-[40%] justify-end">{{ creado }}</div>
        </div>
        <div class="flex w-full items-center">
          <div class="font-semibold text-lg w-[40%]">Estado:</div>
          <div class="flex text-base w-[70%] justify-end">{{ estado }}</div>
        </div>
      </div>
      <!-- Fin fecha creación / estado -->
      <!-- Ingreso total -->
      <div
        class="flex flex-col justify-center items-center w-full space-y-4 mt-14"
      >
        <div class="text-lg font-semibold">Ingresos totales</div>
        <div>{{ iTotal }}</div>
      </div>
      <!-- Fin ingreso total -->
      <div
        class="flex flex-col justify-center items-center w-full space-y-4 mt-14"
      >
      <!-- Volumetrías -->
     <div class="flex w-full font-semibold"> Volumetrías </div>
        <div
          class="flex flex-col py-2 px-8 bg-fondo-gris rounded-lg min-w-[70%]"
          v-for="(volumen, key) in volumetrias"
          :key="volumen"
        >
          <div class="text-base">{{ key }}</div>
          <div class="font-semibold text-lg w-full">
            {{ volumen.cantidad }} {{ volumen.unidad }}
          </div>
        </div>
        <div
          class="flex flex-col py-2 px-8 bg-fondo-gris rounded-lg min-w-[70%]"
          v-if="tiempo"
        >
          <div class="text-base">Tiempo</div>
          <div class="font-semibold text-lg w-full">{{ tiempo }} días</div>
        </div>
      </div>
    </div>
    <div class="flex flex-col space-y-[4%] w-[32%]">
      <!-- Costo Interno -->
      <div class="flex flex-col space-y-6 bg-fondo-gris-claro rounded-2xl p-8 h-[32%] min-h-[32%]">
        <div class="text-lg font-semibold">Costo Interno</div>
        <div class="flex w-full justify-center items-center space-x-[10%]">
          <div class="flex flex-col w-[35%]">
            <label for="costoInternoMaterial">Material</label>
            <input
              v-model="costoInternoMaterial"
              @change="totalCostoInterno"
              class="bg-fondo-gris rounded-lg border-none"
              type="number"
              min="0"
            />
          </div>
          <div class="flex flex-col w-[35%]">
            <label for="costoInternoMaterial">Mano de obra</label>
            <input
              v-model="costoInternoManoObra"
              @change="totalCostoInterno"
              class="bg-fondo-gris rounded-lg border-none"
              type="number"
              min="0"
            />
          </div>
        </div>
        <div
          class="flex justify-end items-center w-full space-x-4"
          v-if="costoInternoMaterial || costoInternoManoObra"
        >
          <div>Total |</div>
          <div class="truncate font-semibold text-lg" :title="costoInternoTotal">
            {{ costoInternoTotal }} mxn
          </div>
        </div>
      </div>
      <!-- Costo Externo -->
      <div class="flex flex-col space-y-6 bg-fondo-gris-claro rounded-2xl p-8 h-[32%] min-h-[32%]">
        <div class="text-lg font-semibold">Costo Externo</div>
        <div class="flex w-full justify-center items-center space-x-[10%]">
          <div class="flex flex-col w-[35%]">
            <label for="costoInternoMaterial">Material</label>
            <input
              v-model="costoExternoMaterial"
              @change="totalCostoExterno"
              class="bg-fondo-gris rounded-lg border-none"
              type="number"
              min="0"
            />
          </div>
          <div class="flex flex-col w-[35%]">
            <label for="costoInternoMaterial">Mano de obra</label>
            <input
              v-model="costoExternoManoObra"
              @change="totalCostoExterno"
              class="bg-fondo-gris rounded-lg border-none"
              type="number"
              min="0"
            />
          </div>
        </div>
        <div
          class="flex justify-end items-center w-full space-x-4"
          v-if="costoExternoMaterial || costoExternoManoObra"
        >
          <div>Total |</div>
          <div class="truncate font-semibold text-lg" :title="costoExternoTotal">
            {{ costoExternoTotal }} mxn
          </div>
        </div>
      </div>
      <!-- Gastos Administrativos -->
      <div class="flex flex-col space-y-2 bg-fondo-gris-claro rounded-2xl p-8 h-[32%] min-h-[32%]">
        <div class="text-lg font-semibold">Gastos Administrativos</div>
        <div class="flex w-full justify-center items-center space-x-[10%]">
          <div class="flex flex-col w-[35%]">
            <label for="gastoFijo">Fijo</label>
            <input
              v-model="gastoFijo"
              @change="totalGastos"
              class="bg-fondo-gris rounded-lg border-none"
              type="number"
              min="0"
            />
          </div>
          <div class="flex flex-col w-[35%]">
            <label for="gastoNomina">Nomina</label>
            <input
              v-model="gastoNomina"
              @change="totalGastos"
              class="bg-fondo-gris rounded-lg border-none"
              type="number"
              min="0"
            />
          </div>
        </div>
        <div class="flex w-full justify-center items-center space-x-[10%]">
          <div class="flex flex-col w-[35%]">
            <label for="gastoVariable">Variable</label>
            <input
              v-model="gastoVariable"
              @change="totalGastos"
              class="bg-fondo-gris rounded-lg border-none"
              type="number"
              min="0"
            />
          </div>
          <div class="flex flex-col w-[35%]">
            <label for="gastoOtros">Otros</label>
            <input
              v-model="gastoOtros"
              @change="totalGastos"
              class="bg-fondo-gris rounded-lg border-none"
              type="number"
              min="0"
            />
          </div>
        </div>
        <div
          class="flex justify-end w-full space-x-4 items-center"
          v-if="gastoFijo || gastoNomina || gastoVariable || gastoOtros"
        >
          <div>Total |</div>
          <div class="truncate font-semibold text-lg" :title="gastoTotal">{{ gastoTotal }} mxn</div>
        </div>
      </div>
    </div>
    <div class="flex flex-col items-center p-8 w-[32%] bg-white space-y-[4%]">
      <div class="text-lg font-semibold">Rentabilidad parcial</div>
      <div class="flex flex-col items-center">
        <div class="text-lg font-semibold">Bruta</div>
        <div
          class="
            flex
            w-36
            h-36
            rounded-full
            bg-fondo-gris
            items-center
            justify-center
            truncate
          "
        >
          <div class="truncate w-auto max-w-[50%]" :title="rentabilidadBruta">
            {{ rentabilidadBruta }}
          </div>
          <div class="truncate w-[10%]">%</div>
        </div>
      </div>
      <div class="flex flex-col items-center">
        <div class="text-lg font-semibold">Neta</div>
        <div
          class="
            flex
            w-36
            h-36
            rounded-full
            bg-fondo-gris
            items-center
            justify-center
            truncate
          "
        >
          <div class="truncate w-auto max-w-[50%]" :title="rentabilidadNeta">
            {{ rentabilidadNeta }}
          </div>
          <div class="truncate w-[10%]">%</div>
        </div>
      </div>
      <div
        class="
          flex flex-col
          justify-center
          items-center
          space-y-[50%]
          h-full
          w-full
        "
      >
        <button
          class="px-6 p-2 bg-fondo-gris-claro rounded-lg"
          @click="$router.push('/proyectos')"
        >
          Proyectos
        </button>
        <button
          v-if="(costoInternoTotal || costoExternoTotal) && gastoTotal"
          class="px-6 p-2 bg-fondo-gris-claro rounded-lg"
          @click="$store.commit('openModalConfirmacion')"
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
      console.log(snapshot.val());
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
      iTotal.value = snapshot.val().ingresoTotal.toLocaleString("en", {
        style: "currency",
        currency: "MXN",
      });
      if (snapshot.hasChild("volumetrias")) {
        volumetrias.value = snapshot.val().volumetrias
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