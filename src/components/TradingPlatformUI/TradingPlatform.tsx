"use client";

import * as React from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

// These components will be created in subsequent steps.
// The imports are included here to illustrate the final structure.
import TopBanner from "./TopBanner";
import TradingPanel from "./TradingPanel";
import PortfolioSection from "./PortfolioSection";
import MarketDataSidebar from "./MarketDataSidebar";
export interface TradingPlatformProps {}
export default function TradingPlatform({}: TradingPlatformProps) {
  // In a real application, this data would come from an API.
  // We are using placeholder data to populate the child components.
  const topBannerData = {
    scenario: "Aggressive Growth Scenario: Tech Rally",
    marketPrice: 175.32,
    priceChange: 1.25,
    priceChangePercentage: 0.72,
    isPriceUp: true,
    timeRemaining: "15:30"
  };
  const portfolioData = {
    position: {
      instrument: "AAPL",
      quantity: 100,
      avgPrice: 170.15,
      currentValue: 17532.00
    },
    unrealizedPL: {
      amount: 517.00,
      percentage: 3.04,
      isPositive: true
    },
    tradeHistory: [{
      id: "T1",
      type: "BUY" as const,
      instrument: "AAPL",
      quantity: 50,
      price: 172.50,
      time: "10:45 AM"
    }, {
      id: "T2",
      type: "SELL" as const,
      instrument: "AAPL",
      quantity: 20,
      price: 174.00,
      time: "11:20 AM"
    }, {
      id: "T3",
      type: "BUY" as const,
      instrument: "AAPL",
      quantity: 70,
      price: 168.90,
      time: "01:15 PM"
    }, {
      id: "T4",
      type: "BUY" as const,
      instrument: "GOOG",
      quantity: 10,
      price: 2850.75,
      time: "02:05 PM"
    }, {
      id: "T5",
      type: "SELL" as const,
      instrument: "GOOG",
      quantity: 5,
      price: 2855.00,
      time: "02:10 PM"
    }]
  };
  const marketData = {
    chartData: [{
      time: "10:00",
      value: 170.12
    }, {
      time: "11:00",
      value: 172.45
    }, {
      time: "12:00",
      value: 171.98
    }, {
      time: "13:00",
      value: 173.50
    }, {
      time: "14:00",
      value: 174.88
    }, {
      time: "15:00",
      value: 175.32
    }],
    recentTrades: [{
      id: "RT1",
      price: 175.32,
      size: 1000,
      time: "15:00:01",
      change: "up" as const
    }, {
      id: "RT2",
      price: 175.31,
      size: 500,
      time: "15:00:00",
      change: "down" as const
    }, {
      id: "RT3",
      price: 175.32,
      size: 200,
      time: "14:59:58",
      change: "up" as const
    }, {
      id: "RT4",
      price: 175.31,
      size: 1200,
      time: "14:59:57",
      change: "down" as const
    }, {
      id: "RT5",
      price: 175.30,
      size: 300,
      time: "14:59:55",
      change: "down" as const
    }],
    news: [{
      id: "N1",
      headline: "Tech stocks surge on positive inflation data, boosting market confidence."
    }, {
      id: "N2",
      headline: "Apple expected to unveil new M-series chips at upcoming event."
    }, {
      id: "N3",
      headline: "Federal Reserve signals steady interest rates for the next quarter."
    }]
  };
  return <div className="min-h-screen w-full bg-background font-sans text-foreground">
      <div className="flex flex-col lg:flex-row">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col lg:max-h-screen">
          {/* Mobile Header */}
          <header className="flex items-center justify-between p-4 border-b border-border bg-card lg:hidden">
            <h1 className="text-xl font-bold text-primary">TradeSim</h1>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open Sidebar</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[320px] p-0 bg-card">
                <MarketDataSidebar {...marketData} />
              </SheetContent>
            </Sheet>
          </header>
          
          {/* Top Banner - visible on all screen sizes */}
          <TopBanner {...topBannerData} />

          {/* Scrollable Main Content */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 items-start">
              <section className="xl:col-span-2" aria-labelledby="trading-panel-heading">
                <h2 id="trading-panel-heading" className="sr-only">Trading Panel</h2>
                <TradingPanel />
              </section>
              <section className="xl:col-span-3" aria-labelledby="portfolio-heading">
                <h2 id="portfolio-heading" className="sr-only">Portfolio</h2>
                <PortfolioSection {...portfolioData} />
              </section>
            </div>
          </main>
        </div>

        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex flex-col w-[320px] xl:w-[360px] lg:h-screen border-l border-border bg-card">
          <MarketDataSidebar {...marketData} />
        </aside>
      </div>
    </div>;
}

