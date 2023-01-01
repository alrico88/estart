<template lang="pug">
.form-group
  label.form-label(:class="labelClasses") {{ label }}
  slot
  .form-text(v-if="description") {{ description }}
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    label: string;
    upper?: boolean;
    bolder?: boolean;
    description?: string;
  }>(),
  {
    upper: false,
    bolder: false,
  }
);

const labelClasses = computed(() => {
  return {
    "fw-bolder": props.bolder,
    "text-uppercase": props.upper,
  };
});
</script>
