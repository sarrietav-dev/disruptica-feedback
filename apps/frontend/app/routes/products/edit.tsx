import ProductForm from "~/features/products/components/product-form";

export default function EditProduct() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
        <div className="bg-card p-6 rounded-lg shadow-sm border">
          <ProductForm categories={[]} />
        </div>
      </div>
    </div>
  );
}
