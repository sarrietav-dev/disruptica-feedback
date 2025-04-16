import { z } from "zod";
import { api, type ApiResponse } from "~/lib/api-client";
import { err, ok } from "~/lib/result";

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
  confirmPassword: z.string().min(8),
  isAdmin: z.boolean().optional(),
  adminKey: z.string().optional(),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;

export default async function signUp(values: SignUpSchema) {
  const { data } = await api.post<ApiResponse<string>>("/auth/sign-up", values);

  if (data.status === "error") {
    return err(data.error);
  }

  return ok(data.data);
}
