import { appRouter } from "@/server/routers/_app";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import superjson from "superjson";

export const createPrefetcher = () =>
  createProxySSGHelpers({
    router: appRouter,
    ctx: {}, //await createContext(),
    transformer: superjson,
  });
