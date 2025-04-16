import getCategories from "~/features/categories/api/get-categories";
import ProductForm from "~/features/products/components/product-form";
import { isErr } from "~/lib/result";
import type { Route } from "./+types/new";

export async function clientLoader() {
  const categories = await getCategories();

  if (isErr(categories)) {
    throw new Response("Error loading categories", { status: 500 });
  }

  return {
    categories: categories.value,
  };
}

export default function CreateProduct({ loaderData }: Route.ComponentProps) {
  const data = loaderData;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Create New Product</h1>
        <div className="bg-card p-6 rounded-lg shadow-sm border">
          <ProductForm {...data} />
        </div>
      </div>
    </div>
  );
}
