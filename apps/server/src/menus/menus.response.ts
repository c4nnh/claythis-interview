import { Menu as PMenu } from "@prisma/client";
import { PaginationResponse } from "~/common/responses/pagination.response";

type MenuType = Omit<PMenu, "parentId" | "rootId"> & {
  parentId?: string;

  rootId?: string;
};

class Menu implements MenuType {
  id: string;

  name: string;

  depth: number;

  createdAt: Date;

  updatedAt: Date;

  creatorId: string;

  parentId?: string;

  rootId?: string;
}

export class GetListMenuResponse {
  pagination: PaginationResponse;

  menus: Menu[];
}

export class GetMenuDetailsResponse extends Menu {
  relatedMenus: Menu[];
}

export class CreateMenuResponse extends Menu {}

export class UpdateMenuResponse extends CreateMenuResponse {}

export class DeleteMenuResponse {
  success: boolean;
}
