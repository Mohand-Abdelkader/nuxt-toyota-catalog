<template>
  <div class="bg-primary-500">
    <div class="flex justify-center mt-[120px]">
      <h1 class="font-bold text-3xl">Range</h1>
    </div>

    <div class="flex gap-3">
      <StepSelector
        title="transport distance"
        :options="distanceOptions"
        v-model:value="selectedDistance"
      />
      <StepSelector
        title="Usage Intensity"
        :options="usageOptions"
        v-model:value="selectedUsage"
      />
      <RangeSelector title="Load Capacity" v-model:value="loadCapacity" />
    </div>
    <div class="flex gap-3 mt-4 justify-center align-middle">
      <div
        class="border border-red-400 flex text-red-500 p-4 gap-5"
        v-if="loadCapacity != 0"
      >
        <p>Load Capacity {{ loadCapacity }}</p>
        <button
          @click="resetFilter('loadCapacity')"
          class="flex cursor-pointer"
        >
          <i class="material-icons mr-2">close</i>
        </button>
      </div>
      <div
        class="border border-red-400 flex text-red-500 p-4 gap-5"
        v-if="selectedUsage != null"
      >
        <p>Usage Intensity {{ selectedUsage }}</p>
        <button
          @click="resetFilter('selectedUsage')"
          class="flex cursor-pointer"
        >
          <i class="material-icons mr-2">close</i>
        </button>
      </div>
      <div
        class="border border-red-400 flex text-red-500 p-4 gap-5"
        v-if="selectedDistance != null"
      >
        <p>Transport Distance {{ selectedDistance }}</p>
        <button
          @click="resetFilter('selectedDistance')"
          class="flex cursor-pointer"
        >
          <i class="material-icons mr-2">close</i>
        </button>
      </div>
    </div>

    <div
      class="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[30px]"
    >
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script setup>
const { data: response } = await useFetch(
  "https://api-forklift.code95.info/v1/products/getJson"
);
const { data: filterRes } = await useFetch(
  "https://api-forklift.code95.info/v1/products/filters"
);
// const selectedDistance = ref("Short");
// const selectedUsage = ref("Low");
// const loadCapacity = ref(0);
// const usageOptions = ["Low", "Medium", "High"];
// const distanceOptions = ["Short", "Medium", "Long"];

const selectedDistance = ref(null);
const selectedUsage = ref(null);
const loadCapacity = ref(0);

const selectFilters = computed(
  () => filterRes.value?.data?.["Select-Type"] || []
);

const usageOptions = computed(() => {
  const usage = selectFilters.value.find((f) => f.slug === "usage-intensity");
  return usage ? usage.values.map((v) => v.fields.name) : [];
});

const distanceOptions = computed(() => {
  const distance = selectFilters.value.find(
    (f) => f.slug === "transport-distance"
  );
  return distance ? distance.values.map((v) => v.fields.name) : [];
});

const products = computed(() => response.value?.data || []);
const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    const selectTypes = product.selectTypes || [];
    const numericTypes = product.numericTypes || [];

    // Match usage
    const usage = selectTypes.find((s) => s.slug === "usage-intensity")?.values
      ?.name;
    if (selectedUsage.value && usage !== selectedUsage.value) return false;

    // Match distance
    const distance = selectTypes.find((s) => s.slug === "transport-distance")
      ?.values?.name;
    if (selectedDistance.value && distance !== selectedDistance.value)
      return false;

    // Match load capacity
    const rawCapacity = numericTypes?.[0]?.value ?? "0";
    const load = parseFloat(rawCapacity);
    const selectedLoad = Number(loadCapacity.value);
    if (selectedLoad > 0 && load < selectedLoad) return false;

    return true;
  });
});
const resetFilter = (filterName) => {
  switch (filterName) {
    case "selectedDistance":
      selectedDistance.value = null;
      break;
    case "selectedUsage":
      selectedUsage.value = null;
      break;
    case "loadCapacity":
      loadCapacity.value = 0;
      break;
  }
};
</script>
