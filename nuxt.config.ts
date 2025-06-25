// https://nuxt.com/docs/api/configuration/nuxt-config
import colors from "tailwindcss/colors";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  tailwindcss: {
    config: {
      theme: {
        extend: {
          colors: { primary: "#ce190a" },
        },
      },
    },
  },
  app: {
    head: {
      title: "",
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/icon?family=Material+Icons",
        },
      ],
    },
  },
});
