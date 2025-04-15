import { db, feedback } from "@/db/schema";
import { Result, err, ok } from "@/lib/result";
import { Feedback } from "./feedback-model";
import { eq } from "drizzle-orm";

export class FeedbackController {
  async createFeedback(
    comment: string,
    rating: number,
    userId: string,
    productId: string
  ): Promise<Result<string, string>> {
    try {
      const result = await db.insert(feedback).values({
        userId,
        productId,
        comment,
        rating,
      });

      if (!result) {
        return err("Feedback creation failed");
      }

      return ok("Feedback created successfully");
    } catch (error) {
      console.log("error", error);
      return err("Internal server error");
    }
  }

  async getAllFeedback(): Promise<Result<Feedback[], string>> {
    try {
      const feedbacks = await db.select().from(feedback);

      if (!feedbacks || feedbacks.length === 0) {
        return err("No feedback found");
      }

      return ok(feedbacks);
    } catch (error) {
      console.log("error", error);
      return err("Internal server error");
    }
  }

  async getFeedbackById(feedbackId: string): Promise<Result<Feedback, string>> {
    try {
      const feedbackItems = await db
        .select()
        .from(feedback)
        .where(eq(feedback.id, feedbackId));

      if (!feedbackItems || feedbackItems.length === 0) {
        return err("Feedback not found");
      }

      return ok(feedbackItems[0]);
    } catch (error) {
      console.log("error", error);
      return err("Internal server error");
    }
  }

  async updateFeedback(
    feedbackId: string,
    data: { comment?: string; rating?: number }
  ): Promise<Result<string, string>> {
    try {
      const result = await db
        .update(feedback)
        .set(data)
        .where(eq(feedback.id, feedbackId));

      if (!result) {
        return err("Feedback update failed");
      }

      return ok("Feedback updated successfully");
    } catch (error) {
      console.log("error", error);
      return err("Internal server error");
    }
  }

  async deleteFeedback(feedbackId: string): Promise<Result<string, string>> {
    try {
      const result = await db
        .delete(feedback)
        .where(eq(feedback.id, feedbackId));

      if (!result) {
        return err("Feedback deletion failed");
      }

      return ok("Feedback deleted successfully");
    } catch (error) {
      console.log("error", error);
      return err("Internal server error");
    }
  }
}
