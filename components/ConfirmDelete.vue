<template lang="pug">
button.btn.text-nowrap(:class="btnClass", @click="performDelete")
  icon(name="material-symbols:delete-outline")
  |  {{ textShown }}
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    text?: string;
    size?: string;
    filled?: boolean;
  }>(),
  {
    size: "md",
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

const btnClass = computed(() =>
  props.filled === true ? "btn-danger" : "btn-outline-danger"
);

const textShown = computed(() => (isConfirming.value ? "Sure?" : props.text));
</script>
