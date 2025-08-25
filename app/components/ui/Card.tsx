
"use client";

import { type ReactNode } from "react";
import { cn } from "../../lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className, hover = false, onClick }: CardProps) {
  const baseClasses = hover ? "card-hover" : "card";
  
  return (
    <div 
      className={cn(baseClasses, className)}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
