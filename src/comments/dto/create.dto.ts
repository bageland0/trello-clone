import { Type } from "class-transformer";
import { IsDefined, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateDto {
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  text: string;

  @IsDefined()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  cardId: number;
}
