import { ref } from "@vue/composition-api";
import debounce from "lodash/debounce";

export function useFocus() {
  const isFocused = ref(false);

  function captureFocus() {
    isFocused.value = true;
  }

  const releaseFocus = debounce(function() {
    isFocused.value = false;
  }, 200);

  return {
    isFocused,
    captureFocus,
    releaseFocus
  };
}
