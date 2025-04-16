import { User } from "@/features/auth/user-model";

declare global {
  namespace Express {
    interface Request {
      userId?: string; // Add the custom property here
    }
  }
}
