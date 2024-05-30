import { InstrumentSerif } from "../../../config/fonts";
import { cn } from "../../../utils/cn";

export const DecorativeTitle = ({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) => {
  return (
    <h1
      className={cn(
        className,
        "text-2xl md:text-4xl text-novi-950 flex gap-2 items-center",
        InstrumentSerif.className,
      )}
    >
      <span className="w-[0.10rem] h-5 md:h-8 bg-novi-400" />
      {children}
    </h1>
  );
};
