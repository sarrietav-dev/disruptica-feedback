import type { User } from "~/features/users/types/user";
import { api, type ApiResponse } from "~/lib/api-client";
import { err, ok } from "~/lib/result";

export default async function me() {
  const { data } =
    await api.get<ApiResponse<User & { role: "USER" | "ADMIN" }>>("/auth/me");

  if (data.status === "error") {
    return err(data.error);
  }

  return ok(data.data);
}
