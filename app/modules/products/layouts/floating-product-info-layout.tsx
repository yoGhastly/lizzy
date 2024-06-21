"use client";
import { cn } from "@/app/utils/cn";
import { type PropsWithChildren, useEffect, useState } from "react";
import { useModalStore } from "../../modal/modal.store";

export const FloatingProductInfoLayout: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [hideInfo, setHideInfo] = useState(false);
  const { isModalOpen } = useModalStore((state) => state);

  useEffect(() => {
    setHideInfo(isModalOpen);

    return () => {
      setHideInfo(false);
    };
  }, [isModalOpen]);

  return (
    <div
      className={cn(
        "sticky bottom-16 mx-auto z-[1000] inset-x-0 max-w-4xl w-full h-10",
        { "opacity-0 transition-opacity ease-in-out duration-100": hideInfo },
      )}
    >
      {children}
    </div>
  );
};
