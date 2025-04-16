import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useNavigate, Link } from "react-router";
import { toast } from "sonner";
import { type Category } from "../types/category";
import { useState } from "react";
import updateCategory from "../api/update-category";
import createCategory from "../api/create-category";
import { isErr } from "~/lib/result";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Category name must be at least 2 characters.",
  }),
});

type CategoryFormValues = z.infer<typeof formSchema>;

interface CategoryFormProps {
  category?: Category;
}

export function CategoryForm({ category }: CategoryFormProps) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues: Partial<CategoryFormValues> = {
    name: category?.name || "",
  };

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  async function onSubmit(values: CategoryFormValues) {
    setIsSubmitting(true);
    try {
      let result;
      if (category) {
        result = await updateCategory(category.id, values);
      } else {
        result = await createCategory(values);
      }

      if (isErr(result)) {
        toast.error("Error", {
          description: result.error || "An error occurred",
        });
      } else {
        toast(category ? "Category updated" : "Category created", {
          description: `The category has been ${
            category ? "updated" : "created"
          } successfully.`,
        });
        navigate("/admin/categories");
      }
    } catch (err) {
      toast.error("Error", {
        description: "An unexpected error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter category name" {...field} />
              </FormControl>
              <FormDescription>
                The name of your category as it will appear to users.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button variant="outline" asChild>
            <Link to="/admin/categories">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? category
                ? "Updating..."
                : "Creating..."
              : category
              ? "Update Category"
              : "Create Category"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
