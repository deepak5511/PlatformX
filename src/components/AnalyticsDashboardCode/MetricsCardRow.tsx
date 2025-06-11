"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
export interface MetricCardProps {
  value: string | number;
  label: string;
  trend: "up" | "down";
  status: "success" | "danger" | "warning" | "neutral";
}
const statusStyles = {
  success: {
    badge: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
    trend: "text-green-500"
  },
  danger: {
    badge: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300",
    trend: "text-red-500"
  },
  warning: {
    badge: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300",
    trend: "text-yellow-500"
  },
  neutral: {
    badge: "bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300",
    trend: "text-gray-500"
  }
};
const MetricCard: React.FC<MetricCardProps> = ({
  value,
  label,
  trend,
  status
}) => {
  const TrendIcon = trend === "up" ? ArrowUp : ArrowDown;
  const styles = statusStyles[status];
  return <motion.div whileHover={{
    y: -4,
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
  }} transition={{
    duration: 0.2
  }} className="w-full">
      <Card className="rounded-lg shadow-light w-full">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <Badge className={cn("text-xs font-semibold rounded-md px-2 py-1", styles.badge)}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          </div>
          <div className="flex items-baseline space-x-2">
            <h2 className="text-4xl font-bold font-mono tracking-tighter">{value}</h2>
            <div className={cn("flex items-center text-sm font-semibold", styles.trend)}>
              <TrendIcon className="h-4 w-4 mr-1" />
              <span>{trend === "up" ? "+5.2%" : "-1.8%"}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>;
};
export interface MetricCardsRowProps {
  metrics: MetricCardProps[];
}
export default function MetricCardsRow({
  metrics
}: MetricCardsRowProps) {
  return <section className="w-full">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => <MetricCard key={index} {...metric} />)}
      </div>
    </section>;
}