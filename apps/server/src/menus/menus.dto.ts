import { Transform, TransformFnParams } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

export class CreateMenuDto {
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  name: string;

  @IsString()
  @IsOptional()
  parentId?: string;
}

export class UpdateMenuDto {
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  name: string;
}
