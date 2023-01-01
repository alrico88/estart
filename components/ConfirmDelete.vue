<template lang="pug">
button.btn.btn-outline-danger.text-nowrap(@click="performDelete")
  icon(name="material-symbols:delete-outline")
  |  {{ textShown }}
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    text?: string;
    size?: string;
  }>(),
  {
    size: "md",
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

const textShown = computed(() => (isConfirming.value ? "Sure?" : props.text));
</script>
