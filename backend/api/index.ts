import express from "express";
import z from "zod";
import { getDogs, getOwner, getOwners } from "../db/db";

const app = express();
app.get("/api/dogs", async (req, res) => {
  const schema = z.object({
    offset: z
      .string()
      .default("0")
      .transform((s) => parseInt(s)),
  });
  const query = schema.parse(req.query);
  res.status(200).json(await getDogs(query.offset, 10));
});

app.get("/api/owner/:id", async (req, res) => {
  const schema = z.object({
    id: z.string().transform((s) => parseInt(s)),
  });
  const query = schema.parse(req.params);
  res.status(200).json(await getOwner(query.id));
});

app.get("/api/owner/bulk", async (req, res) => {
  const schema = z.object({
    ids: z.array(z.string().transform((s) => parseInt(s))),
  });
  const query = schema.parse(req.params);
  res.status(200).json(await getOwners(query.ids));
});

export default app;
