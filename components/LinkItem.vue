<template lang="pug">
li.link-item-elem
  .hstack.gap-2.align-items-center(
    :class="`justify-content-${styleStore.alignment}`"
  )
    link-favicon.flex-shrink-0(
      v-if="styleStore.favicon",
      :link="url",
      :name="name"
    )
    .text-truncate
      nuxt-link.link-hover(
        :title="name",
        :to="url",
        :target="styleStore.openInNewTab ? '_blank' : '_self'"
      ) {{ name }} #[icon(name="tabler:arrow-right")]
</template>

<script setup lang="ts">
import { useStyleStore } from "~~/stores/style";

const props = defineProps<{
  name: string;
  url: string;
  color: string;
}>();

const styleStore = useStyleStore();
</script>

<style lang="scss" scoped>
.link-hover {
  text-decoration: none;
  color: v-bind("styleStore.textColor");

  &:hover {
    color: v-bind("color");
  }
}
</style>
