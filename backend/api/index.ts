import express from "express";
import z from 'zod';
import { getDogs } from "../db/db";

const app = express();
app.get("/api/dogs", async (req, res) => {
  const ParamsSchema = z.object({
    offset: z
      .string()
      .default("0")
      .transform((s) => parseInt(s)),
  });
  const query = ParamsSchema.parse(req.query);
  res.status(200).json(await getDogs(query.offset, 10));
});

export default app;
