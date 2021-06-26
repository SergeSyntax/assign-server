import { Comment } from '.prisma/client';
import { Prisma } from '.prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

interface CommentSearchParams {
  skip?: number;
  take?: number;
  cursor?: Prisma.CommentWhereUniqueInput;
  where?: Prisma.CommentWhereInput;
  orderBy?: Prisma.CommentOrderByInput[];
}

interface CommentUpdateParams {
  where: Prisma.CommentWhereUniqueInput;
  data: Prisma.CommentUpdateInput;
}

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(CommentWhereUniqueInput: Prisma.CommentWhereUniqueInput) {
    const comment = await this.prisma.comment.findUnique({ where: CommentWhereUniqueInput });

    if (!comment) throw new NotFoundException('the Comment with the given ID was not found.');

    return comment;
  }

  async findAll(params: CommentSearchParams): Promise<Comment[]> {
    return this.prisma.comment.findMany({ ...params });
  }

  async create(data: Prisma.CommentCreateInput): Promise<Comment> {
    return this.prisma.comment.create({ data });
  }

  async update(params: CommentUpdateParams): Promise<Comment> {
    await this.findOne(params.where);

    return this.prisma.comment.update(params);
  }

  async remove(where: Prisma.CommentWhereUniqueInput): Promise<void> {
    await this.findOne(where);

    await this.prisma.comment.delete({ where });
  }
}
