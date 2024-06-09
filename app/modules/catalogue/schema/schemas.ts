import { z } from "zod";

export const categorySchema = z.string().default("all");

export const searchParamsSchema = z.object({
  category: categorySchema.optional(),
});
