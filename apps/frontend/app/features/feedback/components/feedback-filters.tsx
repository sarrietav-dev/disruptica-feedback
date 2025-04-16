import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "~/components/ui/select";
import { useSearchParams } from "react-router";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import type { Product } from "~/features/products/types/product";

interface FeedbackFiltersProps {
  currentProduct: string;
  currentRating: string;
  products: Product[];
}

export function FeedbackFilters({
  currentProduct,
  currentRating,
  products,
}: FeedbackFiltersProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleProductChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1"); // Reset to first page when filters change

    if (value) {
      params.set("product", value);
    } else {
      params.delete("product");
    }

    setSearchParams(params);
  };

  const handleRatingChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1"); // Reset to first page when filters change

    if (value) {
      params.set("rating", value);
    } else {
      params.delete("rating");
    }

    setSearchParams(params);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={currentProduct} onValueChange={handleProductChange}>
            <SelectTrigger>
              <SelectValue placeholder="All Products" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Products</SelectItem>
              {products.map((product) => (
                <SelectItem key={product.id} value={product.id}>
                  {product.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Rating</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={currentRating}
            onValueChange={handleRatingChange}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all-ratings" />
              <Label htmlFor="all-ratings">All Ratings</Label>
            </div>
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={rating.toString()}
                  id={`rating-${rating}`}
                />
                <Label htmlFor={`rating-${rating}`}>{rating} Stars & Up</Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  );
}
