import { api, type ApiResponse } from "~/lib/api-client";
import { err, ok, type Result } from "~/lib/result";
import type { Product } from "../types/product";

export default async function getProducts(): Promise<
  Result<Product[], string>
> {
  const { data } = await api.get<ApiResponse<Product[]>>("/products");

  console.log("data", data);

  if (data.status === "error") {
    return err(data.error);
  }

  return ok(data.data);
}
