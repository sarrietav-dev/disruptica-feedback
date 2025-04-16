import { api, type ApiResponse } from "~/lib/api-client";
import { err, ok } from "~/lib/result";

export default async function isFirstAdmin() {
  const { data } = await api.get<ApiResponse<boolean>>("/users/first-admin");

  if (data.status === "error") {
    return err(data.error);
  }

  return ok(data.data);
}
