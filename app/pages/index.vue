<script lang="ts" setup></script>
<template>
   <header>
      <hero-section>
         <template #header>
            <h1 class="text-5xl font-extrabold">
               Type Inference Issues in Nuxt API Routes
            </h1>
         </template>
         <template #content>
            <p class="text-lg">
               I'm experiencing a persistent issue with type inference in Nuxt,
               specifically with the get route returning
               <code>{ [x: string]: never; }</code>
               while the post route infers correctly. This is affecting my project's
               ability to handle type checks effectively. Explicit typing resolves the
               issue, but it's not ideal.
            </p>
         </template>
         <template #actions>
            <u-button size="lg" to="/houses">Investigate</u-button>
            <u-button color="neutral" size="lg" class="ml-4">Learn More</u-button>
         </template>
      </hero-section>
   </header>

   <main class="space-y-4">
      <u-card class="max-w-2xl mx-auto">
         <template #header>Satisfaction since Nuxt</template>
         <line-chart :height="300" />
      </u-card>
   </main>
</template>
