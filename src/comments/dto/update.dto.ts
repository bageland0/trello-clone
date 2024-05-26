import { IsString } from "class-validator";

export class UpdateDto {
  @IsString()
  text: string;
}
