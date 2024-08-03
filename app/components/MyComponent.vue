<script lang="ts" setup>
const props = defineProps<{
   count: number;
}>();
</script>

<template>
   <div>
      <h2>The current count is: {{ count }}</h2>
   </div>
</template>
