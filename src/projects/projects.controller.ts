import { Project } from '.prisma/client';
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
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { GetUser } from 'src/auth/get-user.decorator';
import { Public } from 'src/auth/public.decorator';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto, @GetUser() { id }: User) {
    return this.projectsService.create({
      ...createProjectDto,
      users: { connect: { id } },
    });
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectsService.findOne({ id });
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.projectsService.remove({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Project) {
    return this.projectsService.update({ where: { id }, data });
  }

  @Get()
  findAll(
    @Query('take') take?: number,
    @Query('skip') skip?: number,
    @Query('searchColumn') searchColumn?: keyof Prisma.ProjectWhereInput,
    @Query('searchString') searchString?: Prisma.ProjectWhereInput,
    @Query('orderBy') orderBy?: Prisma.ProjectOrderByInput[],
  ) {
    return this.projectsService.findAll({
      take,
      skip,
      orderBy,
      where: { [searchColumn]: searchString },
    });
  }
}
