import { getSuggestions } from "sugiero";

export default defineEventHandler(async (event) => {
  const { search } = getQuery(event);

  return (await getSuggestions(search as string, "Google")).map((d) => d.term);
});
