"use client";
import { cn } from "@/app/utils/cn";
import Image from "next/image";

interface Props {
  displayText?: string;
}

export const CartFallback: React.FC<Props> = ({ displayText }) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 m-auto w-full justify-center items-center",
        "h-[calc(80vh-4rem)]",
      )}
    >
      <div className="w-24 h-24 relative">
        <Image
          src="/assets/images/empty-state.svg"
          alt="Empty cart"
          className="object-cover w-full h-full"
          fill
        />
      </div>
      <p className="text-muted-gray text-center max-w-[200px]">
        {displayText
          ? displayText
          : "Parece que aún no has agregado nada a tu cesta."}
      </p>
    </div>
  );
};
