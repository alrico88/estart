<template lang="pug">
.row
  .col
    b-form
      b-form-group
        .d-flex
          .flex-grow-1
            b-form-input.text-center(
              :class="inputClasses",
              size="lg",
              type="text",
              :placeholder="placeholder",
              @keydown="handleKeyDown",
              v-model="query",
              autofocus,
              @focus="captureFocus",
              @blur="releaseFocus",
              autocomplete="off"
            )
          div(v-if="editing")
            b-form-select(size="lg", :options="providers", v-model="selectedProvider")
    suggestions(
      :suggestions="suggestions", 
      @search="setQuery",
      :is-focused="isFocused",
      :hovered="hovered",
      :loading="loading"
    )
</template>

<script>
import { BForm, BFormGroup, BFormInput, BFormSelect } from "bootstrap-vue";
import { mapState } from "vuex";
import { useFocus } from "../composables/focus";
import { useHoverer } from "../composables/hoverer";
import { useSearch } from "../composables/search";
import { useSuggestions } from "../composables/suggestions";
import { keyEmitter } from "../emitters/suggestions";
import Suggestions from "./Suggestions.vue";

export default {
  components: {
    BForm,
    BFormGroup,
    BFormInput,
    BFormSelect,
    Suggestions
  },
  computed: {
    ...mapState(["editing", "ui"]),
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
  setup() {
    const {
      query,
      providers,
      selectedProvider,
      placeholder,
      goSearch
    } = useSearch();

    const { isFocused, captureFocus, releaseFocus } = useFocus();

    function setQuery(val) {
      query.value = val;

      console.log(val, "buscando");

      goSearch();
    }

    const { suggestions, loading } = useSuggestions(query);
    const { hovered } = useHoverer(suggestions);

    function handleKeyDown(event) {
      if (event.key === "Enter") {
        event.preventDefault();

        if (hovered.value === -1) {
          goSearch();
        } else {
          setQuery(suggestions.value[hovered.value]);
        }
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        keyEmitter.emit("down");
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        keyEmitter.emit("up");
      }
    }

    return {
      query,
      providers,
      selectedProvider,
      placeholder,
      setQuery,
      isFocused,
      captureFocus,
      releaseFocus,
      handleKeyDown,
      hovered,
      loading,
      suggestions
    };
  }
};
</script>
