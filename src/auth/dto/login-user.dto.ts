import { PickType } from '@nestjs/mapped-types';
import { RegisterUserDTO } from './register-user.dto';

export class LoginUserDto extends PickType(RegisterUserDTO, ['email', 'password']) {}
