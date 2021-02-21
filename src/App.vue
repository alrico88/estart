<template lang="pug">
#app(:style="mainStyle")
  .container.text-center
    .row.full-height.align-items-center.justify-content-center.py-5
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
    b-toast#update-toast(variant="warning", title="Update available", no-auto-hide)
      p A new version is available, please refresh
      b-button(variant="warning", @click="refreshApp", size="sm") Reload app

</template>

<script>
import Search from "./components/Search.vue";
import BlocksArea from "./components/BlocksArea.vue";
import Clock from "./components/Clock.vue";
import OptionsToggler from "@/components/OptionsToggler.vue";
import ImportExport from "@/components/ImportExport.vue";
import { BModal, BToast, BButton } from "bootstrap-vue";
import StyleOptions from "@/components/StyleOptions.vue";
import { mapGetters, mapState } from "vuex";
import UpdateMixin from "./mixins/UpdateMixin";

export default {
  name: "App",
  mixins: [UpdateMixin],
  components: {
    StyleOptions,
    ImportExport,
    OptionsToggler,
    Search,
    BlocksArea,
    Clock,
    BModal,
    BToast,
    BButton
  },
  computed: {
    ...mapState(["ui"]),
    ...mapGetters(["isCustomFont"]),
    mainStyle() {
      return {
        "--body-color": this.ui.bodyColor,
        "--card-color": this.ui.cardColor,
        "--font-family": this.isCustomFont
          ? this.ui.fontFamily
          : "Jetbrains Mono"
      };
    }
  },
  watch: {
    updateExists: {
      immediate: true,
      handler: function(value) {
        if (value === true) {
          this.$bvToast.show("update-toast");
        }
      }
    }
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
  background: var(--body-color);
  font-family: var(--font-family);

  .full-height {
    min-height: 100vh;
    height: 100%;
  }
}
</style>
