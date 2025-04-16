import type { U } from "node_modules/react-router/dist/development/route-data-5OzAzQtT.mjs";
import type { User } from "../types/user";
import { err, ok, type Result } from "~/lib/result";
import { api } from "~/lib/api-client";

export default async function getUserById(
  id: string,
): Promise<Result<User, string>> {
  try {
    const { data } = await api.get(`/users/${id}`);
    if (data.status === "error") {
      return err(data.error);
    }
    return ok(data.data);
  } catch (error) {
    return err("Internal server error");
  }
}
