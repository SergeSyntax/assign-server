import { IsBoolean, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  title: string;

  @IsNotEmpty()
  @IsBoolean()
  accessibility: boolean;
}
