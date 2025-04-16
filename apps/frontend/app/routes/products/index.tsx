import ProductList from "~/features/products/components/product-list";
import getProducts from "~/features/products/api/get-products";
import type { Route } from "./+types";
import { isErr } from "~/lib/result";

export async function clientLoader() {
  const product = await getProducts();

  if (isErr(product)) {
    throw new Response("Error loading products", { status: 500 });
  }

  return product.value;
}

export default function IndexProducts({ loaderData }: Route.ComponentProps) {
  const products = loaderData;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <ProductList products={products} />
    </div>
  );
}
