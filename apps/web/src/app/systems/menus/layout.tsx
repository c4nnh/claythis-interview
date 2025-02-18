"use client";

import { useOnMount } from "@/hooks/use-onmount";
import { cn } from "@/libs/classnames";
import { menuActions } from "@/stores/slices/menu";
import { useDispatch } from "react-redux";
import { CreateRootMenu } from "./components/create-root-menu";
import { MenuTree } from "./components/menu-tree";
import { RootMenuSelector } from "./components/root-menu-selector";

export default function ListMenuLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useDispatch();

  useOnMount(() => {
    dispatch(menuActions.getRootMenus());
  });

  return (
    <div className={cn("flex flex-col pt-3", "sm:px-12")}>
      <label className="text-sm text-blue-gray-600">Menu</label>
      <div className="mt-2" />
      <div className="flex flex-row items-center gap-2">
        <RootMenuSelector />
        <CreateRootMenu />
      </div>
      <div className="mt-7" />
      <div className={cn("flex justify-between gap-6", "flex-col lg:flex-row")}>
        <div className={cn("flex-1", "w-full sm:w-auto")}>
          <MenuTree />
        </div>
        <div className={cn("flex-1 pb-6", "w-full lg:w-auto")}>{children}</div>
      </div>
    </div>
  );
}
