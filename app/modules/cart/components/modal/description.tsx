"use client";
import { PropsWithChildren } from "react";

export const ModalDescription: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="flex flex-col gap-4">{children}</div>;
};
