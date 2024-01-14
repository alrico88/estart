<template lang="pug">
.hstack.gap-2
  b-button.text-nowrap(
    :variant="btnClass",
    :size="size",
    @click="performDelete"
  )
    icon(name="material-symbols:delete-outline")
    |
    | {{ textShown }}
  b-button.text-nowrap(
    v-if="isConfirming",
    variant="secondary",
    :size="size",
    @click="isConfirming = false"
  ) No
</template>

<script setup lang="ts">
import type {
  BaseButtonVariant,
  BaseSize,
} from "bootstrap-vue-next/dist/src/types";

const props = withDefaults(
  defineProps<{
    text?: string;
    size?: keyof BaseSize;
    filled?: boolean;
  }>(),
  {
    filled: false,
  }
);

const emit = defineEmits<{
  (e: "delete"): void;
}>();

const isConfirming = ref(false);

function performDelete(): void {
  if (isConfirming.value) {
    emit("delete");
  }

  isConfirming.value = !isConfirming.value;
}

const btnClass = computed<keyof BaseButtonVariant>(() => {
  if (isConfirming.value) {
    return "danger";
  } else {
    return props.filled === true ? "danger" : "outline-danger";
  }
});

const textShown = computed(() => (isConfirming.value ? "Sure?" : props.text));
</script>
