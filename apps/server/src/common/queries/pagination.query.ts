import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class PaginationQuery {
  @ApiPropertyOptional({
    default: 10,
  })
  @IsOptional()
  take?: number = 10;

  @ApiPropertyOptional({
    default: 0,
  })
  @IsOptional()
  skip?: number = 0;
}
