<template lang="pug">
  b-modal(
    ref="modal",
    title="Style options",
    header-border-variant="dark",
    footer-border-variant="dark",
    :ok-only="true",
    ok-variant="dark",
    ok-title="Close",
  )
    b-form
      b-form-group(label="Items to show")
        b-form-checkbox(v-model="clock") Clock
        b-form-checkbox(v-model="search") Search
      b-form-group(label="Appearance")
        .d-flex.align-items-center
          .color-input-parent.mr-2
            b-form-input.color-input(label="Body color", type="color", v-model="bodyColor")
          div Background
          div.ml-2(v-if="resetBodyColorEnabled")
            a.text-white(href="#", @click="resetBackground")
              b-icon-backspace-fill
        b-form-checkbox(v-model="bordered") Bordered
        b-form-checkbox(v-model="shadowed") Shadowed
        b-form-checkbox(v-model="favicon") Favicons
      b-form-group(label="Custom font family", description="Font must be installed in your system")
        b-input-group
          b-form-input(
            type="text",
            placeholder="Ex.: Fira Code",
            v-model="fontFamily"
          )
          b-input-group-append(v-if="isCustomFont")
            b-button(variant="outline-secondary", @click="resetFont") Back to default
      b-form-group(label="Behaviour")
        b-form-checkbox(v-model="newTab") Open links in new tab
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import {
  BButton,
  BModal,
  BFormGroup,
  BFormCheckbox,
  BForm,
  BFormInput,
  BIconBackspaceFill,
  BInputGroup,
  BInputGroupAppend
} from "bootstrap-vue";
import { genUIComputed } from "@/helpers/computed";

export default {
  name: "StyleOptions",
  components: {
    BButton,
    BModal,
    BForm,
    BFormGroup,
    BFormCheckbox,
    BInputGroup,
    BInputGroupAppend,
    BFormInput,
    BIconBackspaceFill
  },
  computed: {
    ...mapState(["ui"]),
    ...mapGetters(["isCustomFont"]),
    bordered: genUIComputed("bordered"),
    shadowed: genUIComputed("shadowed"),
    favicon: genUIComputed("favicon"),
    clock: genUIComputed("clock"),
    search: genUIComputed("search"),
    newTab: genUIComputed("openInNewTab"),
    bodyColor: genUIComputed("bodyColor"),
    cardColor: genUIComputed("cardColor"),
    fontFamily: genUIComputed("fontFamily"),
    resetBodyColorEnabled() {
      return this.bodyColor !== "#212121";
    }
  },
  methods: {
    ...mapActions(["updateUI"]),
    changeUI(element, value) {
      this.updateUI({ element, value });
    },
    openModal() {
      this.$refs.modal.show();
    },
    closeModal() {
      this.$refs.modal.hide();
    },
    resetBackground() {
      this.bodyColor = "#212121";
    },
    resetFont() {
      this.fontFamily = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.color-input-parent {
  .color-input {
    width: 1rem;
    height: 1rem;
    padding: 0;
    border: #adb5bd solid 1px;
  }
}
</style>
