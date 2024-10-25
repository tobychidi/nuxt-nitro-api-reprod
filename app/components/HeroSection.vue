<template>
   <header class="p-8 space-y-4">
      <div class="text-center">
         <slot name="header">
            <h1 class="text-4xl font-bold text-gray-900">Default Header</h1>
         </slot>
      </div>
      <div class="text-center">
         <slot name="subheader" />
      </div>
      <div class="text-center">
         <slot name="content">
            <p class="text-base text-gray-600">Default content goes here.</p>
         </slot>
      </div>
      <div class="text-center">
         <slot name="actions">
            <u-button color="primary" size="lg">Call to Action</u-button>
         </slot>
      </div>
   </header>
</template>
