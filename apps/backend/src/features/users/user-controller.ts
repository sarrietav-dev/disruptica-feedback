import { err, ok, Result } from "@/lib/result";
import { User } from "./user-model";
import { db, users } from "@/db/schema";
import { count, eq } from "drizzle-orm";

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

  async isFirstAdmin(): Promise<Result<boolean, string>> {
    try {
      const adminCount = await db
        .select({ count: count(users.id) })
        .from(users)
        .where(eq(users.role, "ADMIN"));

      if (adminCount[0].count === 0) {
        return ok(true);
      }

      return ok(false);
    } catch (error) {
      console.log("error", error);
      return err("Internal server error");
    }
  }
}
