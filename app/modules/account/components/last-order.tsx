"use client";

import { ArrowUpRightIcon } from "@heroicons/react/24/solid";
import { DecorativeTitle } from "../../common/components/decorative-title";
import { type LastOrder as LastOrderInterface } from "../../orders/domain/Order";

interface Props {
  order: LastOrderInterface | null;
}

export const LastOrder: React.FC<Props> = ({ order }) => {
  return (
    <section className="flex flex-col gap-10 w-full md:px-10">
      <DecorativeTitle decorative={false} className="capitalize">
        última compra
      </DecorativeTitle>

      <div className="flex relative justify-center items-center">
        <div className="relative flex -space-x-[20px] md:-space-x-[50px]">
          <div className="bg-white border rounded-xl drop-shadow-sm w-[120px] md:w-[200px] z-20 h-[130px] md:h-[200px] -rotate-[10deg]"></div>
          <div className="bg-white border rounded-xl drop-shadow-sm w-[120px] md:w-[200px] z-10 h-[130px] md:h-[200px]"></div>
          <div className="bg-white border rounded-xl drop-shadow-sm w-[120px] md:w-[200px] z-20 h-[130px] md:h-[200px] rotate-[10deg]"></div>
        </div>
        <button className="btn absolute z-30 btn-circle bg-white border border-novi-primary hover:bg-novi-500 group">
          <ArrowUpRightIcon className="h-4 text-novi-500 group-hover:text-white" />
        </button>

        <button className="btn btn-sm md:btn-md absolute top-0 right-0 z-30 btn-circle bg-muted-gray/60 hover:bg-muted-gray/60 pointer-events-none">
          <p className="text-white font-semibold">+3</p>
        </button>
      </div>
    </section>
  );
};
