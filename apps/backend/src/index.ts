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
app.use(helmet())

app.use("/api", routes);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use(
  '/reference',
  apiReference({
    // Put your OpenAPI url here:
    url: '/api/docs',
  }),
)

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
