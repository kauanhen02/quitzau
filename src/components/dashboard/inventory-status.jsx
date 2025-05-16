
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.jsx";

const InventoryStatus = () => {
  const lowStockItems = [
    { id: 1, name: "Essência de Lavanda", current: 5, minimum: 10 },
    { id: 2, name: "Óleo de Bergamota", current: 3, minimum: 8 },
    { id: 3, name: "Fixador Floral", current: 2, minimum: 5 },
  ];

  const popularItems = [
    { id: 1, name: "Essência de Baunilha", sold: 42 },
    { id: 2, name: "Óleo de Sândalo", sold: 38 },
    { id: 3, name: "Essência de Jasmim", sold: 35 },
  ];

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg">
      <CardHeader>
        <CardTitle className="text-gray-800 dark:text-white">Status do Estoque</CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">Monitore seus produtos mais importantes</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="low">
          <TabsList className="grid w-full grid-cols-2 bg-gray-100 dark:bg-gray-700 rounded-md">
            <TabsTrigger value="low" className="data-[state=active]:bg-aureaon-purple data-[state=active]:text-white dark:data-[state=active]:text-white">Estoque Baixo</TabsTrigger>
            <TabsTrigger value="popular" className="data-[state=active]:bg-aureaon-purple data-[state=active]:text-white dark:data-[state=active]:text-white">Mais Vendidos</TabsTrigger>
          </TabsList>
          <TabsContent value="low" className="mt-4">
            <div className="space-y-4">
              {lowStockItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Mínimo: {item.minimum} unidades
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-red-500 font-medium">{item.current}</span>
                    <span className="text-muted-foreground ml-1">restantes</span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="popular" className="mt-4">
            <div className="space-y-4">
              {popularItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <p className="font-medium text-gray-800 dark:text-white">{item.name}</p>
                  <div className="flex items-center">
                    <span className="text-aureaon-purple font-medium">{item.sold}</span>
                    <span className="text-muted-foreground ml-1">vendidos</span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default InventoryStatus;
