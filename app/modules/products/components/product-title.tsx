"use client";

export const ProductTitle = ({ productName }: { productName: string }) => {
  return (
    <div className="flex gap-3 items-center">
      <span className="text-xs md:text-lg capitalize">{productName}</span>
    </div>
  );
};
