import { FeedbackController } from "@/features/feedback/feedback-controller";
import { isErr } from "@/lib/result";
import {
  badRequest,
  created,
  internalServerError,
  notFound,
  ok,
} from "@/lib/serializers";
import { Request, Response, Router } from "express";
import { z } from "zod";

// filepath: /home/sebas/code/disruptica-feedback/apps/backend/src/routes/v1/feedback-routes.ts

const router = Router();
const feedbackController = new FeedbackController();

const createFeedbackSchema = z.object({
  comment: z.string().min(1),
  rating: z.number().min(1).max(5),
  userId: z.string().uuid(),
  productId: z.string().uuid(),
});

router.post("/", async (req: Request, res: Response): Promise<any> => {
  const parsed = createFeedbackSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten().fieldErrors });
  }

  const { comment, rating, userId, productId } = parsed.data;

  const result = await feedbackController.createFeedback(
    comment,
    rating,
    userId,
    productId
  );

  if (isErr(result)) {
    return res.status(500).json(internalServerError(result.error));
  }

  return res.status(201).json(created(result.value));
});

router.get("/", async (req: Request, res: Response): Promise<any> => {
  const { productId, rating } = req.query;
  const parsed = z.string().uuid().optional().safeParse(productId);
  const parsedRating = z.coerce.number().min(1).max(5).optional().safeParse(rating);
  if (!parsed.success && !parsedRating.success) {
    return res.status(400).json(badRequest("Invalid product ID or rating"));
  }

  const result = await feedbackController.getAllFeedback(
    parsed.data,
    parsedRating.data
  );

  if (isErr(result)) {
    return res.status(500).json(internalServerError(result.error));
  }

  return res.status(200).json(ok(result.value));
});

router.get("/:id", async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  const result = await feedbackController.getFeedbackById(id);

  if (isErr(result)) {
    return res.status(404).json(notFound(result.error));
  }

  return res.status(200).json(ok(result.value));
});

const updateFeedbackSchema = z.object({
  comment: z.string().min(1).optional(),
  rating: z.number().min(1).max(5).optional(),
});

router.put("/:id", async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const parsed = updateFeedbackSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten().fieldErrors });
  }

  const result = await feedbackController.updateFeedback(id, parsed.data);

  if (isErr(result)) {
    return res.status(500).json(internalServerError(result.error));
  }

  return res.status(200).json(ok(result.value));
});

router.delete("/:id", async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  const result = await feedbackController.deleteFeedback(id);

  if (isErr(result)) {
    return res.status(500).json(internalServerError(result.error));
  }

  return res.status(200).json(ok(result.value));
});

export default router;
