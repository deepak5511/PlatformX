"use client";

import * as React from "react";
import { motion } from "framer-motion";
import MetricCardsRow, { MetricCardsRowProps } from "./MetricsCardRow";
import ChartCard, { ChartCardProps } from "./ChartCard";
import ProgressIndicators, { ProgressIndicatorsProps } from "./ProgressIndicators";
import StatusBadgesShowcaseSection, { StatusBadgesShowcaseSectionProps } from "./StatusBadgesShowcaseSections";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Search } from "lucide-react";

// Mock Data
const metricCardsData: MetricCardsRowProps["metrics"] = [{
  value: "12,450",
  label: "Total Revenue",
  trend: "up",
  status: "success"
}, {
  value: "89.2%",
  label: "Conversion Rate",
  trend: "down",
  status: "warning"
}, {
  value: "3,289",
  label: "New Customers",
  trend: "up",
  status: "success"
}, {
  value: "4.1%",
  label: "Churn Rate",
  trend: "up",
  status: "danger"
}];
const chartCardData: ChartCardProps["data"] = [{
  name: "Jan",
  uv: 4000,
  pv: 2400
}, {
  name: "Feb",
  uv: 3000,
  pv: 1398
}, {
  name: "Mar",
  uv: 2000,
  pv: 9800
}, {
  name: "Apr",
  uv: 2780,
  pv: 3908
}, {
  name: "May",
  uv: 1890,
  pv: 4800
}, {
  name: "Jun",
  uv: 2390,
  pv: 3800
}, {
  name: "Jul",
  uv: 3490,
  pv: 4300
}];
const progressIndicatorsData: ProgressIndicatorsProps["indicators"] = [{
  label: "Q3 Sales Target",
  value: 78,
  color: "success"
}, {
  label: "Server Capacity",
  value: 52,
  color: "warning"
}];
const statusBadgesData: StatusBadgesShowcaseSectionProps["badges"] = [{
  label: "Success",
  status: "success"
}, {
  label: "Danger",
  status: "danger"
}, {
  label: "Warning",
  status: "warning"
}, {
  label: "Neutral",
  status: "neutral"
}];
const tableData = [{
  id: "INV001",
  paymentStatus: "Paid",
  totalAmount: "$250.00",
  paymentMethod: "Credit Card"
}, {
  id: "INV002",
  paymentStatus: "Pending",
  totalAmount: "$150.00",
  paymentMethod: "PayPal"
}, {
  id: "INV003",
  paymentStatus: "Unpaid",
  totalAmount: "$350.00",
  paymentMethod: "Bank Transfer"
}, {
  id: "INV004",
  paymentStatus: "Paid",
  totalAmount: "$450.00",
  paymentMethod: "Credit Card"
}, {
  id: "INV005",
  paymentStatus: "Paid",
  totalAmount: "$550.00",
  paymentMethod: "PayPal"
}];
export default function AnalyticsDashboard() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const filteredData = tableData.filter(item => item.id.toLowerCase().includes(searchTerm.toLowerCase()) || item.paymentStatus.toLowerCase().includes(searchTerm.toLowerCase()));
  return <div className="bg-muted/40 min-h-screen w-full font-sans">
      <main className="container mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        <motion.div initial={{
        opacity: 0,
        y: -20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5
      }}>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-8">
            Analytics Dashboard
          </h1>
        </motion.div>

        <div className="space-y-8">
          <MetricCardsRow metrics={metricCardsData} />
          <ChartCard title="Monthly Performance" data={chartCardData} />
          <ProgressIndicators indicators={progressIndicatorsData} />
          
          <Card className="rounded-xl shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Invoices</CardTitle>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Filter invoices..." className="pl-10 w-full md:w-64 rounded-md" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                </div>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead>
                                <Button variant="ghost" className="p-0 hover:bg-transparent">
                                    Invoice <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button variant="ghost" className="p-0 hover:bg-transparent">
                                    Status <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button variant="ghost" className="p-0 hover:bg-transparent">
                                    Method <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead className="text-right">
                                <Button variant="ghost" className="p-0 hover:bg-transparent">
                                    Amount <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {filteredData.map(invoice => <TableRow key={invoice.id} className="font-mono">
                                <TableCell className="font-medium text-foreground">{invoice.id}</TableCell>
                                <TableCell>{invoice.paymentStatus}</TableCell>
                                <TableCell>{invoice.paymentMethod}</TableCell>
                                <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                            </TableRow>)}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
          </Card>

          <StatusBadgesShowcaseSection badges={statusBadgesData} />
        </div>
      </main>
    </div>;
}

