<template>
  <div class="bg-gray-100 p-4 rounded-lg w-full max-w-md">
    <div class="flex items-center mb-3">
      <h3 class="font-semibold text-gray-900 text-sm">{{ title }}</h3>
      <div
        class="ml-2 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs"
      >
        ?
      </div>
    </div>
    <div class="flex justify-between items-end">
      <div
        v-for="(option, index) in options"
        :key="option"
        class="flex flex-col items-center cursor-pointer w-10"
        @click="selectedIndex = index"
      >
        <div
          :class="[
            'w-5 h-5 rounded-full border-2 mt-5',
            selectedIndex === index
              ? 'bg-red-600 border-red-600'
              : 'bg-gray-300 border-gray-300',
          ]"
        ></div>

        <span
          class="text-xs mt-1 block h-4"
          :class="{ 'opacity-0': (index + 1) % 2 === 0 }"
        >
          {{ option }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
const { options, title, value } = defineProps(["options", "title", "value"]);
const emit = defineEmits(["update:value"]);
const selectedIndex = ref(null);

watch(
  () => value,
  (newValue) => {
    if (newValue === null) {
      selectedIndex.value = null;
    } else {
      selectedIndex.value = options.indexOf(newValue);
    }
  }
);

watch(selectedIndex, (index) => {
  if (index !== null && index >= 0) {
    emit("update:value", options[index]);
  } else {
    emit("update:value", null);
  }
});
</script>
