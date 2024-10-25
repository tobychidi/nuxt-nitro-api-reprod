<script lang="ts" setup>
import { VisXYContainer, VisLine } from "@unovis/vue";

defineProps<{
   height?: number;
}>();

const data = ref([
   { x: 0, y: 0 },
   { x: 1, y: 2 },
   { x: 3, y: 4 },
   { x: 5, y: 8 },
   { x: 6, y: 7 },
   { x: 8, y: 11 },
   { x: 9, y: 14 },
]);

const x = (d: { x: number }) => d.x;
const y = (d: { y: number }) => d.y;
</script>

<template>
   <VisXYContainer :height :data>
      <svg style="position: absolute">
         <defs>
            <linearGradient id="gradient" gradientTransform="rotate(125)">
               <stop offset="0%" stop-color="#00BF72" />
               <stop offset="45%" stop-color="#004D7A" />
               <stop offset="90%" stop-color="#FFB200" />
            </linearGradient>
         </defs>
      </svg>
      <VisLine :x :y color="url(#gradient)" :line-width="2" />
      <!-- <VisAxis type="x" /> -->
      <!-- <VisAxis type="y" /> -->
   </VisXYContainer>
</template>
