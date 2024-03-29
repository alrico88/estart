<template lang="pug">
.vstack.gap-2
  h4.fw-bolder.mb-0 Share
  b-form-text.mb-0 Get a link to remotely export your data. No identifiable information is stored. Links are valid for 24 hours
  b-button.w-100(
    variant="secondary",
    @click="saveToRemote",
    :disabled="loading"
  ) {{ loading ? "Getting" : "Get" }} share link
  b-alert.text-center.mb-0(:model-value="showSaved", variant="success")
    .vstack.gap-2.text-center
      div Your share link is:
      a.mb-0.bg-secondary.rounded.p-2(:href="saved") {{ saved }}
      .w-100.text-center
        img.qr(:src="asQR", alt="QR Code")
      copy-to-clip(:to-copy="saved")
</template>

<script setup lang="ts">
import is from "@sindresorhus/is";
import QRCode from "qrcode";

const props = defineProps<{
  data: string;
}>();

const route = useRoute();

const loading = ref(false);
const hasError = ref(false);
const saved = ref("");
const asQR = ref("");

const showSaved = computed(
  () => !hasError.value && is.nonEmptyString(saved.value)
);

const { $client } = useNuxtApp();

async function saveToRemote() {
  try {
    hasError.value = false;
    loading.value = true;

    const response = await $client.postToStore.mutate(props.data);

    saved.value = `${location.origin}${route.path}?id=${response.data}`;

    asQR.value = await QRCode.toDataURL(saved.value);
  } catch (err) {
    hasError.value = true;
  } finally {
    loading.value = false;
  }
}
</script>

<style lang="scss" scoped>
.qr {
  width: 100px;
}
</style>
