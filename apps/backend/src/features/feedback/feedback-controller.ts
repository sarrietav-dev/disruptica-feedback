import { PrismaClient } from "@/generated/prisma";
import { Result, err, ok } from "@/lib/result";
import { Feedback } from "./feedback-model";

const prisma = new PrismaClient();

export class FeedbackController {
  async createFeedback(
    comment: string,
    rating: number,
    userId: string,
    productId: string
  ): Promise<Result<string, string>> {
    try {
      const feedback = await prisma.feedback.create({
        data: {
          userId,
          productId,
          comment,
          rating,
        },
      });

      if (!feedback) {
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
      const feedbacks = await prisma.feedback.findMany();

      if (!feedbacks) {
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
      const feedback = await prisma.feedback.findUnique({
        where: { id: feedbackId },
      });

      if (!feedback) {
        return err("Feedback not found");
      }

      return ok(feedback);
    } catch (error) {
      console.log("error", error);
      return err("Internal server error");
    }
  }

  async updateFeedback(
    feedbackId: string,
    data: { comment?: string, rating?: number }
  ): Promise<Result<string, string>> {
    try {
      const feedback = await prisma.feedback.update({
        where: { id: feedbackId },
        data,
      });

      if (!feedback) {
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
      const feedback = await prisma.feedback.delete({
        where: { id: feedbackId },
      });

      if (!feedback) {
        return err("Feedback deletion failed");
      }

      return ok("Feedback deleted successfully");
    } catch (error) {
      console.log("error", error);
      return err("Internal server error");
    }
  }
}
