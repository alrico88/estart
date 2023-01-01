<template lang="pug">
.form-check
  input.form-check-input(type="checkbox", value="", :id="id", v-model="checked")
  label.form-check-label(:for="id") {{ label }}
</template>

<script setup lang="ts">
import { nanoid } from "nanoid";

const props = defineProps<{
  modelValue: boolean;
  label: string;
}>();

const checked = useVModel(props, "modelValue");

const id = nanoid();
</script>
