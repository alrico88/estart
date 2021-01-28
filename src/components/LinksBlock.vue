<template lang="pug">
  .card.h-100(:class="cardClasses")
    .card-body.text-center
      p.lead.font-weight-bold.mt-1(:style="titleStyle", :contenteditable="editing", @input="changeTitle") {{title}}
      ul.list-unstyled.mb-0
        link-item(
          v-for="(link, index) of links",
          :key="link.id",
          :block-id="id",
          :id="link.id",
          :title="link.name",
          :url="link.url",
          :color="color",
          :position="index",
          :links-in-block="links.length"
        )
    .card-footer.p-2(v-if="editing")
      editing-area(:block-id="id", :block-title="title")
</template>

<script>
import LinkItem from "./LinkItem.vue";
import { mapActions, mapState } from "vuex";
import LinksBlockEditingArea from "@/components/LinksBlockEditingArea.vue";
import BlockMixin from "@/mixins/BlockMixin";

export default {
  components: {
    LinkItem,
    EditingArea: LinksBlockEditingArea
  },
  mixins: [BlockMixin],
  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    links: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  computed: {
    ...mapState(["editing"]),
    titleStyle() {
      return {
        color: this.color
      };
    }
  },
  methods: {
    ...mapActions(["changeBlockTitle"]),
    changeTitle($event) {
      this.changeBlockTitle({
        blockId: this.id,
        title: $event.target.innerText
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  background-color: #2e2e2e;
  border-radius: 6px;

  .card-body {
    padding: 15px 15px;
  }

  h5 {
    margin: 15px;
  }
}
</style>
