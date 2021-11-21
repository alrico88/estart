<template lang="pug">
p.mb-0(:class="clockClasses") {{ formatted.date }} - {{ formatted.hours }}{{ showDots ? ':' : ' ' }}{{ formatted.minutes }}
</template>

<script>
import { useNow } from "@vueuse/core";
import { ref, computed, onMounted, onDeactivated } from "@vue/composition-api";
import dayjs from "dayjs";
import { useState } from "vuex-composition-helpers";

export default {
  setup() {
    const { ui } = useState(["ui"]);

    const now = useNow();

    const showDots = ref(true);

    let interval = null;

    onMounted(() => {
      interval = setInterval(() => {
        showDots.value = !showDots.value;
      }, 1000);
    });

    onDeactivated(() => {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    });

    const clockClasses = computed(() => {
      const classes = [];

      if (ui.value.shadowed) {
        classes.push("text-shadow");
      }

      return classes;
    });

    const formatted = computed(() => {
      const asDayJS = dayjs(now.value);

      return {
        hours: asDayJS.format("HH"),
        minutes: asDayJS.format("mm"),
        date: asDayJS.format("dddd, DD MMMM YYYY")
      };
    });

    return {
      formatted,
      showDots,
      clockClasses
    };
  }
};
</script>

<style scoped>
p {
  font-size: 2rem;
}

.text-shadow {
  text-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.8) !important;
}
</style>
