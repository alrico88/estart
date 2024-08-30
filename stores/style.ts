import chroma from "chroma-js";
import { createLinearInterpolator } from "scale-helper-functions";

const opacityInterpolator = createLinearInterpolator([0, 100]);

export const useStyleStore = defineStore("styleStore", {
  state: () => ({
    // Cards
    bordered: false,
    shadowed: false,
    favicon: false,
    // UI
    clock: true,
    search: true,
    weather: false,
    // Links
    openInNewTab: true,
    // Customization
    compact: false,
    bodyColor: "#212121",
    cardColor: "#2e2e2e",
    cardOpacity: "100",
    backgroundImage: "",
    textColor: "#fafafa",
    fontFamily: "Noto Sans",
    alignment: "center",
    masonry: false,
    faviconProvider: "google",
  }),
  getters: {
    cardStyle: (state) => ({
      backgroundColor: chroma(state.cardColor)
        .alpha(opacityInterpolator(Number(state.cardOpacity)) as number)
        .hex(),
    }),
    faviconProviderUrl: (state) => {
      const providerUrls = {
        google: "https://www.google.com/s2/favicons?sz=64&domain_url=",
        favi: "https://favi.vercel.app/image?url=",
      };

      return providerUrls[state.faviconProvider as keyof typeof providerUrls];
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
});
