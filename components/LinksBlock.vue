<template lang="pug">
.h-100(:class="cardClasses", :style="cardStyle")
  .p-3
    .lead.fw-bolder.mb-3(:style="{ color }") {{ title }}
    ul.list-unstyled.mb-0(:class="listClass.parent")
      link-item(
        v-for="link of links",
        :key="link.id",
        :name="link.name",
        :url="link.url",
        :color="color",
        :class="listClass.children"
      )
</template>

<script setup lang="ts">
import { Link } from "~~/models/Link";
import { useStyleStore } from "~~/stores/style";

const props = defineProps<{
  title: string;
  color: string;
  links: Link[];
}>();

const { links } = useVModels(props);

const styleStore = useStyleStore();
const { cardStyle } = storeToRefs(styleStore);

const cardClasses = computed(() => [
  "rounded",
  `text-${styleStore.alignment}`,
  {
    shadow: styleStore.shadowed,
    ["border border-right"]: styleStore.bordered,
  },
]);

const listClass = computed(() =>
  styleStore.inline
    ? {
        parent: "list-inline",
        children: "list-inline-item p-1",
      }
    : {
        parent: "list",
        children: "list-item",
      }
);
</script>
