import { Router } from "express";
import authRoutesV1 from "./v1/auth-routes";
import productRoutesV1 from "./v1/product-routes";
import categoryRoutesV1 from "./v1/category-routes";
import feedbackRoutesV1 from "./v1/feedback-routes";
import docsRouter from "./v1/docs-routes";

const router = Router();

router.use("/docs", docsRouter);

router.use("/v1/auth", authRoutesV1);
router.use("/v1/products", productRoutesV1);
router.use("/v1/categories", categoryRoutesV1);
router.use("/v1/feedback", feedbackRoutesV1);

export default router;
