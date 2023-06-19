import type { TemperatureUnit } from "~/utils/weather-conditions";

export const useWeatherStore = defineStore(
  "weatherStore",
  () => {
    const coordinates = reactive({
      latitude: "",
      longitude: "",
    });

    const coordinatesAreSet = computed(() => {
      return [coordinates.latitude, coordinates.longitude].every(
        (d) => d !== ""
      );
    });

    const placeTag = ref("");

    const temperatureUnit = ref<TemperatureUnit>("celsius");

    return {
      coordinates,
      coordinatesAreSet,
      placeTag,
      temperatureUnit,
    };
  },
  {
    persist: true,
  }
);
