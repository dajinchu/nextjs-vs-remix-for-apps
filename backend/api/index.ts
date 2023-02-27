import express from "express";
import morgan from "morgan";
import z  from "zod";
import { getDog, getDogs, getOwner, getOwners } from "../db/db";

/**
 * THIS FILE IS NOT IMPORTANT. It just mocks backend services.
 */

const app = express();

app.use(morgan('combined'))

app.get("/api/dogs", async (req, res) => {
  const schema = z.object({
    offset: z
      .coerce.number()
      .default(0),
    ownerId: z
      .coerce.number()
      .optional()
  });
  const query = schema.parse(req.query);
  res
    .status(200)
    .json(await getDogs(query.offset, 10, { ownerId: query.ownerId }));
});

app.get("/api/dogs/:id", async (req, res) => {
  const schema = z.object({
    id: z.coerce.number()
  });
  const params = schema.parse(req.params);
  res.status(200).json(await getDog(params.id));
});

app.get("/api/owner/:id", async (req, res) => {
  const schema = z.object({
    id: z.coerce.number()
  });
  const params = schema.parse(req.params);
  res.status(200).json(await getOwner(params.id));
});

app.get("/api/owner/bulk", async (req, res) => {
  const schema = z.object({
    ids: z.array(z.coerce.number())
  });
  const params = schema.parse(req.params);
  res.status(200).json(await getOwners(params.ids));
});

export default app;
