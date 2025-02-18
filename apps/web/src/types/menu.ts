export type Menu = {
  id: string;
  name: string;
  depth: number;
  parentId?: string;
  parent?: Menu;
  rootId?: string;
  root?: Menu;
  children: Menu[];
};

export type CreateMenuDto = {
  name: string;
  parentId?: string;
};

export type UpdateMenuDto = {
  name: string;
};
