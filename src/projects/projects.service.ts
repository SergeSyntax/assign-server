import { Project } from '.prisma/client';
import { Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

interface ProjectSearchParams {
  skip?: number;
  take?: number;
  cursor?: Prisma.ProjectWhereUniqueInput;
  where?: Prisma.ProjectWhereInput;
  orderBy?: Prisma.ProjectOrderByInput;
}

interface ProjectUpdateParams {
  where: Prisma.ProjectWhereUniqueInput;
  data: Prisma.ProjectUpdateInput;
}

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(projectWhereUniqueInput: Prisma.ProjectWhereUniqueInput) {
    return this.prisma.project.findUnique({ where: projectWhereUniqueInput });
  }

  async findAll(params: ProjectSearchParams): Promise<Project[]> {
    return this.prisma.project.findMany(params);
  }

  async create(data: Prisma.ProjectCreateInput): Promise<Project> {
    return this.prisma.project.create({ data });
  }

  async update(params: ProjectUpdateParams): Promise<Project> {
    return this.prisma.project.update(params);
  }

  async remove(where: Prisma.ProjectWhereUniqueInput): Promise<Project> {
    return this.prisma.project.delete({ where });
  }
}
