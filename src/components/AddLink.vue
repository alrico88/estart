<template lang="pug">
  .card.bg-dark.border-secondary
    .card-body
      b-form.text-left(@submit="prepareLink")
        h5 New link
        b-form-group(label="Name", size="sm")
          b-form-input(type="text", size="sm", v-model="linkName")
        b-form-group(label="URL")
          b-form-input(type="text", size="sm", v-model="linkUrl")
        b-button(type="submit", :disabled="notReady", variant="primary", size="sm") Add
        b-button.ml-2(variant="secondary", size="sm", @click="cancel") Discard
</template>

<script>
import { Link } from "@/helpers/classes";
import { mapActions } from "vuex";
import { BForm, BFormGroup, BFormInput, BButton } from "bootstrap-vue";

export default {
  name: "AddLink",
  props: {
    blockId: {
      type: String,
      required: true
    }
  },
  components: {
    BFormInput,
    BForm,
    BFormGroup,
    BButton
  },
  data() {
    return {
      linkName: "",
      linkUrl: ""
    };
  },
  computed: {
    isValidURL() {
      try {
        new URL(this.linkUrl);
        return true;
      } catch (e) {
        return false;
      }
    },
    notReady() {
      return this.linkName === "" || this.linkUrl === "" || !this.isValidURL;
    }
  },
  methods: {
    ...mapActions(["addLink"]),
    prepareLink() {
      const { linkName, linkUrl } = this;

      this.addLink({
        blockId: this.blockId,
        link: new Link(linkName, linkUrl)
      });

      this.$emit("done");
    },
    cancel() {
      this.$emit("cancelled");
    }
  }
};
</script>
