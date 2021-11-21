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
import AddLink from "@/components/AddLink.vue";
import { reactive, computed, toRefs } from "@vue/composition-api";
import { useActions } from "vuex-composition-helpers";

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
  setup(props) {
    const { removeBlock } = useActions(["removeBlock"]);
    const { blockId, blockTitle } = toRefs(props);

    const ui = reactive({
      addLink: false,
      deleteBlock: false
    });

    const showMenu = computed(() => !ui.addLink && !ui.deleteBlock);

    function toggleLinkAdd() {
      ui.addLink = true;
    }

    function deleteBlock() {
      const res = confirm(`Do you really want to delete ${blockTitle.value}?`);
      if (res) {
        removeBlock(blockId.value);
      }
    }

    function resetUI() {
      ui.deleteBlock = false;
      ui.addLink = false;
    }

    return {
      ui,
      toggleLinkAdd,
      deleteBlock,
      resetUI,
      showMenu
    };
  }
};
</script>
