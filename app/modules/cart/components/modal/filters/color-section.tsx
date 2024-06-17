"use client";

import { useState } from "react";
import { cn } from "@/app/utils/cn";

export const ColorSection = () => {
  const colors = ["#000000", "#FFFFFF", "#FF0000", "#00FF00", "#0000FF"];
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const handleClick = (color: string) => {
    setSelectedColor(color);
    console.log("Selected Color:", color);
  };

  const renderColorColumns = () => {
    const columns = [];
    const numberOfColumns = Math.ceil(colors.length / 3);

    for (let i = 0; i < numberOfColumns; i++) {
      const startIndex = i * 3;
      const columnColors = colors.slice(startIndex, startIndex + 3);

      const column = (
        <div key={i} className="flex flex-col gap-3">
          {columnColors.map((color) => (
            <div
              key={color}
              className={cn("flex items-center gap-3 cursor-pointer")}
              onClick={() => handleClick(color)}
            >
              <div
                className="w-6 h-6 rounded-md border border-gray-300"
                style={{ backgroundColor: color }}
              />
              <p
                className={cn("opacity-75", {
                  "opacity-100 font-medium":
                    selectedColor === color ? true : false,
                })}
              >
                {color}
              </p>
            </div>
          ))}
        </div>
      );

      columns.push(column);
    }

    return columns;
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <p>Color</p>
        <div className="badge badge-ghost badge-sm">
          <span className="font-semibold text-black">1</span>
        </div>
      </div>

      <div className="flex gap-8">
        {renderColorColumns().map((column, index) => (
          <div key={index}>{column}</div>
        ))}
      </div>
    </div>
  );
};
