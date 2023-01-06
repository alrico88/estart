export default defineEventHandler(async (event) => {
  const { latitude, longitude, temperature_unit } = getQuery(event);

  return $fetch<WeatherResponse>("https://api.open-meteo.com/v1/forecast", {
    query: {
      latitude,
      longitude,
      current_weather: "true",
      temperature_unit,
    },
  });
});
