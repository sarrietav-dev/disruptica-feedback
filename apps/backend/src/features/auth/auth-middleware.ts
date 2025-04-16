import { unauthorized } from "@/lib/serializers";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const tokenHeader = req.headers["authorization"];
  const token =
    tokenHeader && tokenHeader.startsWith("Bearer ")
      ? tokenHeader.split(" ")[1]
      : null;
  if (!token) {
    console.log("No token provided", tokenHeader);
    res.status(401).json(unauthorized("Unauthorized"));
    return;
  }

  // Simulate token verification
  const user = verifyToken(token);
  if (!user) {
    console.log("Invalid token");
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  req.userId = user.id;

  next();
}

function verifyToken(token: string): { id: string; email: string } | null {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    if (typeof decoded === "string") {
      return null;
    }

    return {
      id: decoded.id,
      email: decoded.email,
    };
  } catch (error) {
    return null;
  }
}
