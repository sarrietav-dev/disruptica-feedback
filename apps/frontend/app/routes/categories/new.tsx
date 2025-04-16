import { CategoryForm } from "~/features/categories/components/categories-form";

export default function NewCategory() {
  return (
    <div className="container py-8">
      <div className="mx-auto max-w-md">
        <h1 className="mb-6 text-2xl font-bold">Create Category</h1>
        <CategoryForm />
      </div>
    </div>
  );
}
