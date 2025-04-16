import { NewFeedbackForm } from "~/features/feedback/components/new-feedback-form";
import type { Route } from "./+types/new";
import getProducts from "~/features/products/api/get-products";
import { isErr } from "~/lib/result";

export async function clientLoader() {
  const products = await getProducts();

  if (isErr(products)) {
    throw new Response("Error loading products", { status: 500 });
  }

  return {
    products: products.value,
  };
}

export default function NewFeedback({ loaderData }: Route.ComponentProps) {
  const { products } = loaderData;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Submit Feedback</h1>
        <div className="bg-card p-6 rounded-lg shadow-sm border">
          <NewFeedbackForm products={products} />
        </div>
      </div>
    </div>
  );
}
