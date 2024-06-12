"use client";

export const ProductTitle = ({ productName }: { productName: string }) => {
  return (
    <div className="flex gap-3 items-center">
      <span className="text-xs md:text-lg">{productName}</span>
      <div className="bg-red-200 w-1.5 h-1.5 rounded-full" />
    </div>
  );
};
