import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Prisma } from '@prisma/client';
import { Public } from 'src/auth/public.decorator';

@Controller('projects/:projectId/sections/:sectionId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(
    @Body() createTaskDto: CreateTaskDto,
    @Param('sectionId', ParseUUIDPipe) sectionId: string,
  ) {
    return this.tasksService.create({
      ...createTaskDto,
      sections: { connect: { id: sectionId } },
    });
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.tasksService.findOne({ id });
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.tasksService.remove({ id });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateTaskDto) {
    return this.tasksService.update({ where: { id }, data });
  }

  @Get()
  findAll(
    @Param('sectionId', ParseUUIDPipe) sectionId: string,
    @Query('take', ParseIntPipe) take?: number,
    @Query('skip', ParseIntPipe) skip?: number,
    @Query('searchColumn') searchColumn?: keyof Prisma.TaskWhereInput,
    @Query('searchString') searchString?: Prisma.TaskWhereInput,
    @Query('orderBy') orderBy?: Prisma.TaskOrderByInput[],
  ) {
    return this.tasksService.findAll({
      take,
      skip,
      orderBy,
      where: { [searchColumn]: searchString, sectionId },
    });
  }
}
