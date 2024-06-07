import { cn } from "../../../utils/cn";
import { DecorativeTitle } from "../../common/components/decorative-title";
import { ProductCard } from "../components/card";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

type Description = { text: string; gradientText?: string };
interface Props {
  title: string;
  description: Description;
  products: any[];
}

export const ProductsSection: React.FC<Props> = ({
  title,
  description,
  products,
}) => {
  return (
    <section className="flex flex-col w-full gap-14">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <DecorativeTitle>{title}</DecorativeTitle>
          <Link
            href="#"
            className="flex text-xs md:text-sm items-center justify-center gap-2.5 md:gap-5"
          >
            Ver mas
            <ArrowRightIcon className="h-4 text-novi-950" />
          </Link>
        </div>
        <p className="text-base text-sm max-w-2xl inline-block">
          {description.text}
          {description.gradientText && (
            <span
              className={cn(
                "bg-gradient-to-r from-[#22190D] via-novi-primary to-[#524D44]",
                "text-transparent bg-clip-text ml-1",
              )}
            >
              {description.gradientText}
            </span>
          )}
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-2">
        {products.map((product, idx) => (
          <ProductCard key={idx} product={product} />
        ))}
      </div>
    </section>
  );
};
