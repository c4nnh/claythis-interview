import { IconSubMenu1 } from "@/components/icons/sub-menu-1";
import { IconSubMenu2 } from "@/components/icons/sub-menu-2";
import { ReactNode } from "react";

export type MenuItem = {
  label: string;
  url: string;
  icon: ReactNode;
};

export type MenuGroup = "systems" | "usersAndGroup" | "competition";

export const menuItems: Record<
  MenuGroup,
  {
    label: string;
    subItems: MenuItem[];
  }
> = {
  systems: {
    label: "Systems",
    subItems: [
      {
        label: "System Code",
        icon: <IconSubMenu1 />,
        url: "#",
      },
      {
        label: "Properties",
        icon: <IconSubMenu2 />,
        url: "#",
      },
      {
        label: "Menus",
        icon: <IconSubMenu1 />,
        url: "/systems/menus",
      },
      {
        label: "API List",
        icon: <IconSubMenu2 />,
        url: "#",
      },
    ],
  },
  usersAndGroup: {
    label: "Users & Group",
    subItems: [],
  },
  competition: {
    label: "Competition",
    subItems: [],
  },
};
