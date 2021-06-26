import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { User } from '.prisma/client';

export interface AuthRequest extends ExpressRequest {
  user?: User;
}

export const GetUser = createParamDecorator((_data, ctx: ExecutionContext): User => {
  const req: AuthRequest = ctx.switchToHttp().getRequest();
  return req.user;
});
