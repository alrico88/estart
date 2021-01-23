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
import { mapActions, mapState } from "vuex";

export default {
  name: "OptionsToggler",
  computed: {
    ...mapState(["editing"])
  },
  methods: {
    ...mapActions(["toggleEditing"]),
    openImportExportModal() {
      this.$emit("open-ie-modal");
    },
    openStyleModal() {
      this.$emit("open-style-modal");
    }
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
