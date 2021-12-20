<template lang="pug">
.row
  .col
    .row.row-cols-1.row-cols-sm-2.row-cols-lg-4.justify-content-center(v-for="chunk of blockChunks")
      .col.my-3(v-for="block of chunk", :key="block.id")
        links-block(
          :id="block.id",
          :title="block.title",
          :links="block.links",
          :color="block.color"
        )
      .col.my-3(v-if="editing && chunk.length < maxBlocksPerChunk")
        new-block
</template>

<script>
import LinksBlock from "./LinksBlock.vue";
import NewBlock from "@/components/NewBlock.vue";
import chunk from "lodash/chunk";
import { computed } from "@vue/composition-api";
import { useState } from "vuex-composition-helpers";

export default {
  components: {
    LinksBlock,
    NewBlock
  },
  setup() {
    const { blocks, editing } = useState(["blocks", "editing"]);
    const maxBlocksPerChunk = 4;

    const blockChunks = computed(() => {
      {
        const chunked = chunk(blocks.value, maxBlocksPerChunk);
        const notFullYet = chunked.some(d => d.length < maxBlocksPerChunk);

        return notFullYet ? chunked : [...chunked, []];
      }
    });

    return {
      maxBlocksPerChunk,
      blocks,
      editing,
      blockChunks
    };
  }
};
</script>
