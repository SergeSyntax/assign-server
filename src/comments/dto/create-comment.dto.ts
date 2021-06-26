import { IsDateString, IsNotEmpty, IsString, Length, IsOptional } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  message: string;
}
