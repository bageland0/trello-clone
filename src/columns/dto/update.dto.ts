import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ColumnUpdateDto {
  @ApiProperty()
  @IsString()
  name: string;
}
