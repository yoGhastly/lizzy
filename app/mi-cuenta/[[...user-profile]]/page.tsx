"use client";
import { productsMock } from "@/app/constants";
import { useModalStore } from "@/app/modules/modal/modal.store";
import { ProductCard } from "@/app/modules/products/components/card";
import { waitUntil } from "@/app/utils/waitUntil";
import { SignOutButton, UserProfile, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AccountPage() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();
  const { setModalContentType, toggleModal, isModalOpen } = useModalStore(
    (state) => state,
  );

  function handleOpenFavorites() {
    setModalContentType("favorites");
    toggleModal();
  }

  useEffect(() => {
    //NOTE: Set the modal content type to "cart" when the modal is closed
    if (!isModalOpen) {
      // HACK: This avoids the modal transitions to be completed before the modal is closed
      waitUntil(500).then(() => setModalContentType("cart"));
    }
  }, [isModalOpen]);

  if (!isSignedIn && isLoaded) {
    router.push("/sign-in");
  }

  return (
    <div className="flex w-full h-auto items-start mt-12 gap-5">
      <UserProfile />
      <aside className="flex-grow flex flex-col gap-5 justify-between">
        <div className="flex flex-col bg-white drop-shadow-sm border p-5 rounded-xl gap-2">
          <p className="font-semibold text-lg">Tus Favoritos</p>
          <div className="flex flex-col">
            <ProductCard product={productsMock[0]} />
            <button
              onClick={handleOpenFavorites}
              className="btn self-start p-0 btn-link no-underline text-novi-400"
            >
              Ver Todos
            </button>
          </div>
        </div>
        <SignOutButton redirectUrl="/">
          <button className="btn  hover:bg-[#fafafa]">Cerrar Sesión</button>
        </SignOutButton>
      </aside>
    </div>
  );
}
