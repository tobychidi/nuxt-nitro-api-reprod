<script lang="ts" setup>
const items = [
   {
      label: "Houses",
      to: "/houses",
   },
   {
      label: "Cars",
      to: "/cars",
   },
];
</script>

<template>
   <div class="min-h-screen max-w-5xl px-8 py-4 mx-auto space-y-8">
      <div class="flex justify-between">
         <nuxt-link to="/">
            <h1 class="text-2xl font-bold">Nuxt x Nitro</h1>
         </nuxt-link>
         <u-navigation-menu :items variant="link" highlight class="w-fit" />
      </div>
      <slot />
   </div>
</template>
