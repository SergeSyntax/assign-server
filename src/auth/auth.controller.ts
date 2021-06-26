import { User } from '.prisma/client';
import { Controller, Get, Post, UseGuards, Res, Body } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Public } from './public.decorator';
import * as _ from 'lodash';
import { RegisterUserDTO } from './dto/register-user.dto';
import { UsersService } from 'src/users/users.service';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  sendUserPublicInfo = (user: User) => _.pick(user, ['id', 'name', 'email']);

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@GetUser() user: User, @Res({ passthrough: true }) res: Response) {
    res.setHeader('Authorization', await this.authService.generateAuthToken(user));
    return this.sendUserPublicInfo(user);
  }

  @Get('profile')
  getProfile(@GetUser() user: User) {
    return this.sendUserPublicInfo(user);
  }

  @Post('registration')
  @Public()
  async create(@Body() createUserDto: RegisterUserDTO, @Res({ passthrough: true }) res: Response) {
    const user = await this.usersService.create(createUserDto);

    res.setHeader('Authorization', await this.authService.generateAuthToken(user));

    return this.sendUserPublicInfo(user);
  }
}
