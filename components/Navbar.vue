<template>
  <header class="bg-white p-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div>
          <img
            src="https://img.forconstructionpros.com/files/base/acbm/fcp/image/2019/01/toyota_logo.5c3772f5d3f32.png?auto=format%2Ccompress&q=70"
            width="144px"
            height="47px"
            alt="toyota logo"
          />
        </div>

        <div class="flex items-center space-x-8">
          <nav class="flex space-x-8">
            <NuxtLink
              href="#"
              class="text-gray-700 hover:text-red-600 font-medium transition-colors"
            >
              PRODUCTS
            </NuxtLink>
            <NuxtLink
              href="#"
              class="text-gray-700 hover:text-red-600 font-medium transition-colors"
            >
              SERVICES
            </NuxtLink>
            <NuxtLink
              href="#"
              class="text-gray-700 hover:text-red-600 font-medium transition-colors"
            >
              TRAINING
            </NuxtLink>
            <NuxtLink
              href="#"
              class="text-gray-700 hover:text-red-600 font-medium transition-colors"
            >
              ABOUT US
            </NuxtLink>
          </nav>

          <div class="flex items-center space-x-4">
            <button class="flex">
              <i class="material-icons mr-2">search</i>
            </button>
            <button
              class="bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-4 px-7 rounded-[18px]"
            >
              GET QUOTE
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
