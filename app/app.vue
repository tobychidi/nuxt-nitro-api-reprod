<script lang="ts" setup>
const action = ref();
const { data, status } = await useFetch("/api/counter", {
   query: { action: action },
});

// const pending = computed(() => ["pending"].includes(status.value));

function reset() {
   action.value = undefined;
   action.value = "reset";
}
function decrement() {
   action.value = undefined;
   action.value = "decrement";
}

function increment() {
   action.value = undefined;
   action.value = "increment";
}

watch([data], () => {
   console.log(data.value);
});

useHead({
   title: "Nuxt x Console Ninja",
});
</script>
<template>
   <div>
      <header>
         <h1>Nuxt x Console Ninja</h1>
      </header>
      <main>
         <h2>Server based counter:{{ data?.count }}</h2>
         <p>{{ data?.message }}</p>
         <div class="btns">
            <button class="btn" @click="reset">Reset</button>
            <button class="btn" @click="decrement">Decrement</button>
            <button class="btn" @click="increment">Increment</button>
         </div>
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
   font-size: 18pt;
}
h1 {
   font-family: Jaro, sans-serif;
   font-size: 2em;
   text-transform: uppercase;
}
header {
   padding: 1em 4em;
}

main {
   padding: 1em 6em;
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
   gap: 1em;
}
</style>
