import type { Ref } from "nuxt/dist/app/compat/capi";

export function useURL(url: Ref<string>) {
  const isValidURL = computed(() => {
    try {
      new URL(url.value);
      return true;
    } catch (e) {
      return false;
    }
  });

  return {
    isValidURL,
  };
}
