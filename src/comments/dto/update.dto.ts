import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CommentUpdateDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  text: string;

  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  cardId: number;
}
