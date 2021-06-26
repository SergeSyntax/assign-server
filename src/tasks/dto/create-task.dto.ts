import { IsDateString, IsNotEmpty, IsString, Length, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @IsOptional()
  @IsString()
  @Length(1, 255)
  title: string;

  @IsOptional()
  @IsDateString()
  dueDate: Date;

  @IsOptional()
  @IsString()
  description: string;
}
