import { IconLogo } from "@/components/icons/logo";
import { IconMenuLeft } from "@/components/icons/menu-left";
import { Button } from "@/components/ui/button";
import { cn } from "@/libs/classnames";
import { MenuGroup, menuItems } from "../menu-item";
import { Group } from "./group";

export function Sidebar() {
  return (
    <nav
      className={cn(
        "h-full w-60 flex-col rounded-3xl bg-blue-gray-900",
        "hidden sm:flex",
      )}
    >
      <div className="flex flex-row items-center justify-between px-8 py-[30px]">
        <IconLogo />
        <Button
          variant="ghost"
          size="icon"
          icon={<IconMenuLeft className="text-white" />}
          title="Open menu"
        />
      </div>
      <div className="flex flex-col gap-2 px-4 py-2.5">
        {Object.keys(menuItems).map((key) => {
          const group = menuItems[key as MenuGroup];

          return (
            <Group key={key} label={group.label} subItems={group.subItems} />
          );
        })}
      </div>
    </nav>
  );
}
