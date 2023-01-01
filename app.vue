<template lang="pug">
#app.full-height.d-flex.flex-column(:style="appStyle")
  c-navbar(expand="sm", color-scheme="dark")
    .container-fluid
      c-navbar-nav.ms-auto
        c-nav-item
          nuxt-link.nav-link(to="/", exact-active-class="active") #[icon(name="icon-park-twotone:block-seven")] Home
        c-nav-item
          nuxt-link.nav-link(to="/edit", exact-active-class="active") #[icon(name="material-symbols:edit-road")] Edit
        c-nav-item
          nuxt-link.nav-link(to="/backup", exact-active-class="active") #[icon(name="ic:baseline-settings-backup-restore")] Backup
        c-nav-item
          nuxt-link.nav-link(to="/style", exact-active-class="active") #[icon(name="material-symbols:style-outline")] Style
  nuxt-page
</template>

<script setup lang="ts">
import { useStyleStore } from "./stores/style";
import { CNavbar, CNavbarNav, CNavItem } from "@coreui/bootstrap-vue";

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
</script>

<style lang="scss">
#app {
  background: var(--body-color);
  font-family: var(--font-family);
  background-size: cover;
  background-attachment: fixed;
}

.full-height {
  height: 100vh;
  overflow-y: auto;
}
</style>
