<script lang="ts" setup>
const count = ref<number>(0);

useHead({
   title: "Nuxt x Eslint",
});
</script>
<template>
   <div>
      <header>
         <h1>Nuxt x Eslint</h1>
      </header>
      <main>
         <MyComponent :count />
         <button class="btn" @click="count++">Increment</button>
      </main>
   </div>
</template>

<style>
* {
   margin: 0;
   box-sizing: border-box;
   border: none;
}
body {
   background-color: #110519;
   color: white;
   font-family: Poppins sans-serif;
   font-size: 14pt;

   @media (min-width: 1080px) {
      font-size: 18pt;
   }
}
h1 {
   font-family: Jaro, sans-serif;
   font-size: 2em;
   text-transform: uppercase;
}
header {
   padding: 1em 16%;
}

main {
   padding: 1em 20%;
}

.btn {
   padding: 0.5em 1em;
   font-size: 0.7em;
   font-weight: bold;
   text-transform: uppercase;
   border-radius: 0.5em;
   cursor: pointer;
   border: solid 2px transparent;
   transition: all 0.3s;

   &:hover {
      background-color: #110519;
      color: #fff;
      border: solid 2px #fff;
   }
}
</style>
<style scoped>
.btns {
   display: flex;
   flex-wrap: wrap;
   gap: 1em;
}
</style>
