"use client";

import { IconFilledFolder } from "@/components/icons/filled-folder";
import { IconOutlinedFolder } from "@/components/icons/outlined-folder";
import { cn } from "@/libs/classnames";
import { usePathname, useRouter } from "next/navigation";
import { useId } from "react";
import { MenuItem } from "../menu-item";

type Props = {
  label: string;
  subItems: MenuItem[];
};

export function Group({ label, subItems }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const componentId = useId();
  const isActiveGroup = subItems.some((item) => pathname.startsWith(item.url));

  return (
    <div
      className={cn(
        "flex flex-col rounded-2xl py-2",
        isActiveGroup ? "bg-blue-gray-800" : "",
      )}
    >
      <div className="flex h-12 cursor-pointer flex-row items-center gap-4 p-3">
        {isActiveGroup ? (
          <IconFilledFolder className="text-white" />
        ) : (
          <IconOutlinedFolder className="text-blue-gray-600" />
        )}
        <span
          className={cn(
            "text-sm font-bold",
            isActiveGroup ? "text-white" : "text-blue-gray-500",
          )}
        >
          {label}
        </span>
      </div>
      {subItems.map((item, index) => (
        <div
          className={cn(
            "flex h-12 cursor-pointer flex-row items-center gap-4 rounded-2xl p-3 text-blue-gray-500",
            pathname.startsWith(item.url)
              ? "bg-lime-green-400 text-blue-gray-900"
              : "",
          )}
          key={`${componentId}-${index}`}
          onClick={() => {
            router.push(item.url);
          }}
        >
          {item.icon}
          <span className="text-sm font-bold">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
