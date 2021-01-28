<template lang="pug">
  .row
    .col
      // Editing options
      .row.p-1(v-if="showMenu")
        .col
          ul.list-unstyled.mb-0
            li
              a(href="#", @click.prevent="toggleLinkAdd") Add link
            li
              a.text-danger(href="#", @click.prevent="deleteBlock") Delete block
      .row(v-if="ui.addLink")
        .col
          add-link(:block-id="blockId", @done="resetUI", @cancelled="resetUI")
</template>

<script>
import {
  BForm,
  BFormGroup,
  BFormInput,
  BIconPlus,
  BIconTrash
} from "bootstrap-vue";
import { mapActions } from "vuex";
import AddLink from "@/components/AddLink.vue";

export default {
  name: "LinksBlockEditingArea",
  props: {
    blockId: {
      type: String,
      required: true
    },
    blockTitle: {
      type: String,
      required: true
    }
  },
  components: {
    BIconPlus,
    BIconTrash,
    BForm,
    BFormGroup,
    BFormInput,
    AddLink
  },
  data() {
    return {
      ui: {
        addLink: false,
        deleteBlock: false
      }
    };
  },
  computed: {
    showMenu() {
      const { ui } = this;
      return ui.addLink === false && ui.deleteBlock === false;
    }
  },
  methods: {
    ...mapActions(["removeBlock"]),
    toggleLinkAdd() {
      this.ui.addLink = true;
    },
    deleteBlock() {
      const res = confirm(`Do you really want to delete ${this.blockTitle}?`);
      if (res) {
        this.removeBlock(this.blockId);
      }
    },
    resetUI() {
      this.ui.addLink = false;
      this.ui.deleteBlock = false;
    }
  }
};
</script>

<style scoped></style>
