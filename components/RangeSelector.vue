<template>
  <div class="bg-gray-200 p-6 rounded-lg shadow-sm">
    <div class="flex items-center mb-4">
      <h3 class="font-semibold text-gray-900">{{ title }}</h3>
      <div
        class="ml-2 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center"
      >
        <span class="text-white text-xs">?</span>
      </div>
    </div>
    <input
      min="0"
      max="7000"
      type="range"
      v-model.number="loadCapacity"
      class="w-full appearance-none h-2 bg-red-100 rounded-lg outline-none accent-red-600"
    />
    <div class="w-full flex items-center justify-between mt-2 gap-1.5">
      <input
        type="number"
        v-model="loadCapacity"
        class="w-20 text-sm border border-gray-300 rounded-lg p-1"
      />
      <span class="text-gray-500">-</span>
      <input
        type="text"
        disabled
        value="7000"
        class="w-20 text-sm border border-gray-300 rounded-lg p-1"
      />
    </div>
  </div>
</template>

<script setup>
const { title } = defineProps(["title"]);
const emit = defineEmits(["update:value"]);
const loadCapacity = ref(0);

watch(loadCapacity, (newValue) => {
  if (newValue < 0) {
    loadCapacity.value = 0;
  } else if (newValue > 7000) {
    loadCapacity.value = 7000;
  }
  emit("update:value", loadCapacity.value);
});
</script>
