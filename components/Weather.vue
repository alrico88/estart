<template lang="pug">
.hstack.gap-2.justify-content-center.align-items-center.lead(
  v-if="coordinatesAreSet"
)
  template(v-if="loading")
    div Loading...
  template(v-else)
    icon(v-if="conditionIcon", size="30px", :name="conditionIcon")
    div {{ temperature }} º{{ unit }}
  div -
  div {{ placeTag }}
.d-flex.justify-content-center(v-else) Weather not set
</template>

<script setup lang="ts">
import { useWeatherStore } from "~~/stores/weather";

const weatherStore = useWeatherStore();
const { coordinates, coordinatesAreSet, placeTag, temperatureUnit } =
  storeToRefs(weatherStore);

const loading = ref(false);
const temperature = ref<number | null>(null);
const conditionIcon = ref<string | null>(null);

const { $client } = useNuxtApp();

const { resume, pause } = useTimeoutPoll(async () => {
  try {
    loading.value = true;

    const weatherData = await $client.getWeather.query({
      latitude: coordinates.value.latitude,
      longitude: coordinates.value.longitude,
      temperature_unit: temperatureUnit.value,
    });

    temperature.value = Math.floor(weatherData.current_weather.temperature);

    const timeOfDay = new Date().getHours() >= 21 ? "night" : "day";

    conditionIcon.value = mapIcon(
      weatherData.current_weather.weathercode,
      timeOfDay
    );
  } finally {
    loading.value = false;
  }
}, 180000);

const unit = computed(() =>
  weatherStore.temperatureUnit === "celsius" ? "C" : "F"
);

watch(
  coordinates,
  () => {
    if (coordinatesAreSet.value) {
      resume();
    } else {
      pause();
    }
  },
  {
    immediate: true,
  }
);
</script>
