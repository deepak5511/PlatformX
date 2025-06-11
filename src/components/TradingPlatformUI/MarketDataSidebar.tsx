"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { motion } from "framer-motion";
interface ChartDataPoint {
  time: string;
  value: number;
}
interface Trade {
  id: string;
  price: number;
  size: number;
  time: string;
  change: "up" | "down" | "neutral";
}
interface NewsItem {
  id: string;
  headline: string;
}
export interface MarketDataSidebarProps {
  chartData: ChartDataPoint[];
  recentTrades: Trade[];
  news: NewsItem[];
}
const chartConfig = {
  value: {
    label: "Price",
    color: "hsl(var(--primary))"
  }
} satisfies ChartConfig;
export default function MarketDataSidebar({
  chartData,
  recentTrades,
  news
}: MarketDataSidebarProps) {
  const getPriceColor = (change: "up" | "down" | "neutral") => {
    switch (change) {
      case "up":
        return "text-green-500";
      case "down":
        return "text-red-500";
      default:
        return "text-muted-foreground";
    }
  };
  return <aside aria-label="Market Data" className="flex flex-col h-full bg-card text-card-foreground">
      <div className="p-4 border-b border-border">
        <h2 className="text-xl font-bold">Market Data</h2>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* Price Chart */}
          <section aria-labelledby="price-chart-heading">
            <h3 id="price-chart-heading" className="text-lg font-semibold mb-2">
              Price Chart
            </h3>
            <Card className="rounded-lg shadow-sm border-border">
              <CardContent className="p-2">
                <ChartContainer config={chartConfig} className="w-full h-[200px]">
                  <LineChart data={chartData} margin={{
                  top: 5,
                  right: 10,
                  left: -20,
                  bottom: 0
                }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} tick={{
                    fill: "hsl(var(--muted-foreground))",
                    fontSize: 12
                  }} />
                    <YAxis tickLine={false} axisLine={false} tickMargin={8} tick={{
                    fill: "hsl(var(--muted-foreground))",
                    fontSize: 12
                  }} domain={['dataMin - 5', 'dataMax + 5']} />
                    <Tooltip cursor={{
                    stroke: "hsl(var(--primary))",
                    strokeWidth: 1,
                    strokeDasharray: "3 3"
                  }} content={<ChartTooltipContent />} />
                    <Line dataKey="value" type="monotone" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </section>

          {/* Recent Trades */}
          <section aria-labelledby="recent-trades-heading">
            <h3 id="recent-trades-heading" className="text-lg font-semibold mb-2">
              Recent Trades
            </h3>
            <Card className="rounded-lg shadow-sm border-border">
              <ScrollArea className="h-[250px]">
                <div className="p-2">
                  {recentTrades.map(trade => <div key={trade.id} className="grid grid-cols-3 gap-2 items-center p-2 rounded-md hover:bg-muted/50 text-sm">
                      <p className={cn("font-mono font-medium", getPriceColor(trade.change))} style={{
                    fontFamily: "'JetBrains Mono', monospace"
                  }}>
                        {trade.price.toFixed(2)}
                      </p>
                      <p className="text-right">{trade.size}</p>
                      <p className="text-right text-muted-foreground">
                        {trade.time}
                      </p>
                    </div>)}
                </div>
              </ScrollArea>
            </Card>
          </section>
        </div>
      </ScrollArea>

      {/* News Ticker */}
      <section aria-label="Market News" className="border-t border-border bg-muted/30">
        <div className="relative h-12 flex items-center overflow-hidden">
          <motion.ul className="flex items-center absolute left-0" animate={{
          x: ["0%", "-100%"],
          transition: {
            ease: "linear",
            duration: 40,
            repeat: Infinity
          }
        }}>
            {/* Duplicate news for seamless loop */}
            {[...news, ...news].map((item, index) => <li key={`${item.id}-${index}`} className="px-6 text-sm whitespace-nowrap text-muted-foreground">
                {item.headline}
              </li>)}
          </motion.ul>
        </div>
      </section>
    </aside>;
}