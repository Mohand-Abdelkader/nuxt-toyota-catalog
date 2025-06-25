<template>
  <div
    class="border border-red-400 flex text-red-500 p-4 gap-5"
    v-if="filter != initialValue"
  >
    <p>{{ filterTitle }} {{ filter }}</p>
    <button @click="resetFilter('loadCapacity')" class="flex cursor-pointer">
      <i class="material-icons mr-2">close</i>
    </button>
  </div>
</template>

<script setup>
const { filter, initialValue, filterTitle } = defineProps([
  "filter",
  "initialValue",
  "filterTitle",
]);
const emit = defineEmits(["resetFilter"]);

function resetFilter(filterName) {
  emit("resetFilter", filterName);
}
</script>
