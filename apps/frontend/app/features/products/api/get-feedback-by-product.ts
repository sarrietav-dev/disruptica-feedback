import type { Feedback } from "~/features/feedback/types/feedback";
import { api, type ApiResponse } from "~/lib/api-client";
import { err, ok, type Result } from "~/lib/result";

export default async function getFeedbackByProductId(
  productId: string,
): Promise<Result<Feedback[], string>> {
  try {
    const { data } = await api.get<ApiResponse<Feedback[]>>(
      `/products/${productId}/feedback`,
    );

    if (data.status === "error") {
      return err(data.error);
    }

    return ok(data.data);
  } catch (error) {
    return err("Internal server error");
  }
}
