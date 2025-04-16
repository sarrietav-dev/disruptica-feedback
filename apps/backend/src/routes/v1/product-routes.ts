import { ProductController } from "@/features/products/product-controller";
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

const router = Router();
const productController = new ProductController();

const createProductSchema = z.object({
  name: z.string().min(1),
  categoryId: z.string().uuid(),
});

router.post("/", async (req: Request, res: Response): Promise<any> => {
  const parsed = createProductSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten().fieldErrors });
  }

  const { name, categoryId } = parsed.data;

  const result = await productController.createProduct(name, categoryId);

  if (isErr(result)) {
    return res.status(500).json(internalServerError(result.error));
  }

  return res.status(201).json(created(result.value));
});

router.get("/", async (req: Request, res: Response): Promise<any> => {
  const { categoryId } = req.query;

  const parsed = z.string().uuid().safeParse(categoryId);

  if (!parsed.success) {
    return res.status(400).json(badRequest("Invalid category ID"));
  }

  const result = await productController.getAllProducts(parsed.data);

  if (isErr(result)) {
    return res.status(500).json(internalServerError(result.error));
  }

  return res.status(200).json(ok(result.value));
});

router.get("/:id", async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  const result = await productController.getProductById(id);

  if (isErr(result)) {
    return res.status(404).json(notFound(result.error));
  }

  return res.status(200).json(ok(result.value));
});

router.get(
  "/:id/feedback",
  async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    const result = await productController.getFeedbackByProductId(id);

    if (isErr(result)) {
      return res.status(404).json(notFound(result.error));
    }

    return res.status(200).json(ok(result.value));
  }
);

const updateProductSchema = z.object({
  name: z.string().min(1).optional(),
  categoryId: z.string().uuid().optional(),
});

router.put("/:id", async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const parsed = updateProductSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten().fieldErrors });
  }

  const result = await productController.updateProduct(id, parsed.data);

  if (isErr(result)) {
    return res.status(500).json(internalServerError(result.error));
  }

  return res.status(200).json(ok(result.value));
});

router.delete("/:id", async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  const result = await productController.deleteProduct(id);

  if (isErr(result)) {
    return res.status(500).json(internalServerError(result.error));
  }

  return res.status(200).json(ok(result.value));
});

export default router;
