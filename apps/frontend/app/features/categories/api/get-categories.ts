import { api, type ApiResponse } from "~/lib/api-client";
import { err, ok } from "~/lib/result";
import type { Category } from "../types/category";

export default async function getCategories() {
  const { data } = await api.get<ApiResponse<Category[]>>("/categories");

  if (data.status === "error") {
    return err(data.error);
  }

  return ok(data.data);
}
