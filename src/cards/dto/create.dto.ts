import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDefined, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CardCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  name: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  columnId: number;
}
