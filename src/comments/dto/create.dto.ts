import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDefined, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CommentCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  text: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  cardId: number;
}
