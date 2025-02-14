import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { PaginationQuery } from "~/common/queries/pagination.query";

export enum ListMenuType {
  ROOT = "ROOT",
  ALL = "ALL",
}

export class GetListMenuQuery extends PaginationQuery {
  @ApiProperty({
    enum: ListMenuType,
  })
  @IsEnum(ListMenuType)
  type: ListMenuType;
}
