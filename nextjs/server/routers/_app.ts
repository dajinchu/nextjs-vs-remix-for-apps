import { router } from "../trpc";
import { dogRouter } from "./dogs";

export const appRouter = router({
  dogs: dogRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
