import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, DollarSign, AlertTriangle, TrendingUp } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";

export const InventoryStats = () => {
  const { data: products } = useProducts();

  if (!products) return null;

  const totalProducts = products.length;
  const totalValue = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  const lowStockItems = products.filter(product => product.quantity <= 10).length;
  const outOfStockItems = products.filter(product => product.quantity === 0).length;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const stats = [
    {
      title: "Total Products",
      value: totalProducts,
      icon: Package,
      description: "Items in inventory",
    },
    {
      title: "Total Value",
      value: formatCurrency(totalValue),
      icon: DollarSign,
      description: "Inventory worth",
    },
    {
      title: "Low Stock Alert",
      value: lowStockItems,
      icon: AlertTriangle,
      description: "Items need restocking",
      warning: lowStockItems > 0,
    },
    {
      title: "Out of Stock",
      value: outOfStockItems,
      icon: TrendingUp,
      description: "Items unavailable",
      critical: outOfStockItems > 0,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${
              stat.critical 
                ? "text-destructive" 
                : stat.warning 
                ? "text-warning" 
                : "text-muted-foreground"
            }`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${
              stat.critical 
                ? "text-destructive" 
                : stat.warning 
                ? "text-warning" 
                : ""
            }`}>
              {stat.value}
            </div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};