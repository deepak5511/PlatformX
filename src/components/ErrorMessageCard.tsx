"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { X, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
export interface ErrorMessageCardProps {
  header: string;
  body: string;
  onDismiss: () => void;
  className?: string;
}
export default function ErrorMessageCard({
  header,
  body,
  onDismiss,
  className
}: ErrorMessageCardProps) {
  return <motion.section initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} exit={{
    opacity: 0,
    y: 20
  }} transition={{
    duration: 0.3
  }} role="alert" aria-live="assertive" className={cn("relative w-full max-w-md overflow-hidden rounded-lg border-l-4 border-red-500 bg-card shadow-lg", "dark:bg-card dark:border-red-600", className)} style={{
    '--tw-shadow-color': 'hsl(0, 72%, 51%, 0.1)',
    '--tw-shadow': '0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color)'
  } as React.CSSProperties}>
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 pt-0.5">
            <AlertTriangle className="h-6 w-6 text-red-500 dark:text-red-600" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <h2 className="font-sans text-lg font-bold text-card-foreground">{header}</h2>
            <p className="font-sans mt-1 text-sm text-muted-foreground">{body}</p>
          </div>
          <div className="flex-shrink-0">
            <Button variant="ghost" size="icon" onClick={onDismiss} className="text-muted-foreground hover:bg-muted/50 -mr-2 -mt-2 h-8 w-8 rounded-full" aria-label="Dismiss">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </motion.section>;
}