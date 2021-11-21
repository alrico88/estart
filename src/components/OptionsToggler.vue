<template lang="pug">
.ul.list-inline.edit-toggler
  li.list-inline-item
    a.text-success(href="#", v-show="editing", @click.prevent="toggleEditing") Done editing
    a(href="#", v-show="!editing", @click.prevent="toggleEditing") Edit
  li.list-inline-item.cursor-default -
  li.list-inline-item
    a(href="#", @click.prevent="openStyleModal") Style
  li.list-inline-item.cursor-default -
  li.list-inline-item
    a(href="#", @click.prevent="openImportExportModal") Import / export
</template>

<script>
import { useActions, useState } from "vuex-composition-helpers";

export default {
  name: "OptionsToggler",
  emit: ["open-ie-modal", "open-style-modal"],
  setup(_, { emit }) {
    const { editing } = useState(["editing"]);
    const { toggleEditing } = useActions(["toggleEditing"]);

    function openImportExportModal() {
      emit("open-ie-modal");
    }

    function openStyleModal() {
      emit("open-style-modal");
    }

    return {
      editing,
      toggleEditing,
      openImportExportModal,
      openStyleModal
    };
  }
};
</script>

<style lang="scss" scoped>
.edit-toggler {
  position: absolute;
  top: 10px;
  right: 10px;
  a,
  li {
    color: #4c4c4c;
    &:hover {
      color: white;
    }
  }
}

.cursor-default:hover {
  cursor: default;
}
</style>
