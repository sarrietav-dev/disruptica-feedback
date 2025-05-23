import { PlusIcon } from "lucide-react";
import { Link, useSearchParams } from "react-router";
import { Button } from "~/components/ui/button";
import getFeedback from "~/features/feedback/api/get-feedback";
import { isErr } from "~/lib/result";
import type { Route } from "./+types";
import { FeedbackFilters } from "~/features/feedback/components/feedback-filters";
import getProducts from "~/features/products/api/get-products";
import FeedbackList from "~/features/feedback/components/feedack-list-page";

export async function clientLoader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const product = url.searchParams.get("product") ?? undefined;
  const rating = url.searchParams.get("rating") ?? undefined;

  const feedback = await getFeedback(
    product,
    rating && rating !== "all" ? Number(rating) : undefined,
  );

  if (isErr(feedback)) {
    throw new Response("Error loading feedback", { status: 500 });
  }

  const products = await getProducts();

  if (isErr(products)) {
    throw new Response("Error loading products", { status: 500 });
  }

  return {
    feedback: feedback.value,
    products: products.value,
  };
}

export default function IndexFeedback({ loaderData }: Route.ComponentProps) {
  const { feedback, products } = loaderData;
  const [searchParams] = useSearchParams();
  const product = searchParams.get("product") || "";
  const rating = searchParams.get("rating") || "";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Feedback</h1>
          <p className="text-muted-foreground">
            View and manage customer feedback
          </p>
        </div>
        <Button asChild>
          <Link to="/feedback/new">
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Feedback
          </Link>
        </Button>
      </div>

      <div className="grid md:grid-cols-[240px_1fr] gap-8">
        <FeedbackFilters
          currentProduct={product}
          currentRating={rating}
          products={products}
        />
        <div className="space-y-6">
          <FeedbackList feedback={feedback} />
        </div>
      </div>
    </div>
  );
}
