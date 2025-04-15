import { db, users } from "@/db/schema";
import { Result, err, ok } from "@/lib/result";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/config/env";
import { eq } from "drizzle-orm";

export class AuthController {
  async signUp(
    email: string,
    password: string
  ): Promise<Result<string, string>> {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await db.insert(users).values({
        email,
        password: hashedPassword,
      });

      if (!result) {
        return err("User creation failed");
      }

      return ok("User created successfully");
    } catch (error) {
      console.log("error", error);
      return err("Internal server error");
    }
  }

  async signIn(
    email: string,
    password: string
  ): Promise<Result<string, string>> {
    try {
      const user = await db.select().from(users).where(eq(users.email, email));

      if (!user || user.length === 0) {
        return err("User not found");
      }

      const isPasswordValid = await bcrypt.compare(password, user[0].password);

      if (!isPasswordValid) {
        return err("Invalid password");
      }

      const token = jwt.sign(
        { id: user[0].id, email: user[0].email },
        JWT_SECRET ?? "secret",
        {
          expiresIn: "1h",
        }
      );

      return ok(token);
    } catch (error) {
      console.log("error", error);
      return err("Internal server error");
    }
  }
}
