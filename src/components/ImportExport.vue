<template lang="pug">
b-modal(
  ref="modal",
  header-border-variant="dark",
  footer-border-variant="dark",
  :ok-only="true",
  ok-variant="dark",
  ok-title="Close",
)
  template(#modal-header)
    .d-flex.align-items-center.w-100
      .flex-grow-1
        b-tabs(v-model="shownOption", pills, size="sm", variant="secondary")
          b-tab(title="Export")
          b-tab(title="Import")
      div
        b-button-close.text-white(@click="closeModal")
  .row(v-show="shownOption === 0")
    .col
      p Save this code and import it in another browser
      b-form
        b-form-group
          b-form-textarea(readonly, :rows="5", :value="getBlocksHash()")
        b-button(
          size="sm",
          v-clipboard:copy="getBlocksHash()",
          v-clipboard:success="successClip",
          v-clipboard:error="errorClip"
        )
          b-icon-clipboard
          |  Copy to clipboard
  .row(v-show="shownOption === 1")
    .col
      b-form(@submit.prevent="performImport")
        b-form-group(label="Paste your config hash here", description="Warning: it will overwrite your current configuration")
          b-form-textarea(v-model="importHash", :rows="5")
        b-button(type="submit", variant="success", size="sm", :disabled="disableRunImport")
          b-icon-play
          |  Run import

</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {
  BForm,
  BFormGroup,
  BFormTextarea,
  BButton,
  BModal,
  BTabs,
  BTab,
  BButtonClose,
  BIconClipboard,
  BIconPlay
} from "bootstrap-vue";
import ToastMixin, { toastVariants } from "@/mixins/ToastMixin";

export default {
  name: "ImportExport",
  components: {
    BForm,
    BFormGroup,
    BFormTextarea,
    BButton,
    BModal,
    BTabs,
    BTab,
    BButtonClose,
    BIconClipboard,
    BIconPlay
  },
  mixins: [ToastMixin],
  data() {
    return {
      importHash: "",
      shownOption: 0
    };
  },
  computed: {
    ...mapGetters(["getBlocksHash"]),
    disableRunImport() {
      return this.importHash === "";
    }
  },
  methods: {
    ...mapActions(["importBlocks"]),
    performImport() {
      const res = this.importBlocks(this.importHash);
      let message, variant;
      if (res) {
        message = "Imported successfully";
        variant = toastVariants.SUCCESS;
      } else {
        message = "Error importing configuration";
        variant = toastVariants.ERROR;
      }
      this.showToast("Import", message, variant);
      this.closeModal();
    },
    openModal() {
      this.$refs.modal.show();
    },
    closeModal() {
      this.$refs.modal.hide();
    },
    successClip() {
      this.showToast(
        "Clipboard",
        "Copied hash to clipboard",
        toastVariants.SUCCESS
      );
    },
    errorClip() {
      this.showToast(
        "Clipboard",
        "Error copying to clipboard",
        toastVariants.ERROR
      );
    }
  }
};
</script>
