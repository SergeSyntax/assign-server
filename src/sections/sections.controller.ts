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
import { Prisma, Section } from '@prisma/client';
import { Public } from 'src/auth/public.decorator';
import { CreateSectionDto } from './dto/create-section.dto';
import { SectionsService } from './sections.service';

@Controller('projects/:projectId/sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Post()
  create(
    @Body() createSectionDto: CreateSectionDto,
    @Param('projectId', ParseUUIDPipe) projectId: string,
  ) {
    return this.sectionsService.create({
      ...createSectionDto,
      projects: { connect: { id: projectId } },
    });
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.sectionsService.findOne({ id });
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.sectionsService.remove({ id });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: Section) {
    return this.sectionsService.update({ where: { id }, data });
  }

  @Get()
  findAll(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Query('take', ParseIntPipe) take?: number,
    @Query('skip', ParseIntPipe) skip?: number,
    @Query('searchColumn') searchColumn?: keyof Prisma.SectionWhereInput,
    @Query('searchString') searchString?: Prisma.SectionWhereInput,
    @Query('orderBy') orderBy?: Prisma.SectionOrderByInput[],
  ) {
    return this.sectionsService.findAll({
      take,
      skip,
      orderBy,
      where: { [searchColumn]: searchString, projectId },
    });
  }
}
