<template lang="pug">
.vstack.gap-1
  .row.g-1
    .col
      form-group(label="Latitude")
        c-form-input(v-model.trim="latitude")
    .col
      form-group(label="Longitude")
        c-form-input(v-model.trim="longitude")
  .row
    .col
      button.btn.btn-sm.btn-link.p-0(
        @click="geolocate", 
        :disabled="loadingPosition"
      ) {{ loadingPosition ? 'Getting coordinates...' : 'Get current coordinates' }}
  .row
    .col
      form-group(label="Place tag")
        c-form-input(v-model="placeTag")
  .row
    .col
      form-group(label="Units")
        select.form-control(v-model="temperatureUnit")
          option(value="celsius") Celsius
          option(value="fahrenheit") Fahrenheit
</template>

<script setup lang="ts">
import { CFormInput } from "@coreui/bootstrap-vue";
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
