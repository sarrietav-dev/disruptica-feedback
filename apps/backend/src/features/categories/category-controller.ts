import { Result, err, ok } from "@/lib/result";
import { Category } from "./category-model";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export class CategoryController {
  async createCategory(name: string): Promise<Result<string, string>> {
    try {
      const category = await prisma.category.create({
        data: {
          name,
        },
      });

      if (!category) {
        return err("Category creation failed");
      }

      return ok("Category created successfully");
    } catch (error) {
      console.log("error", error);
      return err("Internal server error");
    }
  }

  async getCategoryById(categoryId: string): Promise<Result<Category, string>> {
    try {
      const category = await prisma.category.findUnique({
        where: { id: categoryId },
      });

      if (!category) {
        return err("Category not found");
      }

      return ok(category);
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
      const category = await prisma.category.update({
        where: { id: categoryId },
        data,
      });

      if (!category) {
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
      const category = await prisma.category.delete({
        where: { id: categoryId },
      });

      if (!category) {
        return err("Category deletion failed");
      }

      return ok("Category deleted successfully");
    } catch (error) {
      console.log("error", error);
      return err("Internal server error");
    }
  }

  async getAllCategories(): Promise<Result<Category[], string>> {
    try {
      const categories = await prisma.category.findMany();

      if (!categories) {
        return err("No categories found");
      }

      return ok(categories);
    } catch (error) {
      console.log("error", error);
      return err("Internal server error");
    }
  }
}
