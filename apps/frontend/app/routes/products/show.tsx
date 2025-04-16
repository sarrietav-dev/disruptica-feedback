import { ArrowLeft, Edit } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Card, CardHeader, CardContent } from "~/components/ui/card";
import { formatDate } from "~/lib/utils";
import type { Route } from "./+types/show";
import getProduct from "~/features/products/api/get-product";
import { isErr } from "~/lib/result";
import { ProductRating } from "~/features/products/components/product-rating";
import FeedbackForm from "~/features/feedback/components/feedback-form";
import { FeedbackList } from "~/features/feedback/components/feedback-list";
import type { Feedback } from "~/features/feedback/types/feedback";
import getFeedbackByProductId from "~/features/products/api/get-feedback-by-product";
import getCategory from "~/features/categories/api/get-category";
import { Badge } from "~/components/ui/badge";

export async function clientLoader({ params }: Route.LoaderArgs) {
  const product = await getProduct(params.productId);

  if (isErr(product)) {
    throw new Response("Error loading products", { status: 500 });
  }

  const feedback = await getFeedbackByProductId(params.productId);

  if (isErr(feedback)) {
    throw new Response("Error loading feedback", { status: 500 });
  }

  const productCategory = await getCategory(product.value.categoryId);

  if (isErr(productCategory)) {
    throw new Response("Error loading category", { status: 500 });
  }

  return {
    product: product.value,
    feedback: feedback.value,
    productCategory: productCategory.value,
  };
}

export default function ShowProduct({
  loaderData,
  params,
}: Route.ComponentProps) {
  const data = loaderData;
  const { product, feedback, productCategory } = data;

  const averageRating = Number(product.feedbackAvg);
  const hasRated = false;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            to="/products"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card>
              <CardHeader className="flex flex-row justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold">{product.name}</h1>
                  <div className="flex items-center mt-2">
                    <ProductRating rating={averageRating} />
                    <span className="ml-2 text-sm text-muted-foreground">
                      {averageRating.toFixed(1)} ({feedback.length}{" "}
                      {feedback.length === 1 ? "review" : "reviews"})
                    </span>
                  </div>
                </div>
                <Button asChild variant="outline" size="sm">
                  <Link to={`/products/${product.id}/edit`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="w-full h-64 bg-muted rounded-md mb-6 flex items-center justify-center">
                  <span className="text-muted-foreground">Product Image</span>
                </div>

                <div className="grid gap-4">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Details</h2>
                    <p className="text-muted-foreground">
                      This is a detailed description of the product. In a real
                      application, this would contain comprehensive information
                      about the product's features, specifications, and
                      benefits.
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 text-sm">
                    <p className="font-medium">Category</p>
                    <Badge variant="outline">{productCategory.name}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {!hasRated ? (
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold">Rate this Product</h2>
                </CardHeader>
                <CardContent>
                  <FeedbackForm productId={product.id} />
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold">Thank You!</h2>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    You've already rated this product. Thank you for your
                    feedback!
                  </p>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Customer Reviews</h2>
              </CardHeader>
              <CardContent>
                <FeedbackList feedback={feedback} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
