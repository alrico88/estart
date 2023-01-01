<template lang="pug">
.hstack.gap-2.align-items-center
  slot
  div(v-if="resetEnabled")
    button.btn.btn-secondary.btn-sm(@click="emit('reset', originalValue)", title="Reset default value")
      icon(name="bi:backspace-fill")
</template>

<script setup lang="ts">
const props = defineProps<{
  originalValue: string;
  currentValue: string;
}>();

const resetEnabled = computed(() => props.originalValue !== props.currentValue);

const emit = defineEmits<{
  (e: "reset", originalValue: string): void;
}>();
</script>
