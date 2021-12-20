<template lang="pug">
li(:class="linkClass")
  .d-flex.align-items-center
    .flex-grow-1.truncate-parent
      .truncate
        b-link(
          :href="url",
          :style="style",
          @mouseenter="isHovered = true",
          @mouseleave="isHovered = false",
          :target="linkTarget"
        )
          link-favicon(v-if="showFavicons", :link="url", :name="title")
          | {{ title }}
    div.tool-buttons.text-right(v-if="editing")
      b-icon-arrow-up-circle.ml-2.hover-hand(v-if="!isFirst", @click="move('up')")
      b-icon-arrow-down-circle.ml-2.hover-hand(v-if="!isLast", @click="move('down')")
      b-icon-dash-square.ml-2.text-danger.hover-hand(@click="prepareLinkDelete")
</template>

<script>
import {
  BLink,
  BIconDashSquare,
  BIconArrowUpCircle,
  BIconArrowDownCircle
} from "bootstrap-vue";
import LinkFavicon from "./LinkFavicon.vue";
import { useState, useActions } from "vuex-composition-helpers";
import { ref, computed, toRefs } from "@vue/composition-api";

export default {
  props: {
    blockId: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    position: {
      type: Number,
      required: true
    },
    linksInBlock: {
      type: Number,
      required: true
    }
  },
  components: {
    BLink,
    BIconDashSquare,
    BIconArrowUpCircle,
    BIconArrowDownCircle,
    LinkFavicon
  },
  setup(props) {
    const { position, blockId, id, linksInBlock, color } = toRefs(props);

    const { deleteLink, moveLink } = useActions(["deleteLink", "moveLink"]);
    const { editing, ui } = useState(["editing", "ui"]);

    const isHovered = ref(false);

    const showFavicons = computed(() => ui.value.favicon);
    const style = computed(() => {
      return {
        color: isHovered.value ? color.value : "#9e9e9e"
      };
    });
    const linkClass = computed(() => {
      return {
        "text-left": editing.value
      };
    });

    const isFirst = computed(() => position.value === 0);
    const isLast = computed(() => position.value === linksInBlock.value - 1);

    const linkTarget = computed(() =>
      ui.value.openInNewTab ? "_blank" : "_self"
    );

    function prepareLinkDelete() {
      const res = confirm("Are you sure?");
      if (res) {
        deleteLink({ blockId: blockId.value, linkId: id.value });
      }
    }

    function move(direction) {
      moveLink({
        blockId: blockId.value,
        currentIndex: position.value,
        direction
      });
    }

    return {
      isHovered,
      showFavicons,
      style,
      linkClass,
      isFirst,
      isLast,
      linkTarget,
      prepareLinkDelete,
      move,
      ui,
      editing
    };
  }
};
</script>

<style lang="scss" scoped>
a:hover {
  text-decoration: none;
}

.hover-hand:hover {
  cursor: pointer;
}

.truncate-parent {
  min-width: 0;
}

.truncate {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.tool-buttons {
  min-width: 80px;
}
</style>
