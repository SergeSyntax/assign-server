import { Task } from '.prisma/client';
import { Prisma } from '.prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

interface TaskSearchParams {
  skip?: number;
  take?: number;
  cursor?: Prisma.TaskWhereUniqueInput;
  where?: Prisma.TaskWhereInput;
  orderBy?: Prisma.TaskOrderByInput[];
}

interface TaskUpdateParams {
  where: Prisma.TaskWhereUniqueInput;
  data: Prisma.TaskUpdateInput;
}

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(TaskWhereUniqueInput: Prisma.TaskWhereUniqueInput) {
    const task = await this.prisma.task.findUnique({ where: TaskWhereUniqueInput });
    if (!task) throw new NotFoundException('the Task with the given ID was not found.');
    return task;
  }

  async findAll(params: TaskSearchParams): Promise<Task[]> {
    return this.prisma.task.findMany({ ...params });
  }

  async create(data: Prisma.TaskCreateInput): Promise<Task> {
    return this.prisma.task.create({ data });
  }

  async update(params: TaskUpdateParams): Promise<Task> {
    await this.findOne(params.where);
    return this.prisma.task.update(params);
  }

  async remove(where: Prisma.TaskWhereUniqueInput): Promise<void> {
    await this.findOne(where);
    await this.prisma.task.delete({ where });
  }
}
