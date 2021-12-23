<template lang="pug">
.card.h-100(:class="cardClasses", :style="cardStyle")
  .card-body
    p.lead.font-weight-bold.mt-1(
      :style="titleStyle", 
      :contenteditable="editing", 
      @input="changeTitle"
    ) {{title}}
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
import LinksBlockEditingArea from "@/components/LinksBlockEditingArea.vue";
import { computed } from "@vue/composition-api";
import { useActions, useGetters, useState } from "vuex-composition-helpers";
import { useBlockUI } from "../composables/block";

export default {
  components: {
    LinkItem,
    EditingArea: LinksBlockEditingArea
  },
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
  setup(props) {
    const { ui, editing } = useState(["ui", "editing"]);
    const { cardStyle } = useGetters(["cardStyle"]);
    const { changeBlockTitle } = useActions(["changeBlockTitle"]);

    const { cardClasses } = useBlockUI(ui);

    const titleStyle = computed(() => {
      return {
        color: props.color
      };
    });

    function changeTitle($event) {
      changeBlockTitle({
        blockId: this.id,
        title: $event.target.innerText
      });
    }

    return {
      cardClasses,
      cardStyle,
      changeTitle,
      titleStyle,
      editing
    };
  }
};
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
