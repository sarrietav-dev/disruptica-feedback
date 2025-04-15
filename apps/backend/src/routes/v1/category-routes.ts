import { CategoryController } from "@/features/categories/category-controller";
import { isErr } from "@/lib/result";
import { created, internalServerError, notFound, ok } from "@/lib/serializers";
import { Request, Response, Router } from "express";
import { z } from "zod";

const router = Router();
const categoryController = new CategoryController();

const createCategorySchema = z.object({
  name: z.string().min(1),
});

router.post("/", async (req: Request, res: Response): Promise<any> => {
  const parsed = createCategorySchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten().fieldErrors });
  }

  const { name } = parsed.data;

  const result = await categoryController.createCategory(name);

  if (isErr(result)) {
    return res.status(500).json(internalServerError(result.error));
  }

  return res.status(201).json(created(result.value));
});

router.get("/", async (req: Request, res: Response): Promise<any> => {
  const result = await categoryController.getAllCategories();

  if (isErr(result)) {
    return res.status(500).json(internalServerError(result.error));
  }

  return res.status(200).json(ok(result.value));
});

router.get("/:id", async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  const result = await categoryController.getCategoryById(id);

  if (isErr(result)) {
    return res.status(404).json(notFound(result.error));
  }

  return res.status(200).json(ok(result.value));
});

const updateCategorySchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
});

router.put("/:id", async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const parsed = updateCategorySchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten().fieldErrors });
  }

  const result = await categoryController.updateCategory(id, parsed.data);

  if (isErr(result)) {
    return res.status(500).json(internalServerError(result.error));
  }

  return res.status(200).json(ok(result.value));
});

router.delete("/:id", async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  const result = await categoryController.deleteCategory(id);

  if (isErr(result)) {
    return res.status(500).json(internalServerError(result.error));
  }

  return res.status(200).json(ok(result.value));
});

export default router;
