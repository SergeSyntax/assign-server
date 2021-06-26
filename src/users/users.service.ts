import { User } from '.prisma/client';
import { Prisma } from '.prisma/client';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

interface UserSearchParams {
  skip?: number;
  take?: number;
  cursor?: Prisma.UserWhereUniqueInput;
  where?: Prisma.UserWhereInput;
  orderBy?: Prisma.UserOrderByInput;
}

interface UserUpdateParams {
  where: Prisma.UserWhereUniqueInput;
  data: Prisma.UserUpdateInput;
}

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
    const user = this.prisma.user.findUnique({ where: userWhereUniqueInput });
    if (!user) throw new NotFoundException('the user with the given Id was not found');
    return user;
  }

  async findAll(params: UserSearchParams): Promise<User[]> {
    return this.prisma.user.findMany(params);
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await this.findOne({ email: data.email });

    if (user) throw new BadRequestException('the email address already in use');

    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);

    return this.prisma.user.create({ data });
  }

  async update(params: UserUpdateParams): Promise<User> {
    await this.findOne(params.where);
    return this.prisma.user.update(params);
  }

  async remove(where: Prisma.UserWhereUniqueInput): Promise<void> {
    await this.findOne(where);
    await this.prisma.user.delete({ where });
  }
}
