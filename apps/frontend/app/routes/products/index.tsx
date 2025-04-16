import ProductList from "~/features/products/components/product-list";
import getProducts from "~/features/products/api/get-products";
import type { Route } from "./+types";
import { isErr } from "~/lib/result";
import { PlusIcon } from "lucide-react";
import { Link, useSearchParams } from "react-router";
import { Button } from "~/components/ui/button";
import { ProductFilters } from "~/features/products/components/product-filter";
import getCategories from "~/features/categories/api/get-categories";

export async function clientLoader({}: Route.LoaderArgs) {
  const product = await getProducts();

  if (isErr(product)) {
    throw new Response("Error loading products", { status: 500 });
  }

  const categories = await getCategories()

  if (isErr(categories)) {
    throw new Response("Error loading categories", { status: 500 });
  }

  return {
    products: product.value,
    categories: categories.value,
  };
}

export default function IndexProducts({ loaderData }: Route.ComponentProps) {
  const {products, categories} = loaderData;
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "latest";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground">Manage and view all products</p>
        </div>
        <Button asChild>
          <Link to="/products/new">
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>

      <div className="grid md:grid-cols-[240px_1fr] gap-8">
        <ProductFilters currentCategory={category} currentSort={sort} categories={categories} />
        <div className="space-y-6">
          <ProductList products={products} />
        </div>
      </div>
    </div>
  );
}
