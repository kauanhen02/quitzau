
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Avatar, AvatarFallback } from "@/components/ui/avatar.jsx";

const RecentSales = () => {
  const sales = [
    { id: 1, customer: "Maria Silva", email: "maria@example.com", amount: "R$ 250,00", date: "Hoje, 13:45", initials: "MS" },
    { id: 2, customer: "João Santos", email: "joao@example.com", amount: "R$ 189,90", date: "Hoje, 10:30", initials: "JS" },
    { id: 3, customer: "Ana Oliveira", email: "ana@example.com", amount: "R$ 320,50", date: "Ontem, 16:20", initials: "AO" },
    { id: 4, customer: "Carlos Mendes", email: "carlos@example.com", amount: "R$ 175,00", date: "Ontem, 09:15", initials: "CM" },
    { id: 5, customer: "Lúcia Ferreira", email: "lucia@example.com", amount: "R$ 420,00", date: "12/05/2025", initials: "LF" },
  ];

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg">
      <CardHeader>
        <CardTitle className="text-gray-800 dark:text-white">Vendas Recentes</CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">Você realizou 12 vendas hoje</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {sales.map((sale, index) => (
            <motion.div 
              key={sale.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex items-center"
            >
              <Avatar className="h-9 w-9 border border-aureaon-pink">
                <AvatarFallback className="bg-aureaon-purple text-white text-xs">
                  {sale.initials}
                </AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none text-gray-800 dark:text-white">{sale.customer}</p>
                <p className="text-sm text-muted-foreground">{sale.email}</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-sm font-medium text-gray-800 dark:text-white">{sale.amount}</p>
                <p className="text-sm text-muted-foreground">{sale.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentSales;
