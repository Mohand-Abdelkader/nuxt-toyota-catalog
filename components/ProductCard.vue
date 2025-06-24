<template>
  <div class="bg-white rounded-lg shadow-sm hover:shadow-md">
    <div class="p-6">
      <div
        class="aspect-square rounded-lg mb-4 flex items-center justify-center overflow-hidden"
      >
        <img
          :src="product.featured_image"
          :alt="product.name"
          class="object-contain hover:scale-105 transition-transform duration-300"
          width="195px"
          height="195px"
        />
      </div>

      <div class="text-center">
        <h3
          class="text-red-600 font-semibold text-[16px] mb-1 tracking-wide uppercase"
        >
          {{ product.name }}
        </h3>
        <p class="text-sm font-medium text-[#282830] mb-1">
          {{ product.code }}
        </p>
        <p class="text-sm mb-4 uppercase font-medium">
          {{ `Capacity: ` }}
          <span class="text-red-600">{{ product.numericTypes[0].value }}</span>
        </p>

        <button
          class="bg-red-600 hover:bg-red-700 text-white font-medium text-sm rounded-2xl py-[16px] px-[27px]"
        >
          VIEW PRODUCT
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const { product } = defineProps(["product"]);
</script>
