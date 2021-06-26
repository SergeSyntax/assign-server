import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { GetUser } from 'src/auth/get-user.decorator';
import { Public } from 'src/auth/public.decorator';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('projects/:projectId/sections/:sectionId/tasks/:taskId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(
    @Body() createCommentDto: CreateCommentDto,
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @GetUser() { id }: User,
  ) {
    return this.commentsService.create({
      ...createCommentDto,
      users: { connect: { id } },
      tasks: { connect: { id: taskId } },
    });
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.commentsService.findOne({ id });
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.commentsService.remove({ id });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateCommentDto) {
    return this.commentsService.update({ where: { id }, data });
  }

  @Get()
  findAll(
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @Query('take', ParseIntPipe) take?: number,
    @Query('skip', ParseIntPipe) skip?: number,
    @Query('searchColumn') searchColumn?: keyof Prisma.CommentWhereInput,
    @Query('searchString') searchString?: Prisma.CommentWhereInput,
    @Query('orderBy') orderBy?: Prisma.CommentOrderByInput[],
  ) {
    return this.commentsService.findAll({
      take,
      skip,
      orderBy,
      where: { [searchColumn]: searchString, taskId },
    });
  }
}
