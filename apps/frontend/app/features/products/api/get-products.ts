import { api, type ApiResponse } from "~/lib/api-client";
import { err, ok, type Result } from "~/lib/result";
import type { Product } from "../types/product";

export default async function getProducts(
  categoryId?: string,
): Promise<Result<Product[], string>> {
  const { data } = await api.get<ApiResponse<Product[]>>("/products", {
    params: { categoryId },
  });

  console.log("data", data);

  if (data.status === "error") {
    return err(data.error);
  }

  return ok(data.data);
}
