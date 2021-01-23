<template lang="pug">
  b-form
    b-form-group
      .d-flex
        .flex-grow-1
          b-form-input.text-center(
            :class="inputClasses",
            size="lg",
            type="text",
            :placeholder="placeholder",
            @keydown.enter.prevent="goSearch",
            v-model="query"
          )
        div(v-if="editing")
          b-form-select(size="lg", :options="providers", v-model="selectedProvider")
</template>

<script>
import { BForm, BFormGroup, BFormInput, BFormSelect } from "bootstrap-vue";
import { mapState } from "vuex";

export default {
  components: {
    BForm,
    BFormGroup,
    BFormInput,
    BFormSelect
  },
  data() {
    return {
      query: "",
      providers: ["google", "duckduckgo", "bing"],
      selectedProvider: "google"
    };
  },
  computed: {
    ...mapState(["editing", "ui"]),
    placeholder() {
      const provider = this.selectedProvider;
      return `Search using ${this.capitalize(provider)}`;
    },
    searchUrl() {
      const { query } = this;
      const urls = {
        google: `https://www.google.com/search?q=${query}`,
        duckduckgo: `https://duckduckgo.com/?q=${query}`,
        bing: `https://bing.com/?q=${query}`
      };

      return urls[this.selectedProvider];
    },
    inputClasses() {
      const classes = [];
      const ui = this.ui;

      if (ui.shadowed) {
        classes.push("shadow");
      }

      if (ui.bordered) {
        classes.push("border-secondary");
      }

      return classes;
    }
  },
  methods: {
    goSearch() {
      window.location.assign(this.searchUrl);
    },
    capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }
};
</script>

<style lang="scss" scoped></style>
