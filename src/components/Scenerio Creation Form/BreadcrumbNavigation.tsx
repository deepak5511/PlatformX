"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
export interface BreadcrumbCrumb {
  label: string;
  href?: string;
}
export interface BreadcrumbNavigationProps {
  crumbs: BreadcrumbCrumb[];
}
const linkTextVariants = {
  rest: {
    color: "hsl(var(--muted-foreground))"
  },
  hover: {
    color: "hsl(var(--foreground))"
  }
};
const underlineVariants = {
  rest: {
    scaleX: 0
  },
  hover: {
    scaleX: 1
  }
};
export default function BreadcrumbNavigation({
  crumbs
}: BreadcrumbNavigationProps) {
  return <nav aria-label="Breadcrumb" className="w-full">
      <ol className="flex items-center space-x-2 text-sm text-muted-foreground whitespace-nowrap overflow-x-auto py-2">
        {crumbs.map((crumb, index) => <React.Fragment key={index}>
            <li className="font-sans">
              {index < crumbs.length - 1 ? <motion.a href={crumb.href || "#"} className="relative block p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md" initial="rest" whileHover="hover" animate="rest">
                  <motion.span variants={linkTextVariants} transition={{
              duration: 0.2
            }}>
                    {crumb.label}
                  </motion.span>
                  <motion.div className="absolute bottom-0 left-0 h-[2px] bg-primary" style={{
              originX: 0
            }} variants={underlineVariants} transition={{
              duration: 0.3,
              ease: "easeOut"
            }} />
                </motion.a> : <span className="font-medium text-foreground p-1" aria-current="page">
                  {crumb.label}
                </span>}
            </li>
            {index < crumbs.length - 1 && <li aria-hidden="true">
                <ChevronRight className="h-4 w-4" />
              </li>}
          </React.Fragment>)}
      </ol>
    </nav>;
}