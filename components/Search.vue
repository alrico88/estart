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
import { onWatcherCleanup } from "vue";
import { TRPCClientError } from "@trpc/client";

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

const search = ref("");

watch(search, async (val) => {
  const ac = new AbortController();

  onWatcherCleanup(() => {
    ac.abort();
  });

  try {
    setLoading(true);

    const data = await $client.getSuggestions.query(val, {
      signal: ac.signal,
    });

    suggestions.value = [val, ...data];
  } catch (err) {
    if (
      err instanceof TRPCClientError &&
      err.message !== "This operation was aborted."
    ) {
      console.error({ err });
    }
  } finally {
    setLoading(false);
  }
});

function handleInput({ input }: { input: string }) {
  suggestions.value = [];

  search.value = input;
}

const searchFormatter = new Formatter();

function goSearch(val: string) {
  location.href = searchFormatter.format(providers[searchProvider.value], {
    searchQuery: val,
  });
}
</script>
