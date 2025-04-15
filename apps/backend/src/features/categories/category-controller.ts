import { categories, db } from "@/db/schema";
import { Result, err, ok } from "@/lib/result";
import { eq } from "drizzle-orm";

export class CategoryController {
  async createCategory(name: string): Promise<Result<string, string>> {
    try {
      const result = await db.insert(categories).values({
        name,
      });

      if (!result) {
        return err("Category creation failed");
      }

      return ok("Category created successfully");
    } catch (error) {
      console.log("error", error);
      return err("Internal server error");
    }
  }

  async getCategoryById(categoryId: string): Promise<Result<any, string>> {
    try {
      const category = await db
        .select()
        .from(categories)
        .where(eq(categories.id, categoryId));

      if (!category || category.length === 0) {
        return err("Category not found");
      }

      return ok(category[0]);
    } catch (error) {
      console.log("error", error);
      return err("Internal server error");
    }
  }

  async updateCategory(
    categoryId: string,
    data: { name?: string; description?: string }
  ): Promise<Result<string, string>> {
    try {
      const result = await db
        .update(categories)
        .set(data)
        .where(eq(categories.id, categoryId));

      if (!result) {
        return err("Category update failed");
      }

      return ok("Category updated successfully");
    } catch (error) {
      console.log("error", error);
      return err("Internal server error");
    }
  }

  async deleteCategory(categoryId: string): Promise<Result<string, string>> {
    try {
      const result = await db
        .delete(categories)
        .where(eq(categories.id, categoryId));

      if (!result) {
        return err("Category deletion failed");
      }

      return ok("Category deleted successfully");
    } catch (error) {
      console.log("error", error);
      return err("Internal server error");
    }
  }

  async getAllCategories(): Promise<Result<any[], string>> {
    try {
      const allCategories = await db.select().from(categories);

      if (!allCategories) {
        return err("No categories found");
      }

      return ok(allCategories);
    } catch (error) {
      console.log("error", error);
      return err("Internal server error");
    }
  }
}
