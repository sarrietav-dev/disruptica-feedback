import { PlusIcon } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { CategoryList } from "~/features/categories/components/categories-list";
import type { Route } from "./+types";
import getCategories from "~/features/categories/api/get-categories";
import { isErr } from "~/lib/result";

export async function clientLoader() {
  const categories = await getCategories();

  if (isErr(categories)) {
    throw new Response("Not Found", { status: 404 });
  }

  return {
    categories: categories.value,
  };
}

export default async function IndexCategories({
  loaderData,
}: Route.ComponentProps) {
  const { categories } = loaderData;

  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Categories</h1>
          <p className="text-muted-foreground">Manage product categories</p>
        </div>
        <Button asChild>
          <Link to="/admin/categories/new">
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Category
          </Link>
        </Button>
      </div>

      <CategoryList categories={categories} />
    </div>
  );
}
