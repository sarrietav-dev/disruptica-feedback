import { AuthController } from "@/features/auth/auth-controller";
import { authMiddleware } from "@/features/auth/auth-middleware";
import { isErr } from "@/lib/result";
import {
  created,
  internalServerError,
  ok,
  unauthorized,
} from "@/lib/serializers";
import { Request, Response, Router } from "express";
import { z } from "zod";

const router = Router();
const authController = new AuthController();

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
});

router.post("/sign-up", async (req: Request, res: Response): Promise<any> => {
  const parsed = signUpSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten().fieldErrors });
  }

  const { email, password, name } = parsed.data;

  const result = await authController.signUp(email, password, name);

  if (isErr(result)) {
    return res.status(500).json(internalServerError(result.error));
  }

  return res.status(201).json(created(result.value));
});

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

router.post("/sign-in", async (req: Request, res: Response): Promise<any> => {
  const parsed = signInSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten().fieldErrors });
  }

  const { email, password } = parsed.data;

  const result = await authController.signIn(email, password);

  if (isErr(result)) {
    return res.status(401).json({ error: result.error });
  }

  const token = result.value;

  res.cookie("token", token, {
    httpOnly: process.env.NODE_ENV === "production", // Set to true if using HTTPS
    secure: process.env.NODE_ENV === "production", // Set to true if using HTTPS
    maxAge: 3600000, // 1 hour
    sameSite: "strict", // CSRF protection
  });

  return res.status(200).json(ok(token));
});

router.get(
  "/me",
  authMiddleware,
  async (req: Request, res: Response): Promise<any> => {
    if (!req.user) {
      return res.status(401).json(unauthorized("Unauthorized"));
    }

    const result = await authController.me(req.user.id);

    if (isErr(result)) {
      return res.status(401).json(unauthorized(result.error));
    }

    return res.status(200).json(ok(result.value));
  }
);

export default router;
