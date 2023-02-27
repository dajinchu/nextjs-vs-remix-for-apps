import { backend } from "@/lib/backend";
import { router } from "../trpc";
import { z } from "zod";
import { procedure } from "../trpc";
import { TRPCError } from "@trpc/server";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const dogRouter = router({
  all: procedure
    .input(
      z.object({
        cursor: z.number().nullish(),
      })
    )
    .query(async ({ input }) => {
      const dogs = await backend.getDogs(input.cursor || 0, {});
      return {
        dogs,
        nextCursor: dogs.length > 0 ? dogs.at(-1)!.id + 1 : undefined,
      };
    }),
  details: procedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const dog = await backend.getDog(input.id);
      if (!dog) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      const owner = await backend.getOwner(dog.ownerId);
      const ownerDogs = await backend.getDogs(0, {ownerId: dog.ownerId});
      return { dog, owner, ownerDogs };
    }),
});
