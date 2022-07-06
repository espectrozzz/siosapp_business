<template>
  <div class="flex h-full w-full justify-center space-x-6 pb-8">
    <div class="flex w-[25%] flex-col justify-between space-y-12">
      <!-- Tiempo -->
      <div class="relative rounded-xl">
        <div
          class="relative mx-auto flex h-24 w-full max-w-md items-center gap-6 overflow-visible rounded-xl bg-[#FAFAFA] pr-4 ring-1 ring-black/5"
        >
          <div
            class="absolute -left-6 flex h-32 w-32 flex-col items-center justify-center rounded-full border bg-white shadow-lg"
          >
            <div class="text-xs">Tiempo total</div>
            <div
              :class="[
                props.coloresRentabilidadTexto.neta,
                'text-lg font-semibold',
              ]"
            >
              {{ props.data.tiempo }} Días
            </div>
          </div>
          <div class="flex w-full flex-col py-5 pl-28">
            <div class="flex justify-between">
              Días realizados
              <span class="text-xl font-semibold">{{
                props.dataFinal.tiempo
              }}</span>
            </div>
            <div class="mt-2 flex flex-col">
              <div class="mb-1 flex justify-between">
                <span class="text-xs font-medium dark:text-white"
                  >Progreso</span
                >
                <span class="text-xs font-medium dark:text-white"
                  >{{
                    (
                      (props.dataFinal.tiempo / props.data.tiempo) *
                      100
                    ).toFixed(2)
                  }}%</span
                >
              </div>
              <div
                class="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700"
              >
                <div
                  :class="[
                    props.coloresRentabilidadFondo.neta,
                    'h-2.5 rounded-full',
                  ]"
                  :style="
                    'width:' +
                    (props.dataFinal.tiempo / props.data.tiempo) * 100 +
                    '%'
                  "
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- volumetrias -->
      <div
        v-for="(value, key) in props.data.volumetrias"
        :key="value"
        class="relative rounded-xl"
      >
        <div
          class="relative mx-auto flex h-24 w-full max-w-md items-center gap-6 overflow-visible rounded-xl bg-[#FAFAFA] pr-4 ring-1 ring-black/5"
        >
          <div
            class="absolute -left-6 flex h-32 w-32 flex-col items-center justify-center rounded-full border bg-white shadow-lg"
          >
            <div class="text-xs">Volumetría</div>
            <div
              :class="[
                props.coloresRentabilidadTexto.neta,
                'text-lg font-semibold',
              ]"
            >
              {{ value.cantidad }} {{ value.unidad }}
            </div>
          </div>
          <div class="flex w-full flex-col py-5 pl-28">
            <div class="flex justify-between">
              Total<span class="text-xl font-semibold"
                >{{ value.cantidad }}{{ value.unidad }}</span
              >
            </div>
            <div class="mt-2 flex flex-col">
              <div class="mb-1 flex justify-between">
                <span class="text-xs font-medium dark:text-white"
                  >Progreso</span
                >
                <span class="text-xs font-medium dark:text-white"
                  >{{
                    (
                      (props.dataFinal.tiempo / props.data.tiempo) *
                      100
                    ).toFixed(2)
                  }}%</span
                >
              </div>
              <div
                class="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700"
              >
                <div
                  :class="[
                    props.coloresRentabilidadFondo.neta,
                    'h-2.5 rounded-full',
                  ]"
                  :style="
                    'width:' +
                    (props.dataFinal.tiempo / props.data.tiempo) * 100 +
                    '%'
                  "
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Gastos y Costos -->
    <div class="flex w-[70%]">
      <div class="flex h-full w-full flex-col justify-around space-y-6">
        <!-- Costo interno -->
        <div
        v-if="props.data.costoInterno"
          class="flex w-full items-center justify-around space-x-4"
        >
          <div class="flex space-x-4">
            <div
              :class="[
                props.colorDegradadoDetalle,
                'h-12 w-12 rounded-full p-1',
              ]"
            >
              <div
                :class="[
                  props.coloresRentabilidadTexto.neta,
                  'flex h-full w-full flex-col items-center justify-center rounded-full bg-white',
                ]"
              >
                <div class="text-xl font-bold">CI</div>
              </div>
            </div>
            <div class="flex flex-col">
              <div>Costo interno</div>
              <div class="text-lg font-bold">
                {{
                  (
                    (props.data.costoInterno.material
                      ? props.data.costoInterno.material
                      : 0) +
                    (props.data.costoInterno.manoDeObra
                      ? props.data.costoInterno.manoDeObra
                      : 0)
                  ).toLocaleString("en", {
                    style: "currency",
                    currency: "MXN",
                  })
                }}
              </div>
            </div>
          </div>

          <div
            :class="[
              props.coloresRentabilidadTexto.fondo,
              'flex items-center justify-center',
            ]"
          >
            <svg
              width="21"
              height="22"
              viewBox="0 0 21 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1153_2577)">
                <path
                  d="M14.6272 11.0038C14.5572 10.7434 14.3474 10.5999 14.1799 10.4282C11.9171 8.126 9.6515 5.8282 7.38586 3.52744C6.87202 3.00564 6.88076 2.47693 7.41208 1.94132C7.96138 1.38499 8.52087 0.837545 9.05704 0.266424C9.36884 -0.0664833 9.60925 -0.103473 9.95602 0.248669C13.3246 3.69167 16.7049 7.12284 20.0939 10.5466C20.4261 10.8825 20.4421 11.1177 20.1055 11.458C16.718 14.8833 13.3377 18.3144 9.96767 21.756C9.61508 22.1155 9.38487 22.0534 9.07453 21.7234C8.43927 21.0458 7.79528 20.3726 7.11486 19.7408C6.69378 19.3502 6.77391 19.0986 7.14108 18.7287C9.50289 16.3555 11.8472 13.9615 14.1944 11.572C14.3605 11.4018 14.582 11.2672 14.6286 11.0038L14.6272 11.0038Z"
                  fill="currentColor"
                />
                <path
                  d="M2.80352 18.1295C2.55874 18.1339 2.44072 18.0007 2.32271 17.8809C1.61606 17.1692 0.923981 16.4427 0.20422 15.7458C-0.157117 15.3952 0.0191808 15.1629 0.288727 14.8921C1.39168 13.7824 2.46987 12.6431 3.59613 11.5601C4.04926 11.1236 4.00555 10.8573 3.57719 10.443C2.48735 9.38954 1.45287 8.27836 0.370319 7.21602C-0.0187014 6.83577 -0.120691 6.56648 0.339723 6.14924C1.00849 5.54261 1.63209 4.88123 2.24694 4.21837C2.57623 3.86327 2.81663 3.79373 3.194 4.18138C5.27315 6.32235 7.37123 8.44408 9.47224 10.5614C9.77092 10.8617 9.82629 11.0925 9.50429 11.4181C7.36832 13.5709 5.244 15.7355 3.11386 17.8942C3.01333 17.9948 2.88657 18.0673 2.80498 18.128L2.80352 18.1295Z"
                  fill="currentColor"
                />
              </g>
              <defs>
                <clipPath id="clip0_1153_2577">
                  <rect
                    width="22"
                    height="20.35"
                    fill="white"
                    transform="translate(20.3501) rotate(90)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
          <!-- detalle -->
          <div class="flex flex-col space-y-4">
            <div class="flex flex-col">
              <div class="text-[#7C8495]">Material</div>
              <div class="text-lg font-bold">
                {{
                  props.data.costoInterno.material
                    ? props.data.costoInterno.material.toLocaleString("en", {
                        style: "currency",
                        currency: "MXN",
                      })
                    : 0
                }}
              </div>
            </div>
            <div class="flex flex-col">
              <div class="text-[#7C8495]">Mano de obra</div>
              <div class="text-lg font-bold">
                {{
                  props.data.costoInterno.manoDeObra
                    ? props.data.costoInterno.manoDeObra.toLocaleString("en", {
                        style: "currency",
                        currency: "MXN",
                      })
                    : 0.0
                }}
              </div>
            </div>
          </div>
        </div>
        <!-- Costo externo -->
        <div v-if="props.data.costoExterno" class="flex justify-around">
          <div class="flex space-x-4 justify-center items-center">
            <div
              :class="[
                props.colorDegradadoDetalle,
                'h-12 w-12 rounded-full p-1',
              ]"
            >
              <div
                :class="[
                  props.coloresRentabilidadTexto.neta,
                  'flex h-full w-full flex-col items-center justify-center rounded-full bg-white',
                ]"
              >
                <div class="text-xl font-bold">CE</div>
              </div>
            </div>
            <div class="flex flex-col">
              <div>Costo externo</div>
              <div class="text-lg font-bold">
                {{
                  (
                    (props.data.costoExterno.material
                      ? props.data.costoExterno.material
                      : 0) +
                    (props.data.costoExterno.manoDeObra
                      ? props.data.costoExterno.manoDeObra
                      : 0)
                  ).toLocaleString("en", {
                    style: "currency",
                    currency: "MXN",
                    currencyDisplay: "symbol",
                  })
                }}
              </div>
            </div>
          </div>
          <div
            :class="[
              props.coloresRentabilidadTexto.fondo,
              'flex items-center justify-center',
            ]"
          >
            <svg
              width="21"
              height="22"
              viewBox="0 0 21 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1153_2577)">
                <path
                  d="M14.6272 11.0038C14.5572 10.7434 14.3474 10.5999 14.1799 10.4282C11.9171 8.126 9.6515 5.8282 7.38586 3.52744C6.87202 3.00564 6.88076 2.47693 7.41208 1.94132C7.96138 1.38499 8.52087 0.837545 9.05704 0.266424C9.36884 -0.0664833 9.60925 -0.103473 9.95602 0.248669C13.3246 3.69167 16.7049 7.12284 20.0939 10.5466C20.4261 10.8825 20.4421 11.1177 20.1055 11.458C16.718 14.8833 13.3377 18.3144 9.96767 21.756C9.61508 22.1155 9.38487 22.0534 9.07453 21.7234C8.43927 21.0458 7.79528 20.3726 7.11486 19.7408C6.69378 19.3502 6.77391 19.0986 7.14108 18.7287C9.50289 16.3555 11.8472 13.9615 14.1944 11.572C14.3605 11.4018 14.582 11.2672 14.6286 11.0038L14.6272 11.0038Z"
                  fill="currentColor"
                />
                <path
                  d="M2.80352 18.1295C2.55874 18.1339 2.44072 18.0007 2.32271 17.8809C1.61606 17.1692 0.923981 16.4427 0.20422 15.7458C-0.157117 15.3952 0.0191808 15.1629 0.288727 14.8921C1.39168 13.7824 2.46987 12.6431 3.59613 11.5601C4.04926 11.1236 4.00555 10.8573 3.57719 10.443C2.48735 9.38954 1.45287 8.27836 0.370319 7.21602C-0.0187014 6.83577 -0.120691 6.56648 0.339723 6.14924C1.00849 5.54261 1.63209 4.88123 2.24694 4.21837C2.57623 3.86327 2.81663 3.79373 3.194 4.18138C5.27315 6.32235 7.37123 8.44408 9.47224 10.5614C9.77092 10.8617 9.82629 11.0925 9.50429 11.4181C7.36832 13.5709 5.244 15.7355 3.11386 17.8942C3.01333 17.9948 2.88657 18.0673 2.80498 18.128L2.80352 18.1295Z"
                  fill="currentColor"
                />
              </g>
              <defs>
                <clipPath id="clip0_1153_2577">
                  <rect
                    width="22"
                    height="20.35"
                    fill="white"
                    transform="translate(20.3501) rotate(90)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
          <!-- detalle -->
          <div class="flex flex-col space-y-4">
            <div class="flex flex-col">
              <div class="text-[#7C8495]">Material</div>
              <div class="text-lg font-bold">
                {{
                  props.data.costoExterno.material
                    ? props.data.costoExterno.material.toLocaleString("en", {
                        style: "currency",
                        currency: "MXN",
                      })
                    : 0
                }}
              </div>
            </div>
            <div class="flex flex-col">
              <div class="text-[#7C8495]">Mano de obra</div>
              <div class="text-lg font-bold">
                {{
                  props.data.costoExterno.manoDeObra
                    ? props.data.costoExterno.manoDeObra.toLocaleString("en", {
                        style: "currency",
                        currency: "MXN",
                      })
                    : 0.0
                }}
              </div>
            </div>
          </div>
        </div>
        <!-- Gastos -->
        <div v-if="props.data.gastos" class="flex justify-around">
          <div class="flex items-center justify-center space-x-4">
            <div
              :class="[
                props.colorDegradadoDetalle,
                'h-12 w-12 rounded-full p-1',
              ]"
            >
              <div
                :class="[
                  props.coloresRentabilidadTexto.neta,
                  'flex h-full w-full flex-col items-center justify-center rounded-full bg-white',
                ]"
              >
                <div class="text-xl font-bold">GA</div>
              </div>
            </div>
            <div class="flex flex-col">
              <div>Gastos</div>
              <div class="text-lg font-bold">
                {{
                  (
                    (props.data.gastos.fijo ? props.data.gastos.fijo : 0) +
                    (props.data.gastos.variable
                      ? props.data.gastos.variable
                      : 0) +
                    (props.data.gastos.nomina ? props.data.gastos.nomina : 0) +
                    (props.data.gastos.otros ? props.data.gastos.otros : 0)
                  ).toLocaleString("en", {
                    style: "currency",
                    currency: "MXN",
                  })
                }}
              </div>
            </div>
          </div>

          <div
            :class="[
              props.coloresRentabilidadTexto.fondo,
              'flex items-center justify-center',
            ]"
          >
            <svg
              width="21"
              height="22"
              viewBox="0 0 21 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1153_2577)">
                <path
                  d="M14.6272 11.0038C14.5572 10.7434 14.3474 10.5999 14.1799 10.4282C11.9171 8.126 9.6515 5.8282 7.38586 3.52744C6.87202 3.00564 6.88076 2.47693 7.41208 1.94132C7.96138 1.38499 8.52087 0.837545 9.05704 0.266424C9.36884 -0.0664833 9.60925 -0.103473 9.95602 0.248669C13.3246 3.69167 16.7049 7.12284 20.0939 10.5466C20.4261 10.8825 20.4421 11.1177 20.1055 11.458C16.718 14.8833 13.3377 18.3144 9.96767 21.756C9.61508 22.1155 9.38487 22.0534 9.07453 21.7234C8.43927 21.0458 7.79528 20.3726 7.11486 19.7408C6.69378 19.3502 6.77391 19.0986 7.14108 18.7287C9.50289 16.3555 11.8472 13.9615 14.1944 11.572C14.3605 11.4018 14.582 11.2672 14.6286 11.0038L14.6272 11.0038Z"
                  fill="currentColor"
                />
                <path
                  d="M2.80352 18.1295C2.55874 18.1339 2.44072 18.0007 2.32271 17.8809C1.61606 17.1692 0.923981 16.4427 0.20422 15.7458C-0.157117 15.3952 0.0191808 15.1629 0.288727 14.8921C1.39168 13.7824 2.46987 12.6431 3.59613 11.5601C4.04926 11.1236 4.00555 10.8573 3.57719 10.443C2.48735 9.38954 1.45287 8.27836 0.370319 7.21602C-0.0187014 6.83577 -0.120691 6.56648 0.339723 6.14924C1.00849 5.54261 1.63209 4.88123 2.24694 4.21837C2.57623 3.86327 2.81663 3.79373 3.194 4.18138C5.27315 6.32235 7.37123 8.44408 9.47224 10.5614C9.77092 10.8617 9.82629 11.0925 9.50429 11.4181C7.36832 13.5709 5.244 15.7355 3.11386 17.8942C3.01333 17.9948 2.88657 18.0673 2.80498 18.128L2.80352 18.1295Z"
                  fill="currentColor"
                />
              </g>
              <defs>
                <clipPath id="clip0_1153_2577">
                  <rect
                    width="22"
                    height="20.35"
                    fill="white"
                    transform="translate(20.3501) rotate(90)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
          <!-- detalle -->
          <div class="flex space-x-4">
            <div class="flex flex-col space-y-4">
              <div class="flex flex-col">
                <div class="text-[#7C8495]">Fijo</div>
                <div class="text-lg font-bold">
                  {{
                    props.data.gastos.fijo
                      ? props.data.gastos.fijo.toLocaleString("en", {
                          style: "currency",
                          currency: "MXN",
                        })
                      : 0
                  }}
                </div>
              </div>
              <div class="flex flex-col">
                <div class="text-[#7C8495]">Mano de obra</div>
                <div class="text-lg font-bold">
                  {{
                    props.data.gastos.variable
                      ? props.data.gastos.variable.toLocaleString("en", {
                          style: "currency",
                          currency: "MXN",
                        })
                      : 0.0
                  }}
                </div>
              </div>
            </div>
            <div class="flex flex-col space-y-4">
              <div class="flex flex-col">
                <div class="text-[#7C8495]">Fijo</div>
                <div class="text-lg font-bold">
                  {{
                    props.data.gastos.fijo
                      ? props.data.gastos.fijo.toLocaleString("en", {
                          style: "currency",
                          currency: "MXN",
                        })
                      : 0
                  }}
                </div>
              </div>
              <div class="flex flex-col">
                <div class="text-[#7C8495]">Mano de obra</div>
                <div class="text-lg font-bold">
                  {{
                    props.data.gastos.variable
                      ? props.data.gastos.variable.toLocaleString("en", {
                          style: "currency",
                          currency: "MXN",
                        })
                      : 0.0
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const porcentaje = ref(100);
const props = defineProps([
  "data",
  "dataFinal",
  "coloresRentabilidadFondo",
  "coloresRentabilidadTexto",
  "colorDegradadoDetalle",
]);
</script>
