import { CategoryForm } from "~/features/categories/components/categories-form";
import type { Route } from "./+types/edit";
import getCategory from "~/features/categories/api/get-category";
import { isErr } from "~/lib/result";

export async function clientLoader({ params }: Route.LoaderArgs) {
  const category = await getCategory(params.categoryId);

  if (isErr(category)) {
    throw new Response("Not Found", { status: 404 });
  }

  return {
    category: category.value,
  };
}

export default function EditCategory({ loaderData }: Route.ComponentProps) {
  const { category } = loaderData;

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-md">
        <h1 className="mb-6 text-2xl font-bold">Edit Category</h1>
        <CategoryForm category={category} />
      </div>
    </div>
  );
}
