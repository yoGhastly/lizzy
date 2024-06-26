import { DMSans } from "../../../config/fonts";
import { cn } from "../../../utils/cn";

export const DecorativeTitle = ({
  children,
  decorative = true,
  className = "text-novi-950",
}: Readonly<{
  children: React.ReactNode;
  decorative?: boolean;
  className?: string;
}>) => {
  return (
    <h1
      className={cn(
        className,
        "text-xl md:text-3xl flex gap-2 items-center font-semibold",
        DMSans.className,
      )}
    >
      <span
        className={cn("w-[0.15rem] h-5 md:h-8 bg-novi-400", {
          hidden: !decorative,
        })}
      />
      {children}
    </h1>
  );
};
