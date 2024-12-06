"use client";
import { cn } from "@/app/utils/cn";

interface Props {
  label: string;
  count: number;
  icon?: JSX.Element;
}

export const DashboardItem: React.FC<Props> = ({ label, count, icon }) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-md max-w-xs border border-novi-950/30 w-full p-3 bg-white text-novi-950",
        "hover:bg-novi-50 transition-colors duration-200 cursor-pointer hover:border-novi-300",
      )}
    >
      {label}
      <div className="flex justify-between items-center">
        <span className="text-3xl font-semibold">{count}</span>
        {icon}
      </div>
    </div>
  );
};
