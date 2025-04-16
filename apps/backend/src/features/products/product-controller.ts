import { db, feedback, products } from "@/db/schema";
import { Result, err, ok } from "@/lib/result";
import { avg, eq } from "drizzle-orm";
import { Product } from "./product-model";

export class ProductController {
  async createProduct(
    name: string,
    categoryId: string,
  ): Promise<Result<string, string>> {
    try {
      const result = await db.insert(products).values({
        name,
        categoryId,
      });

      if (!result) {
        return err("Product creation failed");
      }

      return ok("Product created successfully");
    } catch (error) {
      console.log("error", error);
      return err("Internal server error");
    }
  }

  async getAllProducts(categoryId?: string): Promise<Result<any[], string>> {
    try {
      let query = db
        .select()
        .from(products)
        .where(categoryId ? eq(products.categoryId, categoryId) : undefined)
        .orderBy();

      const allProducts = await query;

      if (!allProducts) {
        return err("No products found");
      }

      return ok(allProducts);
    } catch (error) {
      console.log("error", error);
      return err("Internal server error");
    }
  }

  async getProductById(
    productId: string,
  ): Promise<
    Result<
      Omit<Product, "updatedAt" | "createdAt"> & { feedbackAvg: string | null },
      string
    >
  > {
    try {
      const product = await db
        .select({
          feedbackAvg: avg(feedback.rating),
          id: products.id,
          name: products.name,
          categoryId: products.categoryId,
        })
        .from(products)
        .leftJoin(feedback, eq(products.id, feedback.productId))
        .where(eq(products.id, productId))
        .groupBy(products.id);

      if (!product || product.length === 0) {
        return err("Product not found");
      }

      return ok(product[0]);
    } catch (error) {
      console.log("error", error);
      return err("Internal server error");
    }
  }

  async updateProduct(
    productId: string,
    data: { name?: string; description?: string; price?: number },
  ): Promise<Result<Product, string>> {
    try {
      const result = await db
        .update(products)
        .set(data)
        .where(eq(products.id, productId))
        .returning({ products });

      if (!result) {
        return err("Product update failed");
      }

      if (result.length === 0) {
        return err("Product not found");
      }

      return ok(result[0].products);
    } catch (error) {
      console.log("error", error);
      return err("Internal server error");
    }
  }

  async deleteProduct(productId: string): Promise<Result<string, string>> {
    try {
      const result = await db
        .delete(products)
        .where(eq(products.id, productId));

      if (!result) {
        return err("Product deletion failed");
      }

      return ok("Product deleted successfully");
    } catch (error) {
      console.log("error", error);
      return err("Internal server error");
    }
  }

  async getFeedbackByProductId(productId: string) {
    try {
      const result = await db.query.feedback.findMany({
        where: eq(feedback.productId, productId),
      });

      if (!result) {
        return err("Product feedback not found");
      }

      return ok(result);
    } catch (error) {
      console.log("error", error);
      return err("Internal server error");
    }
  }
}
