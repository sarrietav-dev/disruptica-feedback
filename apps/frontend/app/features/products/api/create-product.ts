import { api, type ApiResponse } from "~/lib/api-client";
import type { Product } from "../types/product";
import { err, ok, type Result } from "~/lib/result";

export default async function createProduct(
  product: Omit<Product, "id">
): Promise<Result<string, string>> {
  const { data } = await api.post<ApiResponse<string>>("/products", product);

  if (data.status === "error") {
    return err("Error creating product: " + data.error);
  }

  return ok(data.data);
}
