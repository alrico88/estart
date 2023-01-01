<template lang="pug">
tr
  td.text-center
    drag-handle
  td
    link-favicon.mx-auto(:link="url", :name="name")
  td
    input.form-control(v-model="url")
  td
    .hstack.gap-2
      input.form-control.flex-grow-1(v-model="name")
      confirm-delete(size="sm", @delete="linksStore.deleteLinkById(blockId, id)")
</template>

<script setup lang="ts">
import { useLinksStore } from "~~/stores/links";

const props = defineProps<{
  blockId: string;
  id: string;
  url: string;
  name: string;
}>();

const { url, name } = useVModels(props);

const linksStore = useLinksStore();
</script>
