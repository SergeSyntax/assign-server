import { Section } from '.prisma/client';
import { Prisma } from '.prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

interface SectionSearchParams {
  skip?: number;
  take?: number;
  cursor?: Prisma.SectionWhereUniqueInput;
  where?: Prisma.SectionWhereInput;
  orderBy?: Prisma.SectionOrderByInput[];
}

interface SectionUpdateParams {
  where: Prisma.SectionWhereUniqueInput;
  data: Prisma.SectionUpdateInput;
}

@Injectable()
export class SectionsService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(SectionWhereUniqueInput: Prisma.SectionWhereUniqueInput) {
    const section = await this.prisma.section.findUnique({ where: SectionWhereUniqueInput });

    if (!section) throw new NotFoundException('the Section with the given ID was not found.');

    return section;
  }

  async findAll(params: SectionSearchParams): Promise<Section[]> {
    return this.prisma.section.findMany({ ...params });
  }

  async create(data: Prisma.SectionCreateInput): Promise<Section> {
    return this.prisma.section.create({ data });
  }

  async update(params: SectionUpdateParams): Promise<Section> {
    await this.findOne(params.where);

    return this.prisma.section.update(params);
  }

  async remove(where: Prisma.SectionWhereUniqueInput): Promise<void> {
    await this.findOne(where);

    await this.prisma.section.delete({ where });
  }
}
