"use client";
import type { ReactNode } from "react";

interface Props {
  label: string;
  children: ReactNode | JSX.Element | JSX.Element[];
}

export const LinkSection: React.FC<Props> = ({ label, children }) => {
  return (
    <div className="flex flex-col gap-5">
      <strong className="text-xs">{label}</strong>
      <section className="flex flex-col gap-1">{children}</section>
    </div>
  );
};
