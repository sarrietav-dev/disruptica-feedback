import { z } from "zod";
import { api, type ApiResponse } from "~/lib/api-client";
import { err, ok } from "~/lib/result";

export const createCategorySchema = z.object({
  name: z.string().min(1),
});

export type CreateCategoryValues = z.infer<typeof createCategorySchema>;

export default async function createCategory(values: CreateCategoryValues) {
  const { data } = await api.post<ApiResponse<string>>("/categories", values);

  if (data.status === "error") {
    return err(data.error);
  }

  return ok(data.data);
}
