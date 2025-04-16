import { api, type ApiResponse } from "~/lib/api-client";
import type { Product } from "../types/product";
import { err, ok } from "~/lib/result";

export default async function updateProduct(product: Product) {
  const { data } = await api.put<ApiResponse<Product>>(
    `/products/${product.id}`,
    product,
  );
  if (data.status === "error") {
    return err(data.error);
  }
  return ok(data.data);
}
