<script lang="ts" setup>
import { ref, computed } from "vue";

const page = ref(1);
const limit = 6;
const searchTerm = ref("");
const searchTermDebounced = refDebounced(searchTerm, 200);

const { data, error, status } = useLazyFetch("/api/houses", {
   query: { page, limit, search: searchTermDebounced },
   dedupe: "cancel",
});

const houses = computed(() => {
   return {
      data: data.value?.data ?? [],
      total: data.value?.total ?? 0,
   };
});
const isLoading = computed(() => status.value === "pending");
</script>

<template>
   <hero-section>
      <template #header>
         <h1 class="text-5xl font-extrabold">Houses List</h1>
      </template>
      <template #content>
         <p class="text-lg text-gray-500">Find your dream house.</p>
      </template>
      <template #actions>
         <u-button size="lg">Contact Us</u-button>
         <u-button color="neutral" size="lg" class="ml-4">Learn More</u-button>
      </template>
   </hero-section>

   <div v-if="error" class="rounded-lg p-4 text-red-500">Error: {{ error.message }}</div>
   <div v-else class="space-y-8">
      <div class="flex gap-4">
         <u-input
            v-model="searchTerm"
            placeholder="Search by adress..."
            class="flex-1"
            leading-icon="heroicons:magnifying-glass" />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 relative">
         <u-icon
            name="formkit:spinner"
            class="m-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 animate-spin invisible opacity-0 scale-90 transition delay-300 peer"
            :class="[isLoading && data && 'visible opacity-100 scale-100']"
            :size="48" />

         <u-skeleton
            v-for="i in limit"
            :key="i"
            class="h-40 w-full mt-4 rounded-md hidden"
            :class="[isLoading && !data && 'block']" />

         <template v-if="data">
            <u-card
               v-for="house in houses.data"
               :key="house.id"
               class="transition peer-[.visible]:opacity-50">
               <template #header>{{ house.address }}</template>
               <p>Price: {{ house.price }}</p>
               <p>Owner: {{ house.ownerId }}</p>
            </u-card>
         </template>
      </div>
      <u-pagination
         v-model:page="page"
         :total="houses.total"
         :items-per-page="limit"
         class="w-fit mx-auto" />
   </div>
</template>
