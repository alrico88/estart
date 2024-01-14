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
        { name: "author", content: "Alberto Rico" },
        {
          name: "google-site-verification",
          content: "nc0pKffQdhm679g_eXEQhjK-NzBM8ZbyFQLR9ZMeJtc",
        },
      ],
      htmlAttrs: {
        "data-bs-theme": "dark",
      },
    },
  },
  css: ["@/assets/main.scss"],
  modules: [
    "nuxt-icon",
    "@vueuse/nuxt",
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "storeToRefs"],
      },
    ],
    "@pinia-plugin-persistedstate/nuxt",
    "@vite-pwa/nuxt",
    "@bootstrap-vue-next/nuxt",
    "@nuxtjs/google-fonts",
    "@nuxtjs/fontaine",
  ],
  fontMetrics: {
    fonts: ["Noto Sans"],
  },
  nitro: {
    prerender: {
      routes: ["/", "/edit", "/backup", "/style"],
    },
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
  googleFonts: {
    families: {
      "Noto+Sans": [400, 600, 700, 800],
    },
  },
});
