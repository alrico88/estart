<template lang="pug">
.row
  .col
    template(v-if="styleStore.masonry")
      masonry-wall(:items="linksStore.data", :ssr-columns="2", :column-width="300" :gap="16")
        template(#default="{item: block}")
          links-block(
            :id="block.id",
            :title="block.title",
            :links="block.links",
            :color="block.color"
          )
    template(v-else)
      .row.row-cols-1.row-cols-sm-2.row-cols-lg-4.justify-content-center.g-2
        .col(v-for="block of linksStore.data", :key="block.id")
          links-block(
            :id="block.id",
            :title="block.title",
            :links="block.links",
            :color="block.color"
          )
</template>

<script setup lang="ts">
import MasonryWall from "@yeger/vue-masonry-wall";
import { useLinksStore } from "~~/stores/links";
import { useStyleStore } from "~/stores/style";

const linksStore = useLinksStore();
const styleStore = useStyleStore();
</script>
