"use client";

import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { Fragment, useState } from "react";
import { Modal } from "./modal";

export const OpenCart = () => {
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);
  const onOpen = () => setOpen(true);

  return (
    <Fragment>
      <button className="flex items-center" onClick={onOpen}>
        <ShoppingCartIcon className="h-6 text-muted-gray" />
      </button>
      <Modal open={open} onClose={onClose} />
    </Fragment>
  );
};
