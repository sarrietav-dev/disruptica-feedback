import { z } from "zod";
import { api, type ApiResponse } from "~/lib/api-client";
import { err, ok } from "~/lib/result";

export const formSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z
    .string()
    .min(3, {
      message: "Comment must be at least 3 characters.",
    })
    .max(500, {
      message: "Comment must not exceed 500 characters.",
    }),
});

export type FeedbackFormValues = z.infer<typeof formSchema>;

export default async function createFeedback(values: FeedbackFormValues) {
  const { data } = await api.post<ApiResponse<void>>("/feedback", values);

  if (data.status === "error") {
    return err(data.error);
  }

  return ok(data.data);
}
