import { computed, ref, watch } from "@vue/composition-api";
import { keyEmitter } from "../emitters/suggestions";

export function useHoverer(possibilities) {
  const total = computed(() => {
    return possibilities.value.length;
  });

  const hovered = ref(-1);

  function resetHover() {
    hovered.value = -1;
  }

  watch(possibilities, () => {
    resetHover();
  });

  function goDown() {
    if (hovered.value < total.value - 1) {
      hovered.value++;
    }
  }

  function goUp() {
    if (hovered.value > -1) {
      hovered.value--;
    }
  }

  keyEmitter.on("down", goDown);
  keyEmitter.on("up", goUp);

  return {
    hovered
  };
}
