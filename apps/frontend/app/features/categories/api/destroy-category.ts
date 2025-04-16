import { api, type ApiResponse } from "~/lib/api-client";
import { err, ok } from "~/lib/result";

export default async function destroyCategory(id: string) {
  const { data } = await api.delete<ApiResponse<string>>("/categories/" + id);

  if (data.status === "error") {
    return err(data.error);
  }

  return ok(data.data);
}
