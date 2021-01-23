<template lang="pug">
.row
  .col
    .row.row-cols-1.row-cols-sm-2.row-cols-md-4.justify-content-center(v-for="chunk of blockChunks")
      .col.my-3(v-for="block of chunk")
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
import { mapState } from "vuex";
import chunk from "lodash/chunk";

export default {
  components: {
    LinksBlock,
    NewBlock
  },
  data() {
    return {
      maxBlocksPerChunk: 4
    };
  },
  computed: {
    ...mapState(["blocks", "editing"]),
    blockChunks() {
      const { blocks, maxBlocksPerChunk } = this;
      const chunked = chunk(blocks, maxBlocksPerChunk);
      const notFullYet = chunked.some(d => d.length < maxBlocksPerChunk);

      return notFullYet ? chunked : [...chunked, []];
    }
  }
};
</script>

<style></style>
