import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateSectionDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  title: string;
}
