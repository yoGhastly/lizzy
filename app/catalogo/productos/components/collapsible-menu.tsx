"use client";

import { cn } from "@/app/utils/cn";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  category: string;
}

export const CollapsibleMenu: React.FC<Props> = ({ category }) => {
  const [openTabs, setOpenTabs] = useState<{ [key: string]: boolean }>({});
  const params = useSearchParams();

  useEffect(() => {
    const paramCategory = params.get("category") || "";
    if (paramCategory === category) {
      setOpenTabs((prevOpenTabs) => ({ ...prevOpenTabs, [category]: true }));
    } else {
      setOpenTabs((prevOpenTabs) => ({ ...prevOpenTabs, [category]: false }));
    }
  }, [params, category]);

  return (
    <ul className="menu w-56">
      <li className={cn({ "font-semibold active": openTabs["all"] })}>
        <a>Ver Todo</a>
      </li>
      <li>
        <details open={openTabs["pestañas"] || false}>
          <summary
            className={cn({ "font-semibold active": openTabs["pestañas"] })}
          >
            Pestañas
          </summary>
          <ul>
            <li>
              <a>Submenu 1</a>
            </li>
            <li>
              <a>Submenu 2</a>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <details open={openTabs["uñas"] || false}>
          <summary className={cn({ "font-semibold active": openTabs["uñas"] })}>
            Uñas
          </summary>
          <ul>
            <li>
              <a>Submenu 1</a>
            </li>
            <li>
              <a>Submenu 2</a>
            </li>
          </ul>
        </details>
      </li>
    </ul>
  );
};
