"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
export interface ChartCardProps {
  title: string;
  data: {
    name: string;
    uv: number;
    pv: number;
  }[];
}
const CustomTooltip = ({
  active,
  payload,
  label
}: any) => {
  if (active && payload && payload.length) {
    return <div className="p-4 bg-background border border-border rounded-lg shadow-lg">
        <p className="label font-mono text-sm font-bold">{`${label}`}</p>
        <p className="intro text-primary" style={{
        color: "#3B82F6"
      }}>{`UV : ${payload[0].value}`}</p>
        <p className="intro text-secondary" style={{
        color: "#1E40AF"
      }}>{`PV : ${payload[1].value}`}</p>
      </div>;
  }
  return null;
};
export default function ChartCard({
  title,
  data
}: ChartCardProps) {
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.5
  }}>
      <Card className="w-full rounded-xl shadow-md">
        <CardHeader>
          <CardTitle className="font-sans text-xl font-semibold">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} fontFamily="var(--font-sans)" />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={value => `$${value}`} fontFamily="var(--font-sans)" />
                <Tooltip content={<CustomTooltip />} cursor={{
                stroke: "hsl(var(--primary))",
                strokeWidth: 1,
                strokeDasharray: "3 3"
              }} />
                <Legend wrapperStyle={{
                fontFamily: "var(--font-sans)",
                fontSize: "14px"
              }} />
                <Line type="monotone" dataKey="pv" stroke="#1E40AF" strokeWidth={2} activeDot={{
                r: 8,
                style: {
                  fill: "#1E40AF"
                }
              }} dot={{
                r: 4,
                style: {
                  fill: "#1E40AF",
                  strokeWidth: 2,
                  stroke: "var(--card)"
                }
              }} />
                <Line type="monotone" dataKey="uv" stroke="#3B82F6" strokeWidth={2} activeDot={{
                r: 8,
                style: {
                  fill: "#3B82F6"
                }
              }} dot={{
                r: 4,
                style: {
                  fill: "#3B82F6",
                  strokeWidth: 2,
                  stroke: "var(--card)"
                }
              }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>;
}