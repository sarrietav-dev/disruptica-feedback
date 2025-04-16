import { error, unauthorized } from "@/lib/serializers";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import logger from "@/lib/logger";
import { db, users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const tokenHeader = req.headers["authorization"];
  const token =
    tokenHeader && tokenHeader.startsWith("Bearer ")
      ? tokenHeader.split(" ")[1]
      : null;
  if (!token) {
    logger.warn("No token provided", tokenHeader);
    res.status(401).json(unauthorized("Unauthorized"));
    return;
  }

  const user = verifyToken(token);

  if (!user) {
    logger.error("Invalid token");
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const userDb = await db
    .select()
    .from(users)
    .limit(1)
    .where(eq(users.id, user.id));

  if (!userDb || userDb.length === 0) {
    logger.error("User not found");
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  req.user = userDb[0];

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

export async function isUser(req: Request, res: Response, next: NextFunction) {
  if (req.user?.role !== "USER") {
    return res.status(403).json(unauthorized("Forbidden"));
  }
  return next();
}

export function isAdmin(req: Request, res: Response, next: NextFunction): void {
  const user = req.user; // Assuming `req.user` is populated by authentication middleware

  if (user && user.role === "ADMIN") {
    return next(); // User is authorized
  }

  res.status(403).json(error("Forbidden")); // User is not authorized
}
