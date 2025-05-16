
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const StatsCard = ({ title, value, icon: Icon, trend, trendValue, className }) => {
  const isPositive = trend === "up";
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={cn("aureaon-dashboard-card overflow-hidden", className)}>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          <div className="w-8 h-8 bg-aureaon-purple/10 rounded-full flex items-center justify-center">
            <Icon className="h-4 w-4 text-aureaon-purple" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          {trendValue && (
            <p className={cn(
              "text-xs flex items-center mt-1",
              isPositive ? "text-green-600" : "text-red-600"
            )}>
              {isPositive ? "↑" : "↓"} {trendValue}
              <span className="text-muted-foreground ml-1">desde o último mês</span>
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatsCard;
