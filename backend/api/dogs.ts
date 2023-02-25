import { getDogs } from "@/../shared";
import { z } from "zod";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const ParamsSchema = z.object({
  offset: z.string().transform((s) => parseInt(s)),
});
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const query = ParamsSchema.parse(req.query);
  res.status(200).json(await getDogs(query.offset, 10));
}
