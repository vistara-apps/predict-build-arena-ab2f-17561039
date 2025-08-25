
"use client";

import { type ChangeEvent } from "react";
import { cn } from "../../lib/utils";

interface InputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: "text" | "number" | "email";
  disabled?: boolean;
  className?: string;
}

export function Input({
  value,
  onChange,
  placeholder,
  type = "text",
  disabled = false,
  className,
}: InputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={cn("input-field", disabled && "opacity-50", className)}
    />
  );
}
