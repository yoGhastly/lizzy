"use client";
import React from "react";

const CartLayoutBody = ({ children }: { children: React.ReactNode }) => (
  <section className="h-full overflow-y-auto p-3">{children}</section>
);

export { CartLayoutBody };
