"use client";
import type { ReactNode } from "react";

interface Props {
  label: string;
  children: ReactNode | JSX.Element | JSX.Element[];
}

export const LinkSection: React.FC<Props> = ({ label, children }) => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <strong className="text-xs md:text-lg">{label}</strong>
      <section className="flex flex-col gap-1">{children}</section>
    </div>
  );
};
