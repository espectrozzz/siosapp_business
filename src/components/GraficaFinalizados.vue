<template>
  <div
    class="relative flex items-center justify-center overflow-hidden rounded-full"
  >
    <svg :height="radius * 2" :width="radius * 2">
      <circle
        class="text-[#FAFAFA]"
        :stroke-width="stroke"
        stroke="currentColor"
        fill="transparent"
        :r="normalizedRadius"
        :cx="radius"
        :cy="radius"
      />
      <g class="origin-center -rotate-90">
        <circle
          :class="props.color"
          :stroke-width="stroke"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="
            circumference - ($props.porcentaje / 100) * circumference
          "
          stroke="currentColor"
          fill="transparent"
          :r="normalizedRadius"
          :cx="radius"
          :cy="radius"
        />
      </g>
      <g filter="url(#filter0_d_1153_1700)" class="z-50">
        <circle cx="150" cy="150" :r="normalizedRadius - 24" fill="blue" />
      </g>
      <defs>
        <filter
          id="filter0_d_1153_1700"
          x="0"
          y="0"
          width="100%"
          height="100%"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"
          />
        </filter>
      </defs>
    </svg>
    <span class="absolute text-blue-700 font-semibold text-2xl" :class="[props.color]"
      >{{ props.porcentaje }}%</span
    >
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const props = defineProps(["porcentaje", "color"]);
const radius = ref(150);
const stroke = ref(45);
const normalizedRadius = ref(radius.value - stroke.value);
const circumference = ref(normalizedRadius.value * 2 * Math.PI);
</script>
