import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";
import { apiReference } from "@scalar/express-api-reference";
import helmet from "helmet";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV !== "production") {
  // This configuration is here to use the Scalar API Reference in development mode
  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        directives: {
          defaultSrc: [`'self'`, "unpkg.com"],
          styleSrc: [
            `'self'`,
            `'unsafe-inline'`,
            "cdn.jsdelivr.net",
            "fonts.googleapis.com",
            "unpkg.com",
          ],
          fontSrc: [`'self'`, "fonts.scalar.com", "data:"],
          imgSrc: [`'self'`, "data:", "cdn.jsdelivr.net"],
          scriptSrc: [
            `'self'`,
            `https: 'unsafe-inline'`,
            `cdn.jsdelivr.net`,
            `'unsafe-eval'`,
          ],
        },
      },
    })
  );
} else {
  app.use(helmet());
}

app.use("/api", routes);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

if (process.env.NODE_ENV !== "production") {
  app.use(
    "/reference",
    apiReference({
      // Put your OpenAPI url here:
      url: "/api/docs",
    })
  );
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
