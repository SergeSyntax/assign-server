import { Project } from '.prisma/client';
import { Prisma } from '.prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

interface ProjectSearchParams {
  skip?: number;
  take?: number;
  cursor?: Prisma.ProjectWhereUniqueInput;
  where?: Prisma.ProjectWhereInput;
  orderBy?: Prisma.ProjectOrderByInput[];
}

interface ProjectUpdateParams {
  where: Prisma.ProjectWhereUniqueInput;
  data: Prisma.ProjectUpdateInput;
}

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(projectWhereUniqueInput: Prisma.ProjectWhereUniqueInput) {
    const project = await this.prisma.project.findUnique({ where: projectWhereUniqueInput });

    if (!project) throw new NotFoundException('the project with the given ID was not found.');

    return project;
  }

  async findAll(params: ProjectSearchParams): Promise<Project[]> {
    return this.prisma.project.findMany({ ...params });
  }

  async create(data: Prisma.ProjectCreateInput): Promise<Project> {
    return this.prisma.project.create({ data });
  }

  async update(params: ProjectUpdateParams): Promise<Project> {
    await this.findOne(params.where);

    return this.prisma.project.update(params);
  }

  async remove(where: Prisma.ProjectWhereUniqueInput): Promise<void> {
    await this.findOne(where);

    await this.prisma.project.delete({ where });
  }
}
