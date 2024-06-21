"use client";
import { cn } from "@/app/utils/cn";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { PencilSquareIcon } from "@heroicons/react/24/solid";

export const UserDetails = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <section className="flex flex-col gap-6 w-full max-w-xl md:px-10">
      <h2 className="text-muted-gray font-semibold md:text-xl">
        <span className={cn({ hidden: !user.firstName })}>Bienvenido,</span>{" "}
        {user.firstName ? (
          <span className="text-black">{user.firstName}</span>
        ) : (
          <span className="text-black">
            {user.emailAddresses[0].emailAddress}
          </span>
        )}
      </h2>
      <div className="flex gap-3 items-center">
        <p className="text-black max-w-xs text-xs md:text-sm">
          Calle 123, culpa sint labore ut ipsum San Nicolás de Los Garza, Nuevo
          León
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
  );
};
