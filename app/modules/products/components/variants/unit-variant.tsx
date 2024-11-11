"use client";
import { useState } from "react";
import { cn } from "@/app/utils/cn";

export function UnitVariant({
  unitVariant,
  unit,
  isActive,
  onSelect,
}: {
  unitVariant: string;
  unit: "mililitros" | "miligramos" | "longitud";
  isActive: boolean;
  onSelect: () => void;
}) {
  // Check if unitVariant has a "-" to split or if it's just a single value
  const parts = unitVariant.split("-");
  const value = parts[0]; // Always set the first part as value
  const stock = parts.length > 1 ? parts[1] : "N/A"; // Set stock to "N/A" if not available

  const unitName =
    unit === "mililitros" ? "ml" : unit === "miligramos" ? "mg" : "cm";

  return (
    <div className="flex items-center space-x-2">
      <input
        type="radio"
        name="unit-variant"
        className={cn(
          "w-5 h-5 rounded-lg border-2 transition-colors duration-200 focus:ring-2 focus:ring-offset-1",
          isActive
            ? "bg-novi-primary border-novi-primary"
            : "bg-white border-gray-300",
        )}
        checked={isActive}
        onChange={onSelect}
      />
      <label
        onClick={onSelect}
        className={cn(
          "text-sm font-medium cursor-pointer select-none transition-colors",
          isActive ? "text-novi-500" : "text-gray-700",
        )}
      >
        {value}
        {unitName} <span className="text-gray-400">Stock: {stock}</span>
      </label>
    </div>
  );
}
