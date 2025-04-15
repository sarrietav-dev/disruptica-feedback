import { db, products } from "@/db/schema";
import { Result, err, ok } from "@/lib/result";
import { eq } from "drizzle-orm";

export class ProductController {
  async createProduct(
    name: string,
    categoryId: string
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

  async getAllProducts(): Promise<Result<any[], string>> {
    try {
      const allProducts = await db.select().from(products);

      if (!allProducts) {
        return err("No products found");
      }

      return ok(allProducts);
    } catch (error) {
      console.log("error", error);
      return err("Internal server error");
    }
  }

  async getProductById(productId: string): Promise<Result<any, string>> {
    try {
      const product = await db
        .select()
        .from(products)
        .where(eq(products.id, productId));

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
    data: { name?: string; description?: string; price?: number }
  ): Promise<Result<string, string>> {
    try {
      const result = await db
        .update(products)
        .set(data)
        .where(eq(products.id, productId));

      if (!result) {
        return err("Product update failed");
      }

      return ok("Product updated successfully");
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
}
