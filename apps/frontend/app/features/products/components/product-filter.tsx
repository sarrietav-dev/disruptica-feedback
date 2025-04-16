import { Label } from "~/components/ui/label";
import { useNavigate, useSearchParams } from "react-router";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import type { Category } from "~/features/categories/types/category";

interface ProductFiltersProps {
  currentCategory: string;
  currentSort: string;
  categories: Category[];
}

export function ProductFilters({
  currentCategory,
  currentSort,
  categories,
}: ProductFiltersProps) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams();

    params.set("page", "1"); // Reset to first page when filters change

    if (value) {
      params.set("category", value);
    } else {
      params.delete("category");
    }

    setSearchParams(params);

    navigate(`/products?${params.toString()}`);
  };

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1"); // Reset to first page when filters change
    params.set("sort", value);
    setSearchParams(params);
    navigate(`/products?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={currentCategory}
            onValueChange={handleCategoryChange}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="" id="all-categories" />
              <Label htmlFor="all-categories">All Categories</Label>
            </div>
            {categories.map((category) => (
              <div className="flex items-center space-x-2" key={category.id}>
                <RadioGroupItem
                  value={category.id}
                  id={category.name.toLowerCase()}
                />
                <Label htmlFor={category.name.toLowerCase()}>
                  {category.name}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sort By</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={currentSort} onValueChange={handleSortChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select sort order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="name-asc">Name (A-Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z-A)</SelectItem>
              <SelectItem value="rating-high">Highest Rated</SelectItem>
              <SelectItem value="rating-low">Lowest Rated</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </div>
  );
}
