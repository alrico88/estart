export const useStyleStore = defineStore("styleStore", {
  state: () => {
    return {
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
      fontFamily: "Source Sans Pro",
      alignment: "center",
      masonry: false,
    };
  },
  persist: {
    storage: persistedState.localStorage,
  },
});
