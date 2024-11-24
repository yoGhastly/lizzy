"use client";
import { cn } from "@/app/utils/cn";
import { useUser } from "@clerk/nextjs";
import { PencilSquareIcon } from "@heroicons/react/24/solid";

interface Props {
  address: string;
}

export const UserDetails: React.FC<Props> = ({ address }) => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn || address === "") {
    return <p>Cargando...</p>;
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
        <p className="text-black max-w-xs text-xs md:text-sm">{address}</p>
      </div>
    </section>
  );
};
