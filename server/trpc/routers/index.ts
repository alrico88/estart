import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { getSuggestions } from "sugiero";

export const appRouter = router({
  getFromStore: publicProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      const storedData = await ctx.blocksStore.get(input);

      if (storedData) {
        return {
          success: true,
          data: storedData,
        };
      } else {
        return {
          success: false,
          data: null,
        };
      }
    }),
  postToStore: publicProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      const id = await ctx.blocksStore.save(input);

      return {
        success: true,
        data: id,
      };
    }),
  getSuggestions: publicProcedure.input(z.string()).query(async ({ input }) => {
    return (await getSuggestions(input, "Google")).map((d) => d.term);
  }),
  getWeather: publicProcedure
    .input(
      z.object({
        latitude: z.string(),
        longitude: z.string(),
        temperature_unit: z.enum(["celsius", "fahrenheit"]),
      })
    )
    .query(async ({ input }) => {
      const { latitude, longitude, temperature_unit } = input;

      return $fetch<WeatherResponse>("https://api.open-meteo.com/v1/forecast", {
        query: {
          latitude,
          longitude,
          current_weather: "true",
          temperature_unit,
        },
      });
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
