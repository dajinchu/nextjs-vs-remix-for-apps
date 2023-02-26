import { backend } from "@/lib/backend";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
const ParamsSchema = z.object({
  offset: z
    .string()
    .default("0")
    .transform((s) => parseInt(s)),
});
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = ParamsSchema.parse(req.query);
  return res.json(await backend.getDogs(query.offset));
}
/**
 * note to self: this is obviously a pain. having to figure out an api structure for the bff feels like a waste of time.
 * api design should be spent on backend services but the bff just needs to do a couple things on the server
 *
 * also managing validation etc again is just another pain
 *
 *
 * trpc could be good here.
 *
 * i dont see appdir solving the problem... server components can do the work of calling out to microservers, but then you do infinite scroll and youre screwed.
 *
 * remix's solution is not as helpful if you end up having multiple on page or reusing - then you end up still having to do a resource route
 * also usefetcher lacks type safety unless you add types yourself.
 *
 * am i overindexing on infinite scroll? Maybe nextjs appdir has a plan? (intercepting routes maybe)
 *
 * am i too focused on keeping all data fetch serverside? Could we for example, expose affinity2 streams to the frontend?
 * if someone wanted to scrape itd be the same thing as scraping the rendered resolved version that BFF exposes?
 * not about scraping - its about multiple roundtrips?
 *
 * also colocating data for reusable components that do their own data fetching would be a nice plus
 *
 */
