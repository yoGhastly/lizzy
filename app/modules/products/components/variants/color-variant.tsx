"use client";

export function ColorVariant({ colorVariant }: { colorVariant: string }) {
  const [color, stock] = colorVariant.split("-");
  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        className="w-8 h-8 rounded-sm"
        style={{ backgroundColor: color }}
      ></button>
      {/* <span className="text-xs">Stock: {stock}</span> */}
    </div>
  );
}
