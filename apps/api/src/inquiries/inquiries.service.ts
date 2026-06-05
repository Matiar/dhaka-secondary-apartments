import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { VisitRequestDto, ContactInquiryDto } from '../apartments/dto/apartment.dto';
import { CreateValuationDto } from '../valuations/dto/valuation.dto';

@Injectable()
export class InquiriesService {
  constructor(private prisma: PrismaService) {}

  async createVisitRequest(apartmentId: string, dto: VisitRequestDto, userId?: string) {
    return this.prisma.visitRequest.create({
      data: {
        apartmentId,
        userId,
        name: dto.name,
        phone: dto.phone,
        email: dto.email,
        message: dto.message,
        preferredDate: dto.preferredDate ? new Date(dto.preferredDate) : undefined,
      },
    });
  }

  async createContact(dto: ContactInquiryDto, userId?: string) {
    return this.prisma.inquiry.create({
      data: {
        apartmentId: dto.apartmentId,
        userId,
        name: dto.name,
        phone: dto.phone,
        email: dto.email,
        message: dto.message,
        type: 'CONTACT',
      },
    });
  }

  async findAllVisitRequests(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.visitRequest.findMany({
        include: { apartment: { select: { title: true, slug: true } }, user: { select: { name: true, email: true } } },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.visitRequest.count(),
    ]);
    return { data, meta: { total, page, limit } };
  }

  async findAllInquiries(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.inquiry.findMany({
        include: { apartment: { select: { title: true, slug: true } } },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.inquiry.count(),
    ]);
    return { data, meta: { total, page, limit } };
  }

  async updateVisitStatus(id: string, status: string) {
    return this.prisma.visitRequest.update({ where: { id }, data: { status: status as never } });
  }

  async updateInquiryStatus(id: string, status: string) {
    return this.prisma.inquiry.update({ where: { id }, data: { status: status as never } });
  }
}
