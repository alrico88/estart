<template lang="pug">
.container.pb-3
  .row.pb-3
    .col
      h4.fw-bolder.mb-0 Edit links
  draggable.row.row-cols-1.g-3(
    v-model="linksStore.data",
    item-key="id",
    handle=".column-drag-handle"
  )
    template(#item="{ element, index }")
      .col
        edit-link-block(
          :key="element.id",
          :index="index",
          :id="element.id",
          v-model:links="element.links",
          v-model:title="element.title",
          v-model:color="element.color"
        )
  b-button.w-100.mt-3(variant="outline-light", @click="linksStore.addBlock") #[icon(name="bi:plus-circle")] Add new block
</template>

<script setup lang="ts">
import { useLinksStore } from "~~/stores/links";
import draggable from "vuedraggable";

useSeoMeta({
  title: "Edit links - estart",
});

const linksStore = useLinksStore();
</script>
