"use client";

import { ArrowUpRightIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { AccountLayout } from "../modules/auth/account/account-layout";
import { DecorativeTitle } from "../modules/common/components/decorative-title";
import { cn } from "../utils/cn";
import { SignOutButton, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const router = useRouter();
  const { isSignedIn } = useAuth();

  if (!isSignedIn) router.push("/sign-in", { scroll: false });

  return (
    <AccountLayout>
      <header className="bg-[#fafafa] rounded-xl flex flex-col md:flex-row justify-center items-center w-full mx-auto px-3 h-[400px] gap-8 md:gap-0">
        <section className="flex flex-col gap-6 w-full max-w-xl md:px-10">
          <h2 className="text-muted-gray font-semibold md:text-xl">
            Bienvenido, <span className="text-black">Alan Turing</span>
          </h2>
          <div className="flex gap-3 items-center">
            <p className="text-black max-w-xs text-xs md:text-sm">
              Calle 123, culpa sint labore ut ipsum San Nicolás de Los Garza,
              Nuevo León
            </p>
            <button className="btn btn-sm btn-circle bg-[#C5C5C5]">
              <PencilSquareIcon className="h-4 text-[#fafafa]" />
            </button>
          </div>
          <SignOutButton redirectUrl="/">
            <button className="btn btn-sm btn-link text-muted-gray w-fit p-0">
              Cerrar Sesión
            </button>
          </SignOutButton>
        </section>

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
      </header>

      <div className="w-full max-w-5xl h-full flex flex-col md:flex-row gap-12">
        <section className="flex flex-col gap-8 w-full">
          <DecorativeTitle decorative={false} className="capitalize">
            Tus Compras
          </DecorativeTitle>

          <div className="flex flex-col">
            {[0, 1, 2].map((_, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex justify-between items-center w-full border border-muted-gray/20 p-7 py-5",
                  {
                    "rounded-none": idx === 1,
                    "rounded-t-xl": idx === 0,
                    "rounded-b-xl": idx === 2,
                  },
                )}
              >
                <div className="flex gap-3">
                  <div className="w-[70px] h-[60px] bg-white border rounded-lg"></div>
                  <div className="flex flex-col gap-2">
                    <p className="text-black font-semibold">Producto</p>
                    <p className="text-muted-gray text-xs md:text-sm">
                      Cantidad: 1
                    </p>
                  </div>
                </div>
                <p>Total: $100.00</p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-8 w-full">
          <DecorativeTitle decorative={false} className="capitalize">
            Estatus de Compra
          </DecorativeTitle>
        </section>
      </div>
    </AccountLayout>
  );
}
