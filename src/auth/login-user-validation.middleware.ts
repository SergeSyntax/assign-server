import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { LoginUserDto } from './dto/login-user.dto';

/**
 * solution to validate object before auth for security reasons,
 * nest js guard invoke before pipes, and guard can't be async which
 * slow down performance, so we have this.
 */
@Injectable()
export class LoginUserValidationMiddleware implements NestMiddleware {
  async use({ body }: Request, _res: any, next: () => void) {
    const object = plainToClass(LoginUserDto, body);
    const errors = await validate(object);

    if (errors.length > 0) {
      const errorMessages = Object.values(errors[0].constraints);
      throw new BadRequestException(errorMessages[errorMessages.length - 1]);
    }

    next();
  }
}
