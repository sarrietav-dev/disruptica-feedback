import { z } from "zod";
import { api, type ApiResponse } from "~/lib/api-client";
import { saveToken } from "~/lib/auth";
import { err, ok } from "~/lib/result";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type SignInSchema = z.infer<typeof signInSchema>;

export default async function signIn(values: SignInSchema) {
  const { data } = await api.post<ApiResponse<string>>("/auth/sign-in", values);

  if (data.status === "error") {
    return err(data.error);
  }

  saveToken(data.data);

  return ok(data.data);
}
