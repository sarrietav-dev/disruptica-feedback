import ProductList from "~/features/products/components/product-list";
import getProducts from "~/features/products/api/get-products";
import type { Route } from "./+types";
import { isErr } from "~/lib/result";
import { PlusIcon } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";

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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button asChild>
          <Link to="/products/new">
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>
      <ProductList products={products} />
    </div>
  );
}
