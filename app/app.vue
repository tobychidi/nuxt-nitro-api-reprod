<script lang="ts" setup>
useHead({
   title: "Nuxt x Nitro",
});

useColorMode().preference = "dark";
</script>
<template>
   <nuxt-layout>
      <nuxt-page />
   </nuxt-layout>
</template>

<style>
@import "tailwindcss";
@import "@nuxt/ui";
</style>
