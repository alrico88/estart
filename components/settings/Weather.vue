<template lang="pug">
.vstack.gap-1
  .row.g-1
    .col
      form-group(label="Latitude")
        b-form-input(v-model.trim="latitude")
    .col
      form-group(label="Longitude")
        b-form-input(v-model.trim="longitude")
  .row
    .col
      b-button.p-0(
        variant="link",
        size="sm",
        @click="geolocate",
        :disabled="loadingPosition"
      ) {{ loadingPosition ? "Getting coordinates..." : "Get current coordinates" }}
  .row
    .col
      form-group(label="Place tag")
        b-form-input(v-model="placeTag")
  .row
    .col
      form-group(label="Units")
        b-form-select(v-model="temperatureUnit")
          b-form-select-option(value="celsius") Celsius
          b-form-select-option(value="fahrenheit") Fahrenheit
</template>

<script setup lang="ts">
import type { TemperatureUnit } from "~/utils/weather-conditions";

const props = defineProps<{
  latitude: string;
  longitude: string;
  placeTag: string;
  temperatureUnit: TemperatureUnit;
}>();

const { latitude, longitude, placeTag, temperatureUnit } = useVModels(props);

const loadingPosition = ref(false);

function geolocate(): void {
  loadingPosition.value = true;

  navigator.geolocation.getCurrentPosition((position) => {
    latitude.value = position.coords.latitude.toString();
    longitude.value = position.coords.longitude.toString();

    loadingPosition.value = false;
  });
}
</script>
