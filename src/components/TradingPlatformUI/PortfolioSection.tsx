"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
interface Position {
  instrument: string;
  quantity: number;
  avgPrice: number;
  currentValue: number;
}
interface UnrealizedPL {
  amount: number;
  percentage: number;
  isPositive: boolean;
}
interface Trade {
  id: string;
  type: "BUY" | "SELL";
  instrument: string;
  quantity: number;
  price: number;
  time: string;
}
export interface PortfolioSectionProps {
  position: Position;
  unrealizedPL: UnrealizedPL;
  tradeHistory: Trade[];
}
export default function PortfolioSection({
  position,
  unrealizedPL,
  tradeHistory
}: PortfolioSectionProps) {
  const plColor = unrealizedPL.isPositive ? "text-green-500" : "text-red-500";
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(value);
  };
  return <Card className="shadow-lg rounded-xl overflow-hidden border-border h-full flex flex-col">
      <CardHeader className="bg-card">
        <CardTitle className="text-xl font-bold">Portfolio</CardTitle>
      </CardHeader>
      <CardContent className="p-6 grid gap-6 md:grid-cols-2 flex-1">
        {/* Current Position & P&L */}
        <div className="space-y-6">
          <Card className="bg-background/50 rounded-lg">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Current Position</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Instrument</span>
                <span className="font-medium">{position.instrument}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Quantity</span>
                <span className="font-medium">{position.quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Avg. Price</span>
                <span className="font-medium">{formatCurrency(position.avgPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Market Value</span>
                <span className="font-medium">{formatCurrency(position.currentValue)}</span>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-background/50 rounded-lg">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Unrealized P&L</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={cn("text-4xl font-bold font-mono", plColor)} style={{
              fontFamily: "'JetBrains Mono', monospace"
            }}>
                {unrealizedPL.isPositive ? "+" : ""}
                {formatCurrency(unrealizedPL.amount)}
              </p>
              <p className={cn("text-sm font-medium font-mono", plColor)} style={{
              fontFamily: "'JetBrains Mono', monospace"
            }}>
                {unrealizedPL.isPositive ? "+" : ""}
                {unrealizedPL.percentage.toFixed(2)}%
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Trade History */}
        <div className="md:col-span-1 flex flex-col">
           <h3 className="text-base font-semibold mb-4">Trade History</h3>
           <div className="flex-1 relative">
            <ScrollArea className="h-[280px] rounded-lg border">
                <Table>
                <TableHeader className="sticky top-0 bg-muted/50 backdrop-blur-sm">
                    <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Instrument</TableHead>
                    <TableHead className="text-right">Qty</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Time</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tradeHistory.map(trade => <TableRow key={trade.id}>
                        <TableCell>
                        <Badge variant="outline" className={cn(trade.type === "BUY" ? "text-green-600 border-green-500/50 bg-green-500/10" : "text-red-600 border-red-500/50 bg-red-500/10")}>
                            {trade.type}
                        </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{trade.instrument}</TableCell>
                        <TableCell className="text-right">{trade.quantity}</TableCell>
                        <TableCell className="text-right font-mono" style={{
                    fontFamily: "'JetBrains Mono', monospace"
                  }}>{formatCurrency(trade.price)}</TableCell>
                        <TableCell className="text-right text-muted-foreground">{trade.time}</TableCell>
                    </TableRow>)}
                </TableBody>
                </Table>
            </ScrollArea>
           </div>
        </div>
      </CardContent>
    </Card>;
}