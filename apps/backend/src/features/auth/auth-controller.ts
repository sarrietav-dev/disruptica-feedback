import { JWT_SECRET } from "@/config/env";
import { Result, err, ok } from "@/lib/result";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export class AuthController {
  async signUp(
    email: string,
    password: string
  ): Promise<Result<string, string>> {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      if (!user) {
        return err("User creation failed");
      }

      return ok("User created successfully");
    } catch (error) {
      console.log('error', error)
      return err("Internal server error");
    }
  }

  async signIn(
    email: string,
    password: string
  ): Promise<Result<string, string>> {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return err("User not found");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return err("Invalid password");
      }


      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET ?? "secret", {
        expiresIn: "1h",
      });


      return ok(token);
    } catch (error) {
      console.log('error', error)
      return err("Internal server error");
    }
  }
}
