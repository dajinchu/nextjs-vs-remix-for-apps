import { backend } from "@/lib/backend";
import { z } from "zod";
import { procedure, router } from "../trpc";

export const appRouter = router({
  getDogs: procedure
    .input(
      z.object({
        cursor: z.number().nullish(), 
      })
    )
    .query(async ({ input }) => {
      const dogs = await backend.getDogs(input.cursor || 0);
      return {
        dogs,
        nextCursor: dogs.at(-1)!.id + 1,
      };
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
