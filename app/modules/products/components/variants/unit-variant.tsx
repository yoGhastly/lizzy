"use client";
import { cn } from "@/app/utils/cn";
import { useState } from "react";

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

  const onClick = () => {
    if (value === unitVariant.split("-")[0]) {
      setActive((prev) => !prev);
    }
  };

  return (
    <>
      <div className="form-control">
        <label className="label gap-2 cursor-pointer">
          <input
            type="radio"
            name="radio-10"
            className="radio checked:bg-novi-primary"
            checked
          />
          <span className="label-text text-black">
            {value} {unitName}
          </span>
        </label>
      </div>
    </>
  );
}
