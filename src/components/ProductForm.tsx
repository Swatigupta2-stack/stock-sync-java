import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCreateProduct, useUpdateProduct, Product } from "@/hooks/useProducts";

interface ProductFormProps {
  product?: Product;
  onCancel?: () => void;
  onSuccess?: () => void;
}

export const ProductForm = ({ product, onCancel, onSuccess }: ProductFormProps) => {
  const [name, setName] = useState(product?.name || "");
  const [quantity, setQuantity] = useState(product?.quantity?.toString() || "");
  const [price, setPrice] = useState(product?.price?.toString() || "");

  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !quantity || !price) {
      return;
    }

    const productData = {
      name: name.trim(),
      quantity: parseInt(quantity),
      price: parseFloat(price),
    };

    try {
      if (product) {
        await updateProduct.mutateAsync({ id: product.id, ...productData });
      } else {
        await createProduct.mutateAsync(productData);
      }
      
      // Reset form
      setName("");
      setQuantity("");
      setPrice("");
      
      onSuccess?.();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const isLoading = createProduct.isPending || updateProduct.isPending;

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">
          {product ? "Update Product" : "Add New Product"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter product name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter quantity"
              min="0"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              min="0"
              required
            />
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button 
              type="submit" 
              className="flex-1"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : (product ? "Update" : "Add Product")}
            </Button>
            {onCancel && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
                disabled={isLoading}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};