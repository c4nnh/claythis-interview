"use client";

import { IconChevronDown } from "@/components/icons/chevron-down";
import { IconPlus } from "@/components/icons/plus";
import { Button } from "@/components/ui/button";
import { cn } from "@/libs/classnames";
import { menuState } from "@/stores/slices/menu";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";

type Menu = {
  id: string;
  name: string;
  depth: number;
  children: Menu[];
};

export function MenuTree() {
  const { rootMenu } = useSelector(menuState);
  const [expandMenuIds, setExpandMenuIds] = useState<string[]>([]);
  const expandableMenuIds = (rootMenu?.relatedMenus
    ?.filter((menu) => !!menu.parentId)
    ?.map((menu) => menu.parentId)
    ?.filter((e, i, self) => i === self.indexOf(e)) || []) as string[];

  const isExpandAll = expandMenuIds.length === expandableMenuIds.length;
  const isCollapseAll = !expandMenuIds.length;

  function expandAll() {
    if (!rootMenu) {
      return;
    }

    setExpandMenuIds(
      rootMenu.relatedMenus
        .filter((menu) => !!menu.parentId)
        .map((menu) => menu.parentId) as string[],
    );
  }

  function collapseAll() {
    setExpandMenuIds([]);
  }

  if (!rootMenu) {
    return <></>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-2">
        <Button
          label="Expand all"
          onClick={expandAll}
          variant="ghost"
          className={cn(
            "h-[38px] w-fit rounded-full border border-blue-gray-300 px-8 py-3 text-sm font-bold text-blue-gray-600",
            isExpandAll ? "bg-blue-gray-800 text-white" : "",
          )}
        />
        <Button
          label="Collapse all"
          variant="ghost"
          onClick={collapseAll}
          className={cn(
            "h-[38px] w-fit rounded-full border border-blue-gray-300 px-8 py-3 text-sm font-bold text-blue-gray-600",
            isCollapseAll ? "bg-blue-gray-800 text-white" : "",
          )}
        />
      </div>
      <div className="flex max-h-[720px] max-w-[520px] overflow-auto pr-4">
        <TreeItem
          {...rootMenu}
          expandMenuIds={expandMenuIds}
          setExpandMenuIds={setExpandMenuIds}
        />
      </div>
    </div>
  );
}

type TreeItemProps = Menu & {
  isChild?: boolean;
  expandMenuIds: string[];
  setExpandMenuIds: (ids: string[]) => void;
};

export function TreeItem({
  expandMenuIds,
  setExpandMenuIds,
  ...menu
}: TreeItemProps) {
  const router = useRouter();
  const hasChildren = menu.children.length > 0;
  const open = expandMenuIds.includes(menu.id);

  function goToDetails() {
    router.push(`/systems/menus/${menu.id}`);
  }

  function createSubMenu() {
    router.push(`/systems/menus/${menu.id}/new`);
  }

  function expand() {
    setExpandMenuIds([...expandMenuIds, menu.id]);
  }

  function collapse() {
    setExpandMenuIds(expandMenuIds.filter((id) => id !== menu.id));
  }

  function toggleOpen() {
    if (open) {
      collapse();
    } else {
      expand();
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center gap-2 py-3">
        <div
          className={cn(
            "h-full border-t border-blue-gray-400",
            !menu.isChild ? "hidden" : "",
            hasChildren ? "w-4" : "w-12",
          )}
        />
        <div className="group flex h-4 w-fit flex-row items-center">
          <Button
            variant="ghost"
            icon={
              <IconChevronDown
                className={cn(
                  "h-4 w-4 text-blue-gray-900 transition duration-300",
                  open ? "rotate-0" : "-rotate-90",
                )}
              />
            }
            size="icon"
            className={cn(!hasChildren ? "hidden" : "")}
            onClick={toggleOpen}
            title="Toggle expand menu"
          />
          <span
            className={cn("cursor-pointer pl-2 text-sm text-blue-gray-900")}
            onClick={goToDetails}
          >
            {menu.name}
          </span>
          <Button
            variant="ghost"
            icon={<IconPlus className="h-3 w-3 text-white" />}
            size="icon"
            className="ml-2 hidden h-[26px] w-[26px] items-center justify-center rounded-full bg-arctic-blue-600 group-hover:flex"
            onClick={createSubMenu}
            title="Create sub menu"
          />
        </div>
      </div>
      {menu.children.length && open ? (
        <div
          className={cn(
            "flex flex-col",
            menu.isChild ? "pl-[39px]" : "pl-[15px]",
          )}
        >
          <div className="flex flex-col border-l border-blue-gray-400">
            {menu.children.map((subMenu) => (
              <div key={subMenu.id} className="flex flex-row items-center">
                <TreeItem
                  {...subMenu}
                  isChild
                  expandMenuIds={expandMenuIds}
                  setExpandMenuIds={setExpandMenuIds}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
