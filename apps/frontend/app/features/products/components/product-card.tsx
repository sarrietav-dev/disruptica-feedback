import { Card, CardHeader, CardContent } from "~/components/ui/card";
import type { Product } from "../types/product";
import { Badge } from "~/components/ui/badge";
import { useEffect, useState } from "react";
import getCategory from "~/features/categories/api/get-category";
import { isErr } from "~/lib/result";
import type { Category } from "~/features/categories/types/category";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [category, setCategory] = useState<Category>();

  useEffect(() => {
    getCategory(product.categoryId).then((response) => {
      if (isErr(response)) {
        console.error("Error loading category", response.error);
        return;
      }
      setCategory(response.value);
    });
  });

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
          <Badge variant="outline" className="ml-2 shrink-0">
            {category?.name}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="w-full h-40 bg-muted rounded-md mb-4 flex items-center justify-center">
          <span className="text-muted-foreground">Product Image</span>
        </div>
      </CardContent>
    </Card>
  );
}
