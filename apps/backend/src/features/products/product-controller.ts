import { PrismaClient } from "@/generated/prisma";
import { Result, err, ok } from "@/lib/result";
import { Product } from "./product-model";

const prisma = new PrismaClient();

export class ProductController {
  async createProduct(
    name: string,
    categoryId: string
  ): Promise<Result<string, string>> {
    try {
      const product = await prisma.product.create({
        data: {
          name,
          categoryId,
        },
      });

      if (!product) {
        return err("Product creation failed");
      }

      return ok("Product created successfully");
    } catch (error) {
      console.log("error", error);
      return err("Internal server error");
    }
  }

  async getAllProducts(): Promise<Result<Product[], string>> {
    try {
      const products = await prisma.product.findMany();

      if (!products) {
        return err("No products found");
      }

      return ok(products);
    } catch (error) {
      console.log("error", error);
      return err("Internal server error");
    }
  }

  async getProductById(productId: string): Promise<Result<Product, string>> {
    try {
      const product = await prisma.product.findUnique({
        where: { id: productId },
      });

      if (!product) {
        return err("Product not found");
      }

      return ok(product);
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
      const product = await prisma.product.update({
        where: { id: productId },
        data,
      });

      if (!product) {
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
      const product = await prisma.product.delete({
        where: { id: productId },
      });

      if (!product) {
        return err("Product deletion failed");
      }

      return ok("Product deleted successfully");
    } catch (error) {
      console.log("error", error);
      return err("Internal server error");
    }
  }
}
