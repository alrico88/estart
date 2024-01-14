<template lang="pug">
tr
  td.text-center
    drag-handle
  td
    link-favicon.mx-auto(:link="url", :name="name")
  td
    b-form-input(v-model="url")
  td
    .hstack.gap-2
      b-form-input.flex-grow-1(v-model="name")
      confirm-delete(
        size="sm",
        @delete="linksStore.deleteLinkById(blockId, id)"
      )
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
