import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// all fields optional
export class UpdateUserDto extends PickType(CreateUserDto, ['name']) {}
