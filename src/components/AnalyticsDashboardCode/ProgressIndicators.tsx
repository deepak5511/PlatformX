"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
export interface ProgressIndicatorProps {
  label: string;
  value: number;
  color: "success" | "warning";
}
const colorStyles = {
  success: "bg-green-500",
  warning: "bg-yellow-500"
};
const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  label,
  value,
  color
}) => {
  return <motion.div whileHover={{
    y: -4,
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
  }} transition={{
    duration: 0.2
  }} className="w-full">
      <Card className="rounded-lg shadow-light w-full">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-md font-medium text-foreground">{label}</h3>
            <span className="text-lg font-bold font-mono text-muted-foreground">{value}%</span>
          </div>
          <Progress value={value} className="h-3 rounded-md" aria-label={`${label} progress`} aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} />
        </CardContent>
      </Card>
    </motion.div>;
};
export interface ProgressIndicatorsProps {
  indicators: ProgressIndicatorProps[];
}
export default function ProgressIndicators({
  indicators
}: ProgressIndicatorsProps) {
  return <section className="w-full">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {indicators.map((indicator, index) => <ProgressIndicator key={index} {...indicator} />)}
      </div>
    </section>;
}