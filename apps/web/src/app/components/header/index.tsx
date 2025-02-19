"use client";

import { IconFilledFolder } from "@/components/icons/filled-folder";
import { cn } from "@/libs/classnames";
import { usePathname } from "next/navigation";
import { menuItems } from "../menu-item";
import { MobileMenu } from "./mobile-menu";

export function Header() {
  const pathname = usePathname();
  const activeMenuItem = [
    ...menuItems.systems.subItems,
    ...menuItems.usersAndGroup.subItems,
    ...menuItems.competition.subItems,
  ].find((subItem) => pathname.startsWith(subItem.url));

  if (!activeMenuItem) {
    return <></>;
  }

  return (
    <>
      <MobileMenu />
      <div
        className={cn(
          "flex flex-row items-center gap-2",
          "py-2 sm:px-12 sm:py-[30px]",
        )}
      >
        <IconFilledFolder className="text-blue-gray-300" />
        <span className="text-blue-gray-300">/</span>
        <span className="text-sm font-medium text-blue-gray-900">
          {activeMenuItem.label}
        </span>
      </div>
      <div
        className={cn(
          "flex-row items-center gap-4 px-12 py-4",
          "hidden sm:flex",
        )}
      >
        <div className="flex h-13 w-[52px] items-center justify-center rounded-full bg-arctic-blue-600 text-white">
          {activeMenuItem.icon}
        </div>
        <span className="text-[32px] font-extrabold text-blue-gray-900">
          {activeMenuItem.label}
        </span>
      </div>
    </>
  );
}
