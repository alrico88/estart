export default defineNuxtConfig({
  ssr: false,
  build: {
    transpile: ["trpc-nuxt"],
  },
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
    "@vite-pwa/nuxt",
  ],
  fontMetrics: {
    fonts: ["Source Sans Pro"],
  },
  pwa: {
    manifest: {
      name: "estart",
      description: "Simple and private start page",
      theme_color: "#212121",
      icons: [
        {
          src: "pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
    },
    client: {
      installPrompt: true,
    },
    workbox: {
      navigateFallback: "/",
      globPatterns: ["**/*.{js,css,html,png,svg,ico,woff,woff2}"],
      cleanupOutdatedCaches: true,
    },
  },
  piniaPersistedstate: {
    storage: "localStorage",
  },
  runtimeConfig: {
    redisUrl: "",
    redisPass: "",
    encryptPass: "",
  },
});
