<template lang="pug">
.row.row-cols-1.row-cols-sm-2.row-cols-lg-4.justify-content-center.g-3
  .col(v-for="block of linksStore.data", :key="block.id")
    links-block(
      :id="block.id",
      :title="block.title",
      :links="block.links",
      :color="block.color"
    )
</template>

<script setup lang="ts">
import { useLinksStore } from "~~/stores/links";

const linksStore = useLinksStore();
</script>
