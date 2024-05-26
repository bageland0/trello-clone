import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CommentUpdateDto {
  @ApiProperty()
  @IsString()
  text: string;
}
