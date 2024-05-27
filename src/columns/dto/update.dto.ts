import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ColumnUpdateDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;
}
