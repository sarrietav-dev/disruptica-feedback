import getProduct from "~/features/products/api/get-product";
import ProductForm from "~/features/products/components/product-form";
import { isErr } from "~/lib/result";
import type { Route } from "./+types/edit";

export async function clientLoader({ params }: Route.LoaderArgs) {
  const product = await getProduct(params.productId);

  if (isErr(product)) {
    throw new Response("Error loading products", { status: 500 });
  }

  return product.value;
}

export default function EditProduct({ loaderData }: Route.ComponentProps) {
  const product = loaderData;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
        <div className="bg-card p-6 rounded-lg shadow-sm border">
          <ProductForm categories={[]} product={product} />
        </div>
      </div>
    </div>
  );
}
