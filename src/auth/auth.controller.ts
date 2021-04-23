import { User } from '.prisma/client';
import {
  Controller,
  Get,
  Post,
  UseGuards,
  Req,
  Res,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { Request as ExpressRequest, Response } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { Public } from './public.decorator';
import * as _ from 'lodash';
import { RegisterUserDTO } from './dto/register-user.dto';
import { UsersService } from 'src/users/users.service';

export interface Request extends ExpressRequest {
  user?: User;
}

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
  async login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    res.setHeader('Authorization', await this.authService.generateAuthToken(req.user));
    return this.sendUserPublicInfo(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    return this.sendUserPublicInfo(req.user);
  }

  @Post('registration')
  @Public()
  async create(@Body() createUserDto: RegisterUserDTO, @Res({ passthrough: true }) res: Response) {
    let user = await this.usersService.findOne({ email: createUserDto.email });

    if (user) throw new BadRequestException('the email address already in use');

    user = await this.usersService.create(createUserDto);

    res.setHeader('Authorization', await this.authService.generateAuthToken(user));

    return this.sendUserPublicInfo(user);
  }
}
