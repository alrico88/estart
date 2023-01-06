<template lang="pug">
.container-md
  .row.pb-3
    .col
      h4.fw-bolder.mb-0 Style settings
  .row
    .col-md-3.col-6.pb-3
      .vstack.gap-2.bg-dark.p-3.rounded
        form-group(upper, bolder, label="Items to show")
          form-check(v-model="styleStore.clock", label="Clock")
          form-check(v-model="styleStore.search", label="Search")
        hr.my-1
        form-group(upper, bolder, label="Appearance")
          form-check(v-model="styleStore.bordered", label="Bordered")
          form-check(v-model="styleStore.shadowed", label="Shadowed")
          form-check(v-model="styleStore.favicon", label="Favicons") 
          form-check(v-model="styleStore.compact", label="Compact container")
        form-group(upper, bolder, label="Background")
          .text-small
            form-group.mb-1(label="Solid color")
              form-reset(
                original-value="#212121",
                :current-value="styleStore.bodyColor",
                @reset="(val) => {styleStore.bodyColor = val}"
              )
                c-form-input.w-100(label="Body color", type="color", v-model="styleStore.bodyColor")
            form-group(label="Image background", description="Overrides solid color")
              c-form-input(type="text", v-model="styleStore.backgroundImage")
        form-group(upper, bolder, label="Cards")
          .text-small
            form-group.mb-1(label="Cards background color")
              form-reset(
                original-value="#2e2e2e", 
                :current-value="styleStore.cardColor",
                @reset="(val) => {styleStore.cardColor = val}"
              )
                c-form-input.w-100(label="Cards background color", type="color", v-model="styleStore.cardColor")
            form-group.mb-1(label="Opacity")
              input.form-range(
                type="range",
                :min="0",
                :max="100",
                v-model="styleStore.cardOpacity"
              )
              form-group(upper, bolder, label="Link alignment")
          button-group(
            label="Link alignment",
            v-model="styleStore.alignment", 
            :options="alignOptions", 
            size="sm"
          )
        hr.my-1
        form-group(upper, bolder, label="Fonts")
          .text-small
            form-group(upper, bolder, label="Color")
              form-reset(
                original-value="#fafafa",
                :current-value="styleStore.textColor",
                @reset="(val) => styleStore.textColor = val"
              )
                c-form-input.w-100(label="Link Color", type="color", v-model="styleStore.textColor")
            form-group(upper, bolder, label="Custom font family", description="Font must be installed in your system")
              form-reset(
                original-value="Source Sans Pro",
                :current-value="styleStore.fontFamily",
                @reset="(val) => {styleStore.fontFamily = val}"
              )
                c-form-input(
                  type="text",
                  placeholder="Ex.: Fira Code",
                  v-model="styleStore.fontFamily"
                )
        hr.my-1
        form-group(upper, bolder, label="Behavior")
          form-check(v-model="styleStore.openInNewTab", label="Open links in new tab")
    .col
      .row.sticky-top
        .col
          .row
            .col
              .text-uppercase.lead.fw-bolder Preview
          template(v-if="linksStore.data.length > 0")
            blocks-area
          template(v-else)
            .row.row-cols-lg-4.row-cols-md-2.row-cols-1
              .col
                links-block(
                  :title="previewBlock.title",
                  :color="previewBlock.color",
                  :links="previewBlock.links"
                )
</template>

<script setup>
import { CFormInput } from "@coreui/bootstrap-vue";
import { useStyleStore } from "~~/stores/style";
import { useLinksStore } from "~~/stores/links";

const linksStore = useLinksStore();

useHead({
  title: "Style settings - estart",
});

const styleStore = useStyleStore();

const alignOptions = [
  {
    label: "Left",
    value: "start",
  },
  {
    label: "Center",
    value: "center",
  },
  {
    label: "Right",
    value: "end",
  },
];
</script>