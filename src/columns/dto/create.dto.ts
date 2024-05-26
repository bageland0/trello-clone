import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class ColumnCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  name: string;
}
