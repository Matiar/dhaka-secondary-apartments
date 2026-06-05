import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats() {
    const [
      totalApartments,
      activeApartments,
      soldApartments,
      totalInquiries,
      totalVisits,
      totalValuations,
      newValuations,
      mostViewed,
    ] = await Promise.all([
      this.prisma.apartment.count(),
      this.prisma.apartment.count({ where: { status: 'ACTIVE' } }),
      this.prisma.apartment.count({ where: { status: 'SOLD' } }),
      this.prisma.inquiry.count(),
      this.prisma.visitRequest.count(),
      this.prisma.valuationRequest.count(),
      this.prisma.valuationRequest.count({ where: { status: 'NEW' } }),
      this.prisma.apartment.findMany({
        where: { status: 'ACTIVE' },
        orderBy: { viewCount: 'desc' },
        take: 5,
        select: { id: true, title: true, slug: true, viewCount: true, price: true },
      }),
    ]);

    const recentInquiries = await this.prisma.inquiry.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { apartment: { select: { title: true } } },
    });

    const viewsLast30Days = await this.prisma.apartmentAnalytics.groupBy({
      by: ['createdAt'],
      where: {
        event: 'view',
        createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
      },
      _count: true,
    });

    return {
      stats: {
        totalApartments,
        activeApartments,
        soldApartments,
        totalInquiries,
        totalVisits,
        totalValuations,
        newValuations,
      },
      mostViewed,
      recentInquiries,
      viewsLast30Days: viewsLast30Days.length,
    };
  }

  async getAllApartments(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.apartment.findMany({
        include: {
          images: { where: { isPrimary: true }, take: 1 },
          location: true,
        },
        orderBy: { updatedAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.apartment.count(),
    ]);
    return { data, meta: { total, page, limit } };
  }

  async getUsers(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.user.findMany({
        select: { id: true, email: true, name: true, phone: true, role: true, createdAt: true },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.user.count(),
    ]);
    return { data, meta: { total, page, limit } };
  }

  async getTestimonials() {
    return this.prisma.testimonial.findMany({ orderBy: { sortOrder: 'asc' } });
  }

  async getFaqs() {
    return this.prisma.faq.findMany({ where: { active: true }, orderBy: { sortOrder: 'asc' } });
  }

  async getPublicContent() {
    const [testimonials, faqs, locations] = await Promise.all([
      this.prisma.testimonial.findMany({ where: { active: true }, orderBy: { sortOrder: 'asc' } }),
      this.prisma.faq.findMany({ where: { active: true }, orderBy: { sortOrder: 'asc' } }),
      this.prisma.location.findMany({ where: { featured: true }, orderBy: { sortOrder: 'asc' } }),
    ]);
    return { testimonials, faqs, locations };
  }
}
