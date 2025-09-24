import { useState } from "react";
import { ProductList } from "@/components/ProductList";
import { ProductForm } from "@/components/ProductForm";
import { InventoryStats } from "@/components/InventoryStats";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Package } from "lucide-react";

const Index = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Inventory Management System</h1>
              <p className="text-sm text-muted-foreground">
                Manage your products with ease
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {showAddForm ? (
          <div className="space-y-6">
            <Button
              variant="outline"
              onClick={() => setShowAddForm(false)}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Inventory
            </Button>
            <ProductForm
              onSuccess={() => setShowAddForm(false)}
              onCancel={() => setShowAddForm(false)}
            />
          </div>
        ) : (
          <div className="space-y-6">
            <InventoryStats />
            <ProductList onAddProduct={() => setShowAddForm(true)} />
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
