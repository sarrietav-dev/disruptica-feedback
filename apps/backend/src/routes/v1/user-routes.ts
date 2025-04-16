import { UserController } from "@/features/users/user-controller";
import { isErr } from "@/lib/result";
import { notFound, ok } from "@/lib/serializers";
import { Router } from "express";

const router = Router();

const userController = new UserController();

router.get("/:id", async (req, res): Promise<any> => {
  const { id } = req.params;

  const result = await userController.getUserById(id);

  if (isErr(result)) {
    return res.status(404).json(notFound(result.error));
  }

  return res.status(200).json(ok(result.value));
});

export default router;
