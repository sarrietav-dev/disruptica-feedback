import { api, type ApiResponse } from "~/lib/api-client";
import { err, ok } from "~/lib/result";
import type { Product } from "../types/product";

export default async function getProduct(id: string) {
  const { data } = await api.get<
    ApiResponse<
      Omit<Product, "updatedAt" | "createdAt"> & { feedbackAvg: string | null }
    >
  >(`/products/${id}`);
  if (data.status === "error") {
    return err(data.error);
  }
  return ok(data.data);
}
