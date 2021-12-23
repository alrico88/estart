<template lang="pug">
b-sidebar(
  id="styleSidebar",
  title="Style options",
  bg-variant="dark",
  text-variant="light",
  right
)
  .px-3.py-2
    b-form.text-left
      b-form-group(label="Items to show")
        b-form-checkbox(v-model="clock") Clock
        b-form-checkbox(v-model="search") Search
      b-form-group(label="Appearance")
        b-form-checkbox(v-model="bordered") Bordered
        b-form-checkbox(v-model="shadowed") Shadowed
        b-form-checkbox(v-model="favicon") Favicons
      b-form-group(label="Link alignment")
        b-form-radio-group(v-model="alignment", :options="alignOpts", buttons, size="sm")
      b-form-group(label="Background")
        .text-small
          b-form-group.mb-1(label="Solid color")
            .d-flex.align-items-center
              b-form-input.color-input(label="Body color", type="color", v-model="bodyColor")
              div.ml-2(v-if="resetBodyColorEnabled")
                a.text-white(href="#", @click="resetBackground")
                  b-icon-backspace-fill
          b-form-group(label="Image background", description="Overrides solid color")
            b-form-input(type="text", v-model="backgroundImage")
      b-form-group(label="Elements")
        .text-small
          b-form-group.mb-1(label="Elements color")
            .d-flex.align-items-center
              b-form-input.color-input(label="Elements background color", type="color", v-model="cardColor")
              div.ml-2(v-if="resetCardColorEnabled")
                a.text-white(href="#", @click="resetCard")
                  b-icon-backspace-fill
          b-form-group.mb-1(label="Opacity")
            b-form-input(type="range", :min="0", :max="100", v-model.number="cardOpacity")
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
  BSidebar,
  BFormGroup,
  BFormCheckbox,
  BForm,
  BFormInput,
  BIconBackspaceFill,
  BInputGroup,
  BInputGroupAppend,
  BFormRadioGroup
} from "bootstrap-vue";
import { genUIComputed } from "@/helpers/computed";

export default {
  name: "StyleOptions",
  components: {
    BButton,
    BSidebar,
    BForm,
    BFormGroup,
    BFormCheckbox,
    BInputGroup,
    BInputGroupAppend,
    BFormInput,
    BIconBackspaceFill,
    BFormRadioGroup
  },
  data() {
    return {
      alignOpts: [
        {
          text: "Left",
          value: "left"
        },
        {
          text: "Center",
          value: "center"
        },
        {
          text: "Right",
          value: "right"
        }
      ]
    };
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
    cardOpacity: genUIComputed("cardOpacity"),
    fontFamily: genUIComputed("fontFamily"),
    backgroundImage: genUIComputed("backgroundImage"),
    alignment: genUIComputed("alignment"),
    resetBodyColorEnabled() {
      return this.bodyColor !== "#212121";
    },
    resetCardColorEnabled() {
      return this.cardColor !== "#2e2e2e";
    }
  },
  methods: {
    ...mapActions(["updateUI"]),
    changeUI(element, value) {
      this.updateUI({ element, value });
    },
    resetBackground() {
      this.bodyColor = "#212121";
    },
    resetCard() {
      this.cardColor = "#2e2e2e";
    },
    resetFont() {
      this.fontFamily = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.text-small {
  font-size: 0.8rem;
}
</style>
