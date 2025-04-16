import { api, type ApiResponse } from "~/lib/api-client";
import { err, ok } from "~/lib/result";
import type { Feedback } from "../types/feedback";

export default async function getFeedback(productId?: string, rating?: number) {
  const { data } = await api.get<ApiResponse<Feedback[]>>("/feedback", {
    params: {
      productId,
      rating,
    },
  });
  if (data.status === "error") {
    return err(data.error);
  }
  return ok(data.data);
}
