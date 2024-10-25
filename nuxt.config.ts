// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
   compatibilityDate: "2024-04-03",
   devtools: { enabled: true },

   future: {
      compatibilityVersion: 4,
   },

   nitro: {
      imports: {
         dirs: ["db"],
      },
      storage: {
         cache: {
            driver: "lruCache",
         },
      },
   },

   modules: ["@nuxt/eslint", "@nuxt/ui", "@vueuse/nuxt"],

   runtimeConfig: {
      cache: {
         maxAge: 60,
         //defaults to 60 seconds
      },
   },
});
