import { computed } from "@vue/composition-api";

export function useURL(url) {
  const isValidURL = computed(() => {
    try {
      new URL(url.value);
      return true;
    } catch (e) {
      return false;
    }
  });

  return {
    isValidURL
  };
}
