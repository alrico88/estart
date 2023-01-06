<template lang="pug">
.container-md.pb-3.flex-grow-1
  .row.justify-content-center.h-100
    .my-auto(:class="`col-${colSize}`")
      .vstack.gap-3
        .row(v-if="styleStore.clock")
          .col
            clock
        .row(v-if="styleStore.search")
          .col
            search
        .row
          .col
            blocks-area
</template>

<script setup lang="ts">
import { useStyleStore } from "~~/stores/style";

useHead({
  title: "estart",
  meta: [
    {
      name: "description",
      content: "Your customizable private start page",
    },
  ],
});

const styleStore = useStyleStore();

const colSize = computed(() => (styleStore.compact === true ? 10 : 12));
</script>
