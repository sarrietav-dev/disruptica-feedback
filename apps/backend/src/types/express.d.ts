import { User } from "@/features/auth/user-model";

declare global {
  namespace Express {
    interface Request {
      user?: User; // Add the custom property here
    }
  }
}
