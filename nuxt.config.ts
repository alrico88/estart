export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      title: "estart",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#212121" },
      ],
      htmlAttrs: {
        "data-bs-theme": "dark",
      },
    },
  },
  css: ["@/assets/main.scss", "@fontsource/source-sans-pro/index.css"],
  modules: [
    "nuxt-icon",
    "@nuxtjs/fontaine",
    "@vueuse/nuxt",
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "storeToRefs"],
      },
    ],
    "@pinia-plugin-persistedstate/nuxt",
    "@kevinmarrec/nuxt-pwa",
  ],
  fontMetrics: {
    fonts: ["Source Sans Pro"],
  },
  pwa: {
    manifest: {
      name: "estart",
      description: "Simple and private start page",
      theme_color: "#212121",
    },
  },
  piniaPersistedstate: {
    storage: "localStorage",
  },
});
