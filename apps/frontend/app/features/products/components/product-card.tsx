import { Card, CardHeader, CardContent } from "~/components/ui/card";
import type { Product } from "../types/product";
import { Badge } from "~/components/ui/badge";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
          <Badge variant="outline" className="ml-2 shrink-0">
            {product.categoryId.substring(0, 8)}
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
