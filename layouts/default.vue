<template lang="pug">
#app.full-height.d-flex.flex-column(:style="appStyle")
  b-navbar(color-scheme="dark", :container="false")
    .container-fluid.justify-content-md-end.justify-content-center
      b-navbar-nav.align-items-center
        b-nav-item(v-if="$pwa.needRefresh")
          b-button(
            variant="primary",
            @click="() => $pwa.updateServiceWorker()"
          ) #[icon(name="bi:repeat")] Update available
        b-nav-item(to="/", active-class="active") #[icon(name="icon-park-twotone:block-seven")] Home
        b-nav-item(to="/edit", active-class="active") #[icon(name="material-symbols:edit-road")] Edit
        b-nav-item(to="/backup", active-class="active") #[icon(name="ic:baseline-settings-backup-restore")] Backup
        b-nav-item(to="/style", active-class="active") #[icon(name="material-symbols:style-outline")] Style
  slot
</template>

<script setup lang="ts">
import { useStyleStore } from "../stores/style";

const styleStore = useStyleStore();
const { backgroundImage, bodyColor, fontFamily } = storeToRefs(styleStore);

const appStyle = computed(() => {
  const background =
    backgroundImage.value !== ""
      ? `url('${backgroundImage.value}')`
      : bodyColor.value;

  return {
    "--body-color": background,
    "--font-family": fontFamily.value,
  };
});

const { $pwa } = useNuxtApp();

watch(
  () => $pwa.offlineReady,
  () => {
    console.log("ready to work offline");
  }
);
</script>

<style lang="scss">
#app {
  background: var(--body-color);
  font-family: var(--font-family);
  background-size: cover;
  background-attachment: fixed;
  background-position: center center;
}

.full-height {
  height: 100vh;
  overflow-y: auto;
}
</style>
