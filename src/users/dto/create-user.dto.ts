import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 255)
  password: string;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  name: string;
}
