import { z } from "zod";

export const categorySchema = z.string({
  required_error: "Category is required",
});

export const searchParamsSchema = z.object({
  category: categorySchema,
});
