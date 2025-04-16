import ProductList from "~/features/products/components/product-list";

export default function IndexProducts() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <ProductList products={[]} />
    </div>
  );
}
