<template lang="pug">
.container.text-center
  .row.vh-100.align-items-center.justify-content-center.py-5
    .col-12
      .row.mb-4(v-if="ui.clock")
        .col
          clock
      .row.mb-5.justify-content-center(v-if="ui.search")
        .col-8
          search
      .row
        .col
          blocks-area
  options-toggler(@open-ie-modal="openImportModal", @open-style-modal="openStyleModal")
  style-options(ref="styleModal")
  import-export(ref="importExportModal")
</template>

<script>
import Search from "./components/Search.vue";
import BlocksArea from "./components/BlocksArea.vue";
import Clock from "./components/Clock.vue";
import OptionsToggler from "@/components/OptionsToggler.vue";
import ImportExport from "@/components/ImportExport.vue";
import { BModal } from "bootstrap-vue";
import StyleOptions from "@/components/StyleOptions.vue";
import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    StyleOptions,
    ImportExport,
    OptionsToggler,
    Search,
    BlocksArea,
    Clock,
    BModal
  },
  computed: {
    ...mapState(["ui"])
  },
  methods: {
    openImportModal() {
      this.$refs.importExportModal.openModal();
    },
    openStyleModal() {
      this.$refs.styleModal.openModal();
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
