"use client";

import * as React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";
export interface TopBannerProps {
  scenario: string;
  marketPrice: number;
  priceChange: number;
  priceChangePercentage: number;
  isPriceUp: boolean;
  timeRemaining: string;
}
export default function TopBanner({
  scenario,
  marketPrice,
  priceChange,
  priceChangePercentage,
  isPriceUp,
  timeRemaining
}: TopBannerProps) {
  const priceColor = isPriceUp ? "text-green-500" : "text-red-500";
  const PriceIcon = isPriceUp ? ArrowUpRight : ArrowDownRight;
  return <header className="bg-card border-b border-border shadow-sm p-4 sm:p-6">
      <div className="container mx-auto max-w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
          {/* Scenario Description */}
          <div className="text-center md:text-left">
            <h1 className="text-lg sm:text-xl font-bold text-foreground tracking-tight">
              {scenario}
            </h1>
          </div>

          {/* Market Price */}
          <div className="flex flex-col items-center gap-1">
            <div className={cn("flex items-baseline gap-2", priceColor)}>
              <p className="font-mono text-4xl sm:text-5xl font-bold" style={{
              fontFamily: "'JetBrains Mono', monospace"
            }} aria-label={`Current market price: ${marketPrice}`}>
                {marketPrice.toFixed(2)}
              </p>
              <PriceIcon className="h-6 w-6 sm:h-8 sm:w-8" strokeWidth={2.5} />
            </div>
            <p className={cn("font-mono text-sm font-medium", priceColor)} style={{
            fontFamily: "'JetBrains Mono', monospace"
          }}>
              {isPriceUp ? "+" : ""}
              {priceChange.toFixed(2)} ({priceChangePercentage.toFixed(2)}%)
            </p>
          </div>

          {/* Time Remaining */}
          <div className="flex flex-col items-center md:items-end">
            <p className="text-sm text-muted-foreground">Time Remaining</p>
            <p className="text-2xl sm:text-3xl font-bold text-secondary-foreground" aria-label={`Time remaining: ${timeRemaining}`}>
              {timeRemaining}
            </p>
          </div>
        </div>
      </div>
    </header>;
}