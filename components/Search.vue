<template lang="pug">
.hstack.gap-2
  type-ahead.form-control(
    :items="suggestions",
    @on-input="handleInput",
    @select-item="goSearch",
    :placeholder="`Search using ${searchProvider}`"
  )
  div
    b-input-group
      b-form-select(
        v-model="searchProvider",
        :options="Object.keys(providers)"
      )
      template(#append)
        b-input-group-text(v-if="loading")
          icon(name="svg-spinners:6-dots-rotate")
</template>

<script setup lang="ts">
import Formatter from "string-object-formatter";
import TypeAhead from "vue3-simple-typeahead";

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

const getSuggestions = useDebounceFn(async (search: string): Promise<void> => {
  try {
    setLoading(true);

    const data = await $client.getSuggestions.query(search);

    suggestions.value = [search, ...data];
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
}, 200);

function handleInput({ input }: { input: string }) {
  suggestions.value = [];

  getSuggestions(input);
}

const searchFormatter = new Formatter();

function goSearch(val: string) {
  location.href = searchFormatter.format(providers[searchProvider.value], {
    searchQuery: val,
  });
}
</script>
