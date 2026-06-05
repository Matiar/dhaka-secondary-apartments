import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateValuationDto } from './dto/valuation.dto';

@Injectable()
export class ValuationsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateValuationDto) {
    return this.prisma.valuationRequest.create({ data: dto });
  }

  async findAll(page = 1, limit = 20, status?: string) {
    const skip = (page - 1) * limit;
    const where = status ? { status: status as never } : {};

    const [data, total] = await Promise.all([
      this.prisma.valuationRequest.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.valuationRequest.count({ where }),
    ]);

    return { data, meta: { total, page, limit } };
  }

  async findOne(id: string) {
    return this.prisma.valuationRequest.findUnique({ where: { id } });
  }

  async updateStatus(id: string, status: string, adminNotes?: string) {
    return this.prisma.valuationRequest.update({
      where: { id },
      data: { status: status as never, adminNotes },
    });
  }
}
