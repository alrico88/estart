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
  }),
  getters: {
    cardStyle: (state) => ({
      backgroundColor: chroma(state.cardColor)
        .alpha(opacityInterpolator(Number(state.cardOpacity)) as number)
        .hex(),
    }),
  },
  persist: {
    storage: persistedState.localStorage,
  },
});
