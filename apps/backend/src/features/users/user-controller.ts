import { err, ok, Result } from "@/lib/result";
import { User } from "./user-model";
import { db, users } from "@/db/schema";
import { eq } from "drizzle-orm";

export class UserController {
  async getUserById(id: string): Promise<Result<User, string>> {
    try {
      const user = await db
        .select({ id: users.id, name: users.name })
        .from(users)
        .where(eq(users.id, id));

      if (!user || user.length === 0) {
        return err("User not found");
      }

      return ok(user[0]);
    } catch (error) {
      console.log("error", error);
      return err("Internal server error");
    }
  }
}
