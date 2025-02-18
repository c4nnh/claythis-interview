import { CreateMenuDto, UpdateMenuDto } from "@/types/menu";
import { api } from ".";

export async function getRootMenusApi() {
  const urlSearchParams = new URLSearchParams({
    type: "ROOT",
  });
  return api.get(`/menus?${urlSearchParams.toString()}`);
}

export async function getMenuDetailsApi(id: string) {
  return api.get(`/menus/${id}`);
}

export async function createMenuApi(dto: CreateMenuDto) {
  return api.post("/menus", dto);
}

export async function updateMenuApi(id: string, dto: UpdateMenuDto) {
  return api.put(`/menus/${id}`, dto);
}
