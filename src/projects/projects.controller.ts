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
import { Public } from 'src/auth/public.decorator';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() data: Project) {
    return this.projectsService.create(data);
  }

  @Get()
  findAll(
    @Query('take') take?: number,
    @Query('skip') skip?: number,
    @Query('searchString') searchString?: string,
  ) {
    return this.projectsService.findAll({ take, skip });
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: number) {
    return id;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Project) {
    return this.projectsService.update({ where: { id }, data });
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Project> {
    return this.projectsService.remove({ id });
  }
}
