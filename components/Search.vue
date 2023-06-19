<template lang="pug">
n-config-provider(:theme="darkTheme")
  .hstack.gap-2
    n-auto-complete(
      size="large",
      :options="suggestions",
      :loading="loading",
      @update:value="getSuggestions",
      @select="(e) => goSearch(e.toString())",
      :placeholder="`Search using ${searchProvider}`"
    )
    div
      select.form-select(v-model="searchProvider")
        option(
          v-for="provider of Object.keys(providers)", 
          :key="provider", 
          :value="provider"
        ) {{ provider }}
</template>

<script setup lang="ts">
import { NAutoComplete, NConfigProvider, darkTheme } from "naive-ui";
import Formatter from "string-object-formatter";

const { loading, setLoading } = useLoader();

const providers = {
  Google: "https://www.google.com/search?q={searchQuery}",
  Bing: "https://www.bing.com/search?q={searchQuery}",
  DuckDuckGo: "https://duckduckgo.com/?q={searchQuery}",
};

const searchProvider = useLocalStorage<keyof typeof providers>(
  "searchProvider",
  "Google"
);

const suggestions = shallowRef<string[]>([]);

const { $client } = useNuxtApp();

async function getSuggestions(search: string): Promise<void> {
  try {
    setLoading(true);

    const data = await $client.getSuggestions.query(search);

    suggestions.value = [search, ...data];
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
}

const searchFormatter = new Formatter();

function goSearch(val: string) {
  location.href = searchFormatter.format(providers[searchProvider.value], {
    searchQuery: val,
  });
}
</script>
