<template lang="pug">
.wrapper(:style="{ backgroundImage: `url('${faviconSrc}')` }")
</template>

<script setup lang="ts">
const props = defineProps<{
  link: string;
  name: string;
}>();

const faviconSrc = computed(
  () => `https://favi.vercel.app/image?url=${props.link}`
);
</script>

<style lang="scss" scoped>
.wrapper {
  height: 20px;
  width: 20px;
  background-position: center center;
  background-size: cover;
}
</style>
