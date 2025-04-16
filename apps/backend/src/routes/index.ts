import { Router } from "express";
import authRoutesV1 from "./v1/auth-routes";
import productRoutesV1 from "./v1/product-routes";
import categoryRoutesV1 from "./v1/category-routes";
import feedbackRoutesV1 from "./v1/feedback-routes";
import userRoutesV1 from "./v1/user-routes";
import docsRouter from "./v1/docs-routes";
import { authMiddleware } from "@/features/auth/auth-middleware";

const router = Router();

router.use("/docs", docsRouter);

router.use("/v1/auth", authRoutesV1);
router.use("/v1/products", authMiddleware, productRoutesV1);
router.use("/v1/categories", authMiddleware, categoryRoutesV1);
router.use("/v1/feedback", authMiddleware, feedbackRoutesV1);
router.use("/v1/users", userRoutesV1);

export default router;
