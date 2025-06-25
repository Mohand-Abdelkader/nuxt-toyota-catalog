<template>
  <div class="bg-primary-500">
    <Header />

    <div class="gap-3 mb-10 flex justify-start w-full min-h-min">
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

    <!-- this is to reset the filter -->
    <div class="flex gap-3 mt-4 justify-center align-middle">
      <ClearFilter
        :filter="selectedDistance"
        :initialValue="null"
        filterTitle="Transport Distance"
        @resetFilter="resetFilter('selectedDistance')"
      />
      <ClearFilter
        :filter="loadCapacity"
        :initialValue="0"
        filterTitle="Load Capacity"
        @resetFilter="resetFilter('loadCapacity')"
      />
      <ClearFilter
        :filter="selectedUsage"
        :initialValue="null"
        filterTitle="Usage Intensity"
        @resetFilter="resetFilter('selectedUsage')"
      />
    </div>

    <!-- <div
      class="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[30px]"
    > -->
    <TransitionGroup
      name="list"
      tag="ul"
      class="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[30px]"
    >
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
      />
    </TransitionGroup>
    <!-- </div> -->
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

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
