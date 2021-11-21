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
import { useState } from "vuex-composition-helpers";
import { useFocus } from "../composables/focus";
import { useHoverer } from "../composables/hoverer";
import { useSearch } from "../composables/search";
import { useSuggestions } from "../composables/suggestions";
import { keyEmitter } from "../emitters/suggestions";
import Suggestions from "./Suggestions.vue";
import { computed } from "@vue/composition-api";

export default {
  components: {
    BForm,
    BFormGroup,
    BFormInput,
    BFormSelect,
    Suggestions
  },
  setup() {
    const { editing, ui } = useState(["editing", "ui"]);

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

    const inputClasses = computed(() => {
      const classes = [];

      if (ui.value.shadowed) {
        classes.push("shadow");
      }

      if (ui.value.bordered) {
        classes.push("border-secondary");
      }

      return classes;
    });

    return {
      editing,
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
      suggestions,
      inputClasses
    };
  }
};
</script>
