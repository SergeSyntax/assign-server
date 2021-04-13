import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';

interface JwtToken {
  sub: string;
  aud: string;
  iat: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService, configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('secret'),
    });
  }

  async validate({ sub: id, iat: authDate }: JwtToken) {
    const user = await this.usersService.findOne({ id });

    // check if the token was generated after the last time the user details was updated
    if (authDate <= user.updatedAt.getTime() - 1000)
      throw new UnauthorizedException('invalid credentials');

    return user;
  }
}
