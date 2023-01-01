<template lang="pug">
div.h-100(:class="cardClasses", :style="cardStyle")
  .p-3
    .lead.fw-bolder.mb-3(:style="{color}") {{title}}
    ul.list-unstyled.mb-0
      link-item(
        v-for="link of links",
        :key="link.id",
        :name="link.name",
        :url="link.url",
        :color="color"
      )
</template>

<script setup lang="ts">
import { Link } from "~~/models/Link";
import { useStyleStore } from "~~/stores/style";
import type { StyleValue } from "vue";
import chromajs from "chroma-js";
import { createLinearInterpolator } from "scale-helper-functions";

const props = defineProps<{
  title: string;
  color: string;
  links: Link[];
}>();

const { links } = useVModels(props);

const styleStore = useStyleStore();

const cardClasses = computed(() => {
  const classes = ["rounded", `text-${styleStore.alignment}`];

  if (styleStore.bordered) {
    classes.push("border border-light");
  }

  if (styleStore.shadowed) {
    classes.push("shadow");
  }

  return classes;
});

const opacityInterpolator = createLinearInterpolator([0, 100]);

const cardStyle = computed<StyleValue>(() => {
  return {
    backgroundColor: chromajs(styleStore.cardColor)
      .alpha(opacityInterpolator(Number(styleStore.cardOpacity)) as number)
      .hex(),
  };
});
</script>

<style lang="scss" scoped>
.card {
  border-radius: 6px;

  .card-body {
    padding: 15px 15px;
  }

  h5 {
    margin: 15px;
  }
}
</style>
