import { capitalize } from "lodash-es";

export function useSearch() {
  const query = ref("");

  enum Providers {
    google = "Google",
    duckduckgo = "DuckDuckGo",
    bing = "Bing",
  }

  const providers = [Providers.google, Providers.duckduckgo, Providers.bing];
  const selectedProvider = ref<Providers>(Providers.google);
  const placeholder = computed(() => {
    return `Search using ${capitalize(selectedProvider.value)}`;
  });

  const searchUrl = computed(() => {
    const urls = {
      [Providers.google]: `https://www.google.com/search?q=${query.value}`,
      [Providers.duckduckgo]: `https://duckduckgo.com/?q=${query.value}`,
      [Providers.bing]: `https://bing.com/?q=${query.value}`,
    };

    return urls[selectedProvider.value];
  });

  function goSearch(): void {
    window.location.assign(searchUrl.value);
  }

  return {
    query,
    providers,
    selectedProvider,
    placeholder,
    searchUrl,
    goSearch,
  };
}
