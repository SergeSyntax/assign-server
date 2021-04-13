import { User } from '.prisma/client';
import { Controller, Get, Post, UseGuards, Req, Res } from '@nestjs/common';
import { Request as ExpressRequest, Response } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { Public } from './public.decorator';
import * as _ from 'lodash';

export interface Request extends ExpressRequest {
  user?: User;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  sendUserPublicInfo = (user: User) => _.pick(user, ['id', 'name', 'email']);

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const authToken = await this.authService.generateAuthToken(req.user);
    res.setHeader('Authorization', authToken);
    return this.sendUserPublicInfo(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    return this.sendUserPublicInfo(req.user);
  }
}
