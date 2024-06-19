"use client";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import React from "react";

const CartLayoutBody = ({ children }: { children: React.ReactNode }) => (
  <ScrollShadow
    orientation="vertical"
    hideScrollBar
    className="h-full overflow-y-auto"
  >
    {children}
  </ScrollShadow>
);

export { CartLayoutBody };
