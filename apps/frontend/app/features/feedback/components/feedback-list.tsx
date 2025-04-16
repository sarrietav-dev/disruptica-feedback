import { formatDate } from "~/lib/utils";
import type { Feedback } from "../types/feedback";
import { ProductRating } from "~/features/products/components/product-rating";

interface FeedbackListProps {
  feedback: Feedback[];
}

export function FeedbackList({ feedback }: FeedbackListProps) {
  if (feedback.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-muted-foreground">
          No reviews yet. Be the first to review!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {feedback.map((item) => (
        <div key={item.id} className="border-b pb-4 last:border-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                {item.userId.charAt(0).toUpperCase()}
              </div>
              <span className="ml-2 font-medium">{item.userId}</span>
            </div>
            <span className="text-xs text-muted-foreground">
              {formatDate(item.createdAt)}
            </span>
          </div>

          <div className="mb-2">
            <ProductRating rating={item.rating} size="sm" />
          </div>

          <p className="text-sm">{item.comment}</p>
        </div>
      ))}
    </div>
  );
}
