"use client";
import { PropsWithChildren } from "react";

interface Props {
  placeholder?: string;
}

export const Avatar: React.FC<PropsWithChildren<Props>> = ({
  children,
  placeholder,
}) => {
  return (
    <div className="avatar">
      <div className="w-5 md:w-8 rounded-full relative ring ring-base-300 ring-offset-base-100 ring-offset-2">
        {children ?? (
          <span className="text-xs md:text-lg font-semibold flex justify-center items-center">
            {placeholder}
          </span>
        )}
      </div>
    </div>
  );
};
