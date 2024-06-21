"use client";
import { SignOutButton, useAuth } from "@clerk/nextjs";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import Link from "next/link";

export interface DropDownItem {
  name: string;
  link?: string;
  icon?: JSX.Element;
  onClick?: () => void;
}

interface Props {
  triggerElement: JSX.Element;
}

function AccountItems() {
  return [
    { name: "Mi cuenta", link: "/mi-cuenta" },
    { name: "Mis pedidos", link: "/mis-pedidos" },
  ];
}

function InitialItems() {
  return [
    { name: "Iniciar sesión", link: "/sign-in" },
    { name: "Registrarse", link: "/sign-up" },
  ];
}

export const AccountDropDownMenu: React.FC<Props> = ({ triggerElement }) => {
  const { isSignedIn } = useAuth();
  console.log(isSignedIn);
  const accountItems = AccountItems();
  const initialItems = InitialItems();

  return (
    <Menu>
      <MenuButton>{triggerElement}</MenuButton>
      <Transition
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="duration-300 ease-out"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <MenuItems
          anchor="bottom end"
          className="z-[10000] bg-background w-[300px] mt-2 rounded-md drop-shadow-lg"
        >
          {isSignedIn
            ? accountItems.map(({ name, link }) => (
                <MenuItem key={name}>
                  <Link
                    className="flex text-muted-gray z-[100000] items-center data-[focus]:bg-[#fafafa] data-[focus]:transition-colors data-[focus]:duration-200 px-5 border-b py-3"
                    href={link ? link : "#"}
                  >
                    {name}
                  </Link>
                </MenuItem>
              ))
            : initialItems.map(({ name, link }) => (
                <MenuItem key={name}>
                  <Link
                    className="flex text-muted-gray z-[100000] items-center data-[focus]:bg-[#fafafa] data-[focus]:transition-colors data-[focus]:duration-200 px-5 border-b py-3"
                    href={link ? link : "#"}
                  >
                    {name}
                  </Link>
                </MenuItem>
              ))}
        </MenuItems>
      </Transition>
    </Menu>
  );
};
