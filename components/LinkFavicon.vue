<template lang="pug">
template(v-if="faviconSrc")
  .wrapper(:style="{backgroundImage: `url('${faviconSrc}')`}")
template(v-else)
  n-avatar(:size="20") {{ textFallback }}
</template>

<script setup lang="ts">
import { NAvatar } from "naive-ui";

const props = defineProps<{
  link: string;
  name: string;
}>();

const faviconSrc = computed(() => {
  let favicon;

  try {
    const asURL = new URL(props.link);
    favicon = `https://icons.duckduckgo.com/ip3/${asURL.hostname}.ico`;
  } catch (e) {
    favicon = null;
  }

  return favicon;
});

const textFallback = computed(() => {
  return props.name.split(" ").reduce((str, word, index) => {
    if (index < 2) {
      str += word.charAt(0);
    }

    return str;
  }, "");
});
</script>

<style lang="scss" scoped>
.wrapper {
  height: 20px;
  width: 20px;
  background-position: center center;
  background-size: cover;
}
</style>
