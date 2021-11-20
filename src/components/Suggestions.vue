<template lang="pug">
.w-100.float-left.position-absolute.on-top(v-show="isFocused")
  b-list-group
    template(v-if="loading")
      b-list-group-item.list-bg.text-white
        b-spinner
    template(v-else)
      b-list-group-item.list-bg.text-white(
        v-for="(suggestion, index) of suggestions", 
        :key="suggestion", 
        button,
        @click="() => acceptSuggestion(suggestion)"
        :active="index === hovered"
      ) {{ suggestion }}
</template>

<script>
import { BSpinner, BListGroup, BListGroupItem } from "bootstrap-vue";

export default {
  props: {
    suggestions: {
      type: Array,
      required: false,
      default: () => []
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    },
    isFocused: {
      type: Boolean,
      required: false,
      default: false
    },
    hovered: {
      type: Number,
      required: false,
      default: -1
    }
  },
  components: {
    BSpinner,
    BListGroup,
    BListGroupItem
  },
  emit: ["search"],
  setup(_, { emit }) {
    function acceptSuggestion(suggestion) {
      console.log("Aceptanding", suggestion);
      emit("search", suggestion);
    }

    return {
      acceptSuggestion
    };
  }
};
</script>

<style lang="scss" scoped>
.on-top {
  z-index: 999;
  left: 0;
}

.list-bg {
  background-color: #2e2e2e;

  &:hover {
    background-color: #505050;
  }
}
</style>
