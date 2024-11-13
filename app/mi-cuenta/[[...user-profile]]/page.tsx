"use client";
import { Button } from "@/app/modules/common/components/button";
import { useModalStore } from "@/app/modules/modal/modal.store";
import { waitUntil } from "@/app/utils/waitUntil";
import { SignOutButton, UserProfile, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AccountPage() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();
  const { setModalContentType, isModalOpen } = useModalStore((state) => state);

  useEffect(() => {
    //NOTE: Set the modal content type to "cart" when the modal is closed
    if (!isModalOpen) {
      // HACK: This avoids the modal transitions to be completed before the modal is closed
      waitUntil(500).then(() => setModalContentType("cart"));
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (!isSignedIn && isLoaded) {
      router.push("/sign-in");
    }
  }, [isSignedIn, isLoaded, router]);

  if (!isSignedIn || !isLoaded) {
    return null;
  }

  return (
    <div className="flex flex-col md:flex-row w-full h-auto justify-center items-center md:items-start mt-12 gap-5 p-5 md:p-0">
      <UserProfile />
      <aside className="flex-grow flex flex-col gap-5 justify-between w-full">
        <SignOutButton redirectUrl="/">
          <button className="btn bg-black text-white hover:bg-black/80 hover:text-white">
            Cerrar Sesión
          </button>
        </SignOutButton>
        <Link
          href={`/catalogo/productos?category=${encodeURIComponent("Ver Todo")}`}
        >
          <Button className="w-full">Ver Catálogo</Button>
        </Link>
      </aside>
    </div>
  );
}
