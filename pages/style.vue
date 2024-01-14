<template lang="pug">
.container-md
  .row.pb-3
    .col
      h4.fw-bolder.mb-0 Style settings
  .row
    .col-md-3.col-6.pb-3
      .vstack.gap-2.bg-dark.p-3.rounded
        form-group(upper, bolder, label="Items to show")
          b-form-checkbox(v-model="styleStore.clock") Clock
          b-form-checkbox(v-model="styleStore.search") Search
          b-form-checkbox(v-model="styleStore.weather") Weather
        template(v-if="styleStore.weather")
          hr.my-1
          form-group(upper, bolder, label="Weather")
            .text-small
              settings-weather(
                v-model:latitude="weatherStore.coordinates.latitude",
                v-model:longitude="weatherStore.coordinates.longitude",
                v-model:place-tag="weatherStore.placeTag",
                v-model:temperature-unit="weatherStore.temperatureUnit"
              )
        hr.my-1
        form-group(upper, bolder, label="Appearance")
          b-form-checkbox(v-model="styleStore.bordered") Bordered
          b-form-checkbox(v-model="styleStore.shadowed") Shadowed
          b-form-checkbox(v-model="styleStore.favicon") Favicons
          b-form-checkbox(v-model="styleStore.compact") Compact container
          b-form-checkbox(v-model="styleStore.masonry") Masonry layout
        form-group(upper, bolder, label="Background")
          .text-small
            form-group.mb-1(label="Solid color")
              form-reset(
                original-value="#212121",
                :current-value="styleStore.bodyColor",
                @reset="(val) => { styleStore.bodyColor = val; }"
              )
                b-form-input.w-100(
                  type="color",
                  v-model="styleStore.bodyColor"
                )
            form-group(
              label="Image background",
              description="Overrides solid color"
            )
              b-form-input(type="text", v-model="styleStore.backgroundImage")
        form-group(upper, bolder, label="Cards")
          .text-small
            form-group.mb-1(label="Cards background color")
              form-reset(
                original-value="#2e2e2e",
                :current-value="styleStore.cardColor",
                @reset="(val) => { styleStore.cardColor = val; }"
              )
                b-form-input.w-100(
                  type="color",
                  v-model="styleStore.cardColor"
                )
            form-group.mb-1(label="Opacity")
              b-form-input(
                type="range",
                :min="0",
                :max="100",
                v-model="styleStore.cardOpacity"
              )
            form-group(bolder, label="Link alignment")
              b-button-group.w-100(size="sm")
                b-button(
                  v-for="option of alignOptions",
                  @click="styleStore.alignment = option.value",
                  :active="styleStore.alignment === option.value"
                ) {{ option.label }}
        hr.my-1
        form-group(upper, bolder, label="Fonts")
          .text-small
            form-group(upper, bolder, label="Color")
              form-reset(
                original-value="#fafafa",
                :current-value="styleStore.textColor",
                @reset="(val) => (styleStore.textColor = val)"
              )
                b-form-input.w-100(
                  type="color",
                  v-model="styleStore.textColor"
                )
            form-group(
              upper,
              bolder,
              label="Custom font family",
              description="Font must be installed in your system"
            )
              form-reset(
                original-value="Noto Sans",
                :current-value="styleStore.fontFamily",
                @reset="(val) => { styleStore.fontFamily = val; }"
              )
                b-form-input(
                  type="text",
                  placeholder="Ex.: Fira Code",
                  v-model="styleStore.fontFamily"
                )
        hr.my-1
        form-group(upper, bolder, label="Behavior")
          b-form-checkbox(v-model="styleStore.openInNewTab") Open links in new tab
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

<script setup lang="ts">
import { useStyleStore } from "~~/stores/style";
import { useLinksStore } from "~~/stores/links";
import { useWeatherStore } from "~~/stores/weather";
import type { Block } from "~/models/Block";
import { nanoid } from "nanoid";

const linksStore = useLinksStore();
const weatherStore = useWeatherStore();

useSeoMeta({
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

const previewBlock: Block = {
  id: nanoid(),
  title: "My sites",
  color: "#A2D243",
  links: [
    {
      id: nanoid(),
      name: "Alberto Rico",
      url: "https://alrico.es",
    },
  ],
};
</script>
