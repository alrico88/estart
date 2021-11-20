import { ref, computed } from "@vue/composition-api";
import capitalize from "lodash/capitalize";

export function useSearch() {
  const query = ref("");

  const providers = ["google", "duckduckgo", "bing"];
  const selectedProvider = ref("google");
  const placeholder = computed(() => {
    return `Search using ${capitalize(selectedProvider.value)}`;
  });

  const searchUrl = computed(() => {
    const urls = {
      google: `https://www.google.com/search?q=${query.value}`,
      duckduckgo: `https://duckduckgo.com/?q=${query.value}`,
      bing: `https://bing.com/?q=${query.value}`
    };

    return urls[selectedProvider.value];
  });

  function goSearch() {
    window.location.assign(searchUrl.value);
  }

  return {
    query,
    providers,
    selectedProvider,
    placeholder,
    searchUrl,
    goSearch
  };
}
