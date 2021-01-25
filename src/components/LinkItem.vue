<template lang="pug">
li(:class="linkClass")
  .d-flex
    .flex-grow-1
      a(
        :href="url",
        :style="style",
        @mouseenter="isHovered = true",
        @mouseleave="isHovered = false",
        target="_blank"
      )
        link-favicon(v-if="showFavicons", :link="url", :name="title")
        | {{ title }}
    div(v-if="editing")
      b-icon-arrow-up-circle.ml-2.hover-hand(v-if="!isFirst", @click="move('up')")
      b-icon-arrow-down-circle.ml-2.hover-hand(v-if="!isLast", @click="move('down')")
      b-icon-dash-square.ml-2.text-danger.hover-hand(@click="prepareLinkDelete")
</template>

<script>
import { mapActions, mapState } from "vuex";
import {
  BIconDashSquare,
  BIconArrowUpCircle,
  BIconArrowDownCircle
} from "bootstrap-vue";
import LinkFavicon from "./LinkFavicon.vue";

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
    BIconDashSquare,
    BIconArrowUpCircle,
    BIconArrowDownCircle,
    LinkFavicon
  },
  data() {
    return {
      isHovered: false
    };
  },
  computed: {
    ...mapState(["editing", "ui"]),
    showFavicons() {
      return this.ui.favicon;
    },
    style() {
      return {
        color: this.isHovered ? this.color : "#9e9e9e"
      };
    },
    linkClass() {
      return {
        "text-left": this.editing
      };
    },
    isFirst() {
      return this.position === 0;
    },
    isLast() {
      return this.position === this.linksInBlock - 1;
    }
  },
  methods: {
    ...mapActions(["deleteLink", "moveLink"]),
    prepareLinkDelete() {
      const res = confirm("Are you sure?");
      if (res) {
        this.deleteLink({ blockId: this.blockId, linkId: this.id });
      }
    },
    move(direction) {
      const { blockId, position } = this;
      this.moveLink({ blockId, currentIndex: position, direction });
    }
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
</style>
