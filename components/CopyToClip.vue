<template lang="pug">
b-button(variant="primary", @click="() => copy(toCopy)", :disabled="copied")
  icon(name="bi:clipboard") 
  |
  | {{ copied ? "Copied" : "Copy" }} to clipboard
</template>

<script setup lang="ts">
const props = defineProps<{
  toCopy: string;
}>();

const { copied, copy } = useClipboard();
</script>
