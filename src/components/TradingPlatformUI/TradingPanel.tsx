"use client";

import * as React from "react";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
export interface TradingPanelProps {}
export default function TradingPanel({}: TradingPanelProps) {
  const [quantity, setQuantity] = useState(100);
  const [orderType, setOrderType] = useState<"market" | "limit">("market");
  const [limitPrice, setLimitPrice] = useState("");
  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(0, prev + amount));
  };
  return <Card className="shadow-lg rounded-xl overflow-hidden border-border">
      <CardHeader className="bg-card">
        <CardTitle className="text-xl font-bold">Trade</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button size="lg" className="w-full text-white font-bold text-base py-6 rounded-lg shadow-md hover:shadow-lg transition-shadow" style={{
          backgroundColor: "#10B981"
        }}>
            Buy
          </Button>
          <Button size="lg" className="w-full text-white font-bold text-base py-6 rounded-lg shadow-md hover:shadow-lg transition-shadow" style={{
          backgroundColor: "#EF4444"
        }}>
            Sell
          </Button>
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantity" className="text-sm font-medium text-muted-foreground">
            Quantity
          </Label>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="rounded-lg" onClick={() => handleQuantityChange(-10)} aria-label="Decrease quantity by 10">
              <Minus className="h-4 w-4" />
            </Button>
            <Input id="quantity" type="number" value={quantity} onChange={e => setQuantity(parseInt(e.target.value, 10) || 0)} className="text-center font-mono text-lg h-12 rounded-lg" style={{
            fontFamily: "'JetBrains Mono', monospace"
          }} />
            <Button variant="outline" size="icon" className="rounded-lg" onClick={() => handleQuantityChange(10)} aria-label="Increase quantity by 10">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">Order Type</Label>
          <ToggleGroup type="single" value={orderType} onValueChange={(value: "market" | "limit") => {
          if (value) setOrderType(value);
        }} className="w-full grid grid-cols-2 gap-2">
            <ToggleGroupItem value="market" aria-label="Market Order" className="py-3 rounded-lg data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">
              Market
            </ToggleGroupItem>
            <ToggleGroupItem value="limit" aria-label="Limit Order" className="py-3 rounded-lg data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">
              Limit
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <AnimatePresence>
          {orderType === "limit" && <motion.div initial={{
          opacity: 0,
          height: 0,
          y: -10
        }} animate={{
          opacity: 1,
          height: "auto",
          y: 0
        }} exit={{
          opacity: 0,
          height: 0,
          y: -10
        }} transition={{
          duration: 0.3,
          ease: "easeInOut"
        }} className="overflow-hidden">
              <div className="space-y-2 pt-2">
                <Label htmlFor="limit-price" className="text-sm font-medium text-muted-foreground">
                  Limit Price
                </Label>
                <Input id="limit-price" type="number" value={limitPrice} onChange={e => setLimitPrice(e.target.value)} placeholder="Enter limit price" className="font-mono text-lg h-12 rounded-lg" style={{
              fontFamily: "'JetBrains Mono', monospace"
            }} />
              </div>
            </motion.div>}
        </AnimatePresence>
      </CardContent>
    </Card>;
}