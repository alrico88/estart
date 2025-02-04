<template lang="pug">
.container-md.pb-3.flex-grow-1
  .row.justify-content-center.h-100
    .my-auto(:class="`col-${colSize}`")
      .vstack.gap-3
        .hstack.gap-1.justify-content-between.align-items-end
          clock(v-if="styleStore.clock")
          weather.align-self-end.lead(v-if="styleStore.weather")
        .row(v-if="styleStore.search")
          .col
            search
        .row
          .col
            blocks-area
</template>

<script setup lang="ts">
import { useStyleStore } from "~~/stores/style";

useSeoMeta({
  title: "estart",
  description: "Your customizable private start page",
  keywords: "start page,customizable,private,offline,bookmarks",
});

const styleStore = useStyleStore();

const colSize = computed(() => (styleStore.compact === true ? 10 : 12));
</script>
