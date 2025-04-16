import { Link } from "react-router";
import type { Product } from "../types/product";
import ProductCard from "./product-card";

interface ProductListProps {
  products: Product[];
}

export default async function ProductList({ products }: ProductListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link to={`/products/${product.id}`} key={product.id}>
          <ProductCard key={product.id} product={product} />
        </Link>
      ))}
    </div>
  );
}
