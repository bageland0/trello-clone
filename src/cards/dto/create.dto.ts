import { Type } from "class-transformer";
import { IsDefined, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateDto {
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  columnId: number;
}
