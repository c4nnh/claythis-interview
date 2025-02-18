import { CreateMenuDto, Menu, UpdateMenuDto } from "@/types/menu";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

type MenuState = {
  rootMenus: Menu[];
  isFetchingList?: boolean;
  selectedMenu?: Menu;
  rootMenu?: Menu & { relatedMenus: Menu[] };
  isFetchingDetails?: boolean;
  isCreating?: boolean;
  isUpdating?: boolean;
  error?: string;
};

const initialState: MenuState = {
  rootMenus: [],
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    getRootMenus: (state) => {
      state.isFetchingList = true;
    },
    getRootMenusSuccess: (state, action: PayloadAction<{ menus: Menu[] }>) => {
      state.isFetchingList = false;
      state.rootMenus = action.payload.menus;
    },
    getRootMenusFailure: (
      state,
      action: PayloadAction<{ message: string }>,
    ) => {
      state.isFetchingList = false;
      state.error = action.payload.message;
    },
    getMenuDetails: (state, _: PayloadAction<{ id: string }>) => {
      state.isFetchingDetails = true;
    },
    getMenuDetailsSuccess: (
      state,
      action: PayloadAction<{ menu: Menu & { relatedMenus: Menu[] } }>,
    ) => {
      state.isFetchingDetails = false;
      state.selectedMenu = action.payload.menu;
      state.rootMenu = transformMenuDetails({
        ...(action.payload.menu.root || action.payload.menu),
        relatedMenus: action.payload.menu.relatedMenus,
      });
    },
    getMenuDetailsFailure: (
      state,
      action: PayloadAction<{ message: string }>,
    ) => {
      state.isFetchingDetails = false;
      state.error = action.payload.message;
    },
    createMenu: (
      state,
      _: PayloadAction<{ dto: CreateMenuDto; onSuccess: (id: string) => void }>,
    ) => {
      state.isCreating = true;
    },
    createMenuSuccess: (state, action: PayloadAction<{ menu: Menu }>) => {
      state.isCreating = false;
      const menu = action.payload.menu;
      const isRoot = !menu.parentId;

      if (isRoot) {
        state.rootMenus = [menu, ...state.rootMenus];
      }
    },
    createMenuFailure: (state, action: PayloadAction<{ message: string }>) => {
      state.isCreating = false;
      state.error = action.payload.message;
    },
    updateMenu: (
      state,
      _: PayloadAction<{ id: string; dto: UpdateMenuDto }>,
    ) => {
      state.isUpdating = true;
    },
    updateMenuSuccess: (state, action: PayloadAction<{ menu: Menu }>) => {
      state.isUpdating = false;
      const menu = action.payload.menu;
      const isRoot = !menu.parentId;

      state.selectedMenu = {
        ...state.selectedMenu,
        ...menu,
      };
      if (isRoot) {
        state.rootMenus = state.rootMenus.map((item) => {
          if (item.id === menu.id) {
            return menu;
          }

          return item;
        });
      }

      if (state.rootMenu) {
        state.rootMenu = transformMenuDetails({
          ...(isRoot ? menu : state.rootMenu),
          children: (state.rootMenu?.children || []).map((item) => {
            if (item.id === menu.id) {
              return menu;
            }

            return item;
          }),
          relatedMenus: (state.rootMenu?.relatedMenus || []).map((item) => {
            if (item.id === menu.id) {
              return menu;
            }

            return item;
          }),
        });
      }
    },
    updateMenuFailure: (state, action: PayloadAction<{ message: string }>) => {
      state.isUpdating = false;
      state.error = action.payload.message;
    },
    clearError: (state) => {
      state.error = undefined;
    },
  },
});

export const menuActions = menuSlice.actions;

export const menuReducer = menuSlice.reducer;

export const menuState = (root: RootState) => root.menu;

function transformMenuDetails({
  relatedMenus,
  ...menu
}: Menu & { relatedMenus: Menu[] }): Menu & { relatedMenus: Menu[] } {
  const currentDepth = menu.depth;
  const childMenus = relatedMenus.filter(
    (childMenu) =>
      childMenu.depth === currentDepth + 1 && childMenu.parentId === menu.id,
  );

  return {
    ...menu,
    relatedMenus,
    children: childMenus.map((childMenu) =>
      transformMenuDetails({
        ...childMenu,
        relatedMenus,
      }),
    ),
  };
}
