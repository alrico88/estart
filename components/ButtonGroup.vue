<template lang="pug">
.btn-group.w-100.flex-fill(role="group", :aria-label="label")
  button.btn(
    v-for="option of options",
    :key="option.value",
    :class="{[`btn-${variant}`]: true, [`btn-${size}`]: true, active: modelValue === option.value}",
    @click="select(option.value)"
  ) {{ option.label }}
</template>

<script setup lang="ts">
interface IBtnGroupOption {
  value: string;
  label: string;
}

const props = withDefaults(
  defineProps<{
    options?: IBtnGroupOption[];
    modelValue: string;
    variant?: string;
    size?: string;
    label: string;
  }>(),
  {
    variant: "secondary",
    size: "md",
  }
);

const value = useVModel(props, "modelValue");

function select(val: string) {
  value.value = val;
}
</script>
