import { Link } from "react-router";
import { Card, CardHeader, CardContent } from "~/components/ui/card";
import { ProductRating } from "~/features/products/components/product-rating";
import { formatDate } from "~/lib/utils";
import type { Feedback } from "../types/feedback";
import type { Product } from "~/features/products/types/product";
import { useEffect, useState } from "react";
import getProduct from "~/features/products/api/get-product";
import { isErr } from "~/lib/result";
import getUserById from "~/features/users/api/get-user-by-id";

interface FeedbackListProps {
  feedback: Feedback[];
}

export default function FeedbackList({ feedback }: FeedbackListProps) {
  if (feedback.length === 0) {
    return (
      <div className="text-center py-12 bg-muted/40 rounded-lg">
        <p className="text-muted-foreground">No feedback found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {feedback.map((item) => (
        <Card key={item.id}>
          <CardHeader className="pb-2">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
              <div>
                <DisplayProduct productId={item.productId} />
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-muted-foreground">
                    {formatDate(item.createdAt)}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ProductRating rating={item.rating} />
                <span className="text-sm font-medium">{item.rating}/5</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <DisplayContent userId={item.userId} comment={item.comment} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function DisplayProduct({ productId }: { productId: string }) {
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    getProduct(productId).then((response) => {
      if (isErr(response)) {
        console.error("Error loading product", response.error);
        return;
      }
      setProduct(response.value);
    });
  }, [productId]);

  return (
    <Link
      to={`/products/${productId}`}
      className="font-semibold hover:underline"
    >
      {product?.name}
    </Link>
  );
}

function DisplayContent({
  userId,
  comment,
}: {
  userId: string;
  comment: string;
}) {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    getUserById(userId)
      .then((result) => {
        if (isMounted) {
          if (isErr(result)) {
            setError("Error loading user information");
          } else {
            setUser(result.value);
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

  if (!user) {
    return <div className="text-sm text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="flex items-start gap-3">
      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium shrink-0">
        {user.name.charAt(0).toUpperCase()}
      </div>
      <div>
        <p className="font-medium">{user.name}</p>
        <p className="text-sm mt-1">{comment}</p>
      </div>
    </div>
  );
}
