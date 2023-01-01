<template lang="pug">
.vstack.gap-1.text-center(:class="clockClasses")
  .display-5.fw-bolder {{ formatted.hours }}:{{ formatted.minutes }}
  .lead {{ formatted.dayOfWeek }}, {{ formatted.date }}
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { useStyleStore } from "~~/stores/style";

const styleStore = useStyleStore();

const now = useNow();

const clockClasses = computed(() => {
  const classes = [];

  if (styleStore.shadowed) {
    classes.push("text-shadow");
  }

  return classes;
});

const formatted = computed(() => {
  const asDayJS = dayjs(now.value);

  return {
    hours: asDayJS.format("HH"),
    minutes: asDayJS.format("mm"),
    dayOfWeek: asDayJS.format("dddd"),
    date: asDayJS.format("DD MMMM YYYY"),
  };
});
</script>

<style scoped>
.text-shadow {
  text-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.8) !important;
}
</style>
