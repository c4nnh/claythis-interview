import { IconLogo } from "@/components/icons/logo";
import { IconMenuRight } from "@/components/icons/menu-right";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuGroup, menuItems } from "../menu-item";
import { Group } from "../sidebar/group";

export function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger className="w-fit">
        <IconMenuRight className="sm:hidden" />
      </SheetTrigger>
      <SheetContent className="w-screen">
        <SheetHeader>
          <IconLogo className="text-blue-gray-900" />
        </SheetHeader>
        <div className="flex flex-col gap-2 pt-10">
          {Object.keys(menuItems).map((key) => {
            const group = menuItems[key as MenuGroup];

            return (
              <Group
                key={key}
                label={group.label}
                subItems={group.subItems}
                className="px-4"
              />
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}
