"use client";
import { useState } from "react";
import { cn } from "@/app/utils/cn";

export function UnitVariant({
  unitVariant,
  unit,
}: {
  unitVariant: string;
  unit: "mililitros" | "miligramos" | "longitud";
}) {
  const [active, setActive] = useState(false);

  const [value, stock] = unitVariant.split("-");
  const unitName =
    unit === "mililitros" ? "ml" : unit === "miligramos" ? "mg" : "cm";

  const handleChange = () => setActive((prev) => !prev);

  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        name="unit-variant"
        className={cn(
          "w-5 h-5 border-2 rounded-sm transition-colors duration-200 focus:ring-2 focus:ring-offset-1",
          active
            ? "bg-novi-primary border-novi-primary"
            : "bg-white border-gray-300",
        )}
        checked={active}
        onChange={handleChange}
      />
      <label
        onClick={handleChange}
        className={cn(
          "text-sm font-medium cursor-pointer select-none transition-colors",
          active ? "text-novi-500" : "text-gray-700",
        )}
      >
        {value} {unitName}
      </label>
    </div>
  );
}
