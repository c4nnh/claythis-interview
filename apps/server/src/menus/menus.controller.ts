import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateMenuDto } from "./menus.dto";
import { GetListMenuQuery } from "./menus.query";
import {
  CreateMenuResponse,
  DeleteMenuResponse,
  GetListMenuResponse,
  GetMenuDetailsResponse,
  UpdateMenuResponse,
} from "./menus.response";
import { MenusService } from "./menus.service";

@Controller("menus")
@ApiTags("Menu")
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @ApiResponse({
    type: GetListMenuResponse,
    status: 200,
  })
  @Get()
  getMenus(@Query() queries: GetListMenuQuery) {
    return this.menusService.getMenus(queries);
  }

  @ApiResponse({
    type: GetMenuDetailsResponse,
    status: 200,
  })
  @Get(":id")
  getMenuDetails(@Param("id") id: string) {
    return this.menusService.getMenuDetails(id);
  }

  @ApiResponse({
    type: CreateMenuResponse,
    status: 201,
  })
  @Post()
  createMenu(@Body() dto: CreateMenuDto) {
    return this.menusService.createMenu(dto);
  }

  @ApiResponse({
    type: UpdateMenuResponse,
    status: 200,
  })
  @Put(":id")
  updateMenu(@Param("id") id: string, @Body() dto: CreateMenuDto) {
    return this.menusService.updateMenu(id, dto);
  }

  @ApiResponse({
    type: DeleteMenuResponse,
    status: 200,
  })
  @Delete(":id")
  deleteMenu(@Param("id") id: string) {
    return this.menusService.deleteMenu(id);
  }
}
