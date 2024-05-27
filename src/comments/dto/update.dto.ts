import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class CommentUpdateDto {
  @ApiProperty()
  @IsString()
  text: string;

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  cardId: number;
}
