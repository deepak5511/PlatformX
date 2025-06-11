"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
export interface StatusBadgeProps {
  label: string;
  status: "success" | "danger" | "warning" | "neutral";
}
const statusStyles = {
  success: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-800",
  danger: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-800",
  warning: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-800",
  neutral: "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-700"
};
const StatusBadge: React.FC<StatusBadgeProps> = ({
  label,
  status
}) => {
  return <motion.div whileHover={{
    y: -2
  }} transition={{
    duration: 0.15
  }}>
      <Badge className={cn("text-sm font-bold font-sans px-4 py-2 rounded-md border", statusStyles[status])} aria-label={`Status: ${label}`}>
        {label}
      </Badge>
    </motion.div>;
};
export interface StatusBadgesShowcaseSectionProps {
  badges: StatusBadgeProps[];
}
export default function StatusBadgesShowcaseSection({
  badges
}: StatusBadgesShowcaseSectionProps) {
  return <section className="w-full p-8 bg-card rounded-lg shadow-light">
        <h3 className="text-lg font-semibold mb-6 text-card-foreground">Status Badges</h3>
        <div className="flex flex-wrap items-center gap-4">
            {badges.map((badge, index) => <StatusBadge key={index} {...badge} />)}
        </div>
    </section>;
}