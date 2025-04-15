import { Router } from "express";
import authRoutesV1 from "./v1/auth-routes";
import docsRouter from "./v1/docs-routes";

const router = Router();

router.use("/docs", docsRouter);

router.use("/v1/auth", authRoutesV1);

export default router;
