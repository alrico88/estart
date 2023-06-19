import { inferAsyncReturnType } from "@trpc/server";
import { dataStore } from "~/utils/storage";

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createContext = () => ({
  blocksStore: dataStore,
});

export type Context = inferAsyncReturnType<typeof createContext>;
