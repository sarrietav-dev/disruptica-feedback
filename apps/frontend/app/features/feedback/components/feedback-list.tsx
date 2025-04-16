import { formatDate } from "~/lib/utils";
import type { Feedback } from "../types/feedback";
import { ProductRating } from "~/features/products/components/product-rating";
import { use, useEffect, useState } from "react";
import getUserById from "~/features/users/api/get-user-by-id";
import { isErr } from "~/lib/result";
import { ErrorBoundary } from "react-error-boundary";

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
            <ErrorBoundary fallback={<div>Error loading user</div>}>
              <DisplayUser userId={item.userId} />
            </ErrorBoundary>
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

function DisplayUser({ userId }: { userId: string }) {
  const [item, setItem] = useState<{ name: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    getUserById(userId)
      .then((result) => {
        if (isMounted) {
          if (isErr(result)) {
            setError("Error loading user information");
          } else {
            setItem(result.value);
          }
        }
      })
      .catch(() => {
        if (isMounted) {
          setError("Error loading user information");
        }
      });

    return () => {
      isMounted = false;
    };
  }, [userId]);

  if (error) {
    return <div className="text-sm text-red-500">{error}</div>;
  }

  if (!item) {
    return <div className="text-sm text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="flex items-center">
      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
        {item.name.charAt(0).toUpperCase()}
      </div>
      <span className="ml-2 font-medium">{item.name}</span>
    </div>
  );
}
