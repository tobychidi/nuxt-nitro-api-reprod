<script lang="ts" setup>
import { ref, computed } from "vue";

const page = ref(1);
const limit = 6;
const searchTerm = ref("");
const searchTermDebounced = refDebounced(searchTerm, 200);

const { data, error, status } = useLazyFetch("/api/cars", {
   query: { page, limit, search: searchTermDebounced },
   dedupe: "cancel",
});
const cars = computed(() => ({
   data: data.value?.data ?? [],
   total: data.value?.total ?? 0,
}));
const isLoading = computed(() => status.value === "pending");
</script>

<template>
   <hero-section>
      <template #header>
         <h1 class="text-5xl font-extrabold">Cars List</h1>
      </template>
      <template #content>
         <p class="text-lg text-gray-500">Explore our wide range of cars.</p>
      </template>
      <template #actions>
         <u-button size="lg">Contact Us</u-button>
         <u-button color="neutral" size="lg" class="ml-4">Learn More</u-button>
      </template>
   </hero-section>

   <div v-if="error" class="rounded-lg p-4">Error: {{ error.message }}</div>
   <div v-else class="space-y-8">
      <div class="flex gap-4">
         <u-input
            v-model="searchTerm"
            placeholder="Search by make, model, or year..."
            class="flex-1"
            leading-icon="heroicons:magnifying-glass" />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
         <!-- Loading State -->
         <u-icon
            name="formkit:spinner"
            class="m-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 animate-spin invisible opacity-0 scale-90 transition delay-300 peer"
            :class="[isLoading && data && 'visible opacity-100 scale-100']"
            :size="48" />

         <!-- Skeleton Loading -->
         <u-skeleton
            v-for="i in limit"
            :key="i"
            class="h-40 w-full rounded-md hidden"
            :class="[isLoading && !data && 'block']" />

         <!-- Car Cards -->
         <template v-if="data">
            <u-card
               v-for="car in cars.data"
               :key="car.id"
               class="transition peer-[.visible]:opacity-50">
               <template #header>{{ car.make }} {{ car.model }}</template>
               <p>Year: {{ car.year }}</p>
               <p>Owner: {{ car.ownerId }}</p>
            </u-card>
         </template>
      </div>

      <u-pagination
         v-model:page="page"
         :total="cars.total"
         :items-per-page="limit"
         class="w-fit mx-auto" />
   </div>
</template>
