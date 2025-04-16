import { z } from "zod";
import { api, type ApiResponse } from "~/lib/api-client";
import { err, ok } from "~/lib/result";

export const updateCategorySchema = z.object({
  name: z.string().min(1),
});

export type UpdateCategoryValues = z.infer<typeof updateCategorySchema>;

export default async function updateCategory(
  id: string,
  values: UpdateCategoryValues
) {
  const { data } = await api.put<ApiResponse<string>>(
    "/categories/" + id,
    values
  );

  if (data.status === "error") {
    return err(data.error);
  }

  return ok(data.data);
}
