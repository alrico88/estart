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
        b-form-checkbox(v-model="bordered") Bordered
        b-form-checkbox(v-model="shadowed") Shadowed
        b-form-checkbox(v-model="favicon") Favicons
      b-form-group(label="Behaviour")
        b-form-checkbox(v-model="newTab") Open links in new tab
</template>

<script>
import { mapActions, mapState } from "vuex";
import { BModal, BFormGroup, BFormCheckbox, BForm } from "bootstrap-vue";
import { genUIComputed } from "@/helpers/computed";

export default {
  name: "StyleOptions",
  components: {
    BModal,
    BForm,
    BFormGroup,
    BFormCheckbox
  },
  computed: {
    ...mapState(["ui"]),
    bordered: genUIComputed("bordered"),
    shadowed: genUIComputed("shadowed"),
    favicon: genUIComputed("favicon"),
    clock: genUIComputed("clock"),
    search: genUIComputed("search"),
    newTab: genUIComputed("openInNewTab")
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
    }
  }
};
</script>

<style scoped></style>
