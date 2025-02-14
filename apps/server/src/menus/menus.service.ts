import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { Prisma } from "@prisma/client";
import { Request } from "express";
import { ErrorCode } from "~/common/types/error.type";
import { PrismaService } from "~/database/prisma.service";
import { CreateMenuDto, UpdateMenuDto } from "./menus.dto";
import { GetListMenuQuery, ListMenuType } from "./menus.query";
import { DeleteMenuResponse } from "./menus.response";

@Injectable()
export class MenusService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly prismaService: PrismaService,
  ) {}

  async getMenus(queries: GetListMenuQuery) {
    this.request.context.logger.info("Get menus", { queries });

    const conditions: Prisma.MenuWhereInput = {};

    if (queries.type === ListMenuType.ROOT) {
      conditions.parentId = null;
    }

    const [menus, total] = await Promise.all([
      this.prismaService.menu.findMany({
        where: conditions,
        take: queries.take,
        skip: queries.skip,
        orderBy: {
          createdAt: "desc",
          name: "asc",
        },
      }),
      this.prismaService.menu.count({
        where: conditions,
      }),
    ]);

    return {
      pagination: {
        total,
        totalPage: Math.ceil(total / queries.take),
        skip: queries.skip,
        take: queries.take,
      },
      menus,
    };
  }

  async getMenuDetails(id: string) {
    this.request.context.logger.info("Get menu details", { menuId: id });

    const menus = await this.prismaService.menu.findMany({
      where: {
        OR: [
          {
            id,
          },
          {
            rootId: id,
          },
        ],
      },
    });

    const root = menus.find((menu) => menu.id === id);

    if (!root) {
      this.request.context.logger.error("Menu not found");
      throw new NotFoundException(ErrorCode.MENU_NOT_FOUND);
    }

    const relatedMenus = menus.filter((menu) => menu.id !== id);

    return {
      ...root,
      relatedMenus,
    };
  }

  async createMenu(dto: CreateMenuDto) {
    this.request.context.logger.info("Create menu", { dto });

    const createMenuData: Prisma.MenuCreateInput = {
      name: dto.name,
    };

    if (dto.parentId) {
      this.request.context.logger.info("Assert parent menu");
      const parentMenu = await this.assertMenu(dto.parentId);

      createMenuData.parent = {
        connect: {
          id: parentMenu.id,
        },
      };

      const rootId = parentMenu.rootId || parentMenu.id;
      createMenuData.root = {
        connect: {
          id: rootId,
        },
      };
    }

    const menu = await this.prismaService.menu.create({
      data: createMenuData,
    });

    return menu;
  }

  async updateMenu(id: string, dto: UpdateMenuDto) {
    this.request.context.logger.info("Update menu", { menuId: id, dto });

    const menu = await this.assertMenu(id);

    if (menu.name === dto.name) {
      return menu;
    }

    const updatedMenu = await this.prismaService.menu.update({
      where: { id },
      data: {
        name: dto.name,
      },
    });

    return updatedMenu;
  }

  async deleteMenu(id: string): Promise<DeleteMenuResponse> {
    this.request.context.logger.info("Delete menu", { menuId: id });

    await this.assertMenu(id);

    await this.prismaService.menu.delete({ where: { id } });

    this.request.context.logger.info("Menu is deleted");

    return {
      success: true,
    };
  }

  private async assertMenu(id: string) {
    const menu = await this.prismaService.menu.findUnique({
      where: {
        id,
      },
    });

    if (!menu) {
      this.request.context.logger.error("Menu not found");
      throw new NotFoundException(ErrorCode.MENU_NOT_FOUND);
    }

    return menu;
  }
}
