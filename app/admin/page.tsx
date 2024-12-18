import { ClockIcon, GiftIcon, XCircleIcon } from "@heroicons/react/24/solid";
import AdminLayout from "./layout";
import { cn } from "../utils/cn";
import { ItemsContainer } from "../modules/admin/components/items-container";
import { DashboardItem } from "../modules/admin/components/dashboard-items";
import { CheckCircleIcon } from "@heroicons/react/16/solid";

export default function AdminPage() {
  const items = [
    {
      label: "Recientes",
      count: 0,
      icon: <ClockIcon className={cn("h-6 w-6 text-novi-950")} />,
    },
    {
      label: "En proceso",
      count: 0,
      icon: <GiftIcon className={cn("h-6 w-6 text-novi-950")} />,
    },
    {
      label: "Completadas",
      count: 0,
      icon: <CheckCircleIcon className={cn("h-6 w-6 text-novi-950")} />,
    },
    {
      label: "Canceladas",
      count: 0,
      icon: <XCircleIcon className={cn("h-6 w-6 text-novi-950")} />,
    },
  ];

  return (
    <AdminLayout>
      <div className="flex flex-col w-full mx-auto justify-center items-center mt-14 gap-12 px-3">
        <header className="rounded-lg bg-white border flex flex-col items-start p-5 gap-8 w-full">
          <h1 className="text-4xl text-center text-black font-bold">Ordenes</h1>
          <ItemsContainer>
            {items.map(({ label, count, icon }) => (
              <DashboardItem
                key={label}
                label={label}
                count={count}
                icon={icon}
              />
            ))}
          </ItemsContainer>
        </header>
      </div>
    </AdminLayout>
  );
}
