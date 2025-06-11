"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Zap, Settings, Clock, Users, DollarSign } from "lucide-react";
export type ScenarioType = "Market Crash" | "Bull Run" | "Volatility" | "Custom";
export type Difficulty = "Beginner" | "Intermediate" | "Advanced";
export interface ScenarioPreviewCardProps {
  title: string;
  description: string;
  scenarioType: ScenarioType;
  difficulty: Difficulty;
  minPrice: number;
  maxPrice: number;
  timeDuration: string;
  participantLimit: number;
}
const difficultyStyles: Record<Difficulty, string> = {
  "Beginner": "bg-blue-500 text-white",
  "Intermediate": "bg-amber-500 text-white",
  "Advanced": "bg-red-500 text-white"
};
const scenarioTypeIcons: Record<ScenarioType, React.ReactNode> = {
  "Market Crash": <TrendingDown className="h-4 w-4 mr-2" />,
  "Bull Run": <TrendingUp className="h-4 w-4 mr-2" />,
  "Volatility": <Zap className="h-4 w-4 mr-2" />,
  "Custom": <Settings className="h-4 w-4 mr-2" />
};
export default function ScenarioPreviewCard({
  title,
  description,
  scenarioType,
  difficulty,
  minPrice,
  maxPrice,
  timeDuration,
  participantLimit
}: ScenarioPreviewCardProps) {
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.5,
    ease: "easeOut"
  }} className="w-full">
      <Card className="w-full max-w-md rounded-2xl border-2 border-primary/20 shadow-lg bg-card font-sans overflow-hidden">
        <CardHeader className="p-6">
          <div className="flex justify-between items-start">
            <CardTitle className="text-2xl font-bold text-foreground pr-4">
              {title || "Untitled Scenario"}
            </CardTitle>
            <Badge className={cn("text-xs font-bold rounded-full px-3 py-1", difficultyStyles[difficulty])}>
              {difficulty}
            </Badge>
          </div>
          <div className="flex items-center text-sm text-muted-foreground pt-2">
            {scenarioTypeIcons[scenarioType]}
            <span>{scenarioType}</span>
          </div>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <p className="text-muted-foreground mb-6 text-base leading-relaxed max-w-[70ch]">
            {description || "No description provided."}
          </p>
          <Separator className="my-6 bg-border/50" />
          <h3 className="text-lg font-semibold text-foreground mb-4">Market Parameters</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 text-primary mr-3" />
              <div>
                <p className="text-muted-foreground">Price Range</p>
                <p className="font-mono font-medium text-foreground">
                  ${minPrice.toLocaleString()} - ${maxPrice.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-primary mr-3" />
              <div>
                <p className="text-muted-foreground">Duration</p>
                <p className="font-mono font-medium text-foreground">{timeDuration}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-primary mr-3" />
              <div>
                <p className="text-muted-foreground">Participants</p>
                <p className="font-mono font-medium text-foreground">{participantLimit}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>;
}