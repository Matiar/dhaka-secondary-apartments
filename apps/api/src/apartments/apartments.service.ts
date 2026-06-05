import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ApartmentFilterDto, CreateApartmentDto, UpdateApartmentDto } from './dto/apartment.dto';

@Injectable()
export class ApartmentsService {
  constructor(private prisma: PrismaService) {}

  private slugify(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .substring(0, 80) + '-' + Date.now().toString(36);
  }

  async findAll(filters: ApartmentFilterDto) {
    const { page = 1, limit = 12, area, minPrice, maxPrice, bedrooms, minSize, maxSize, parking, furnished, lift, featured } = filters;
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = { status: 'ACTIVE' };

    if (area) where.location = { slug: area };
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) (where.price as Record<string, number>).gte = minPrice;
      if (maxPrice) (where.price as Record<string, number>).lte = maxPrice;
    }
    if (bedrooms) where.bedrooms = bedrooms;
    if (minSize || maxSize) {
      where.sizeSqft = {};
      if (minSize) (where.sizeSqft as Record<string, number>).gte = minSize;
      if (maxSize) (where.sizeSqft as Record<string, number>).lte = maxSize;
    }
    if (parking !== undefined) where.parking = parking;
    if (furnished !== undefined) where.furnished = furnished;
    if (lift !== undefined) where.lift = lift;
    if (featured !== undefined) where.featured = featured;

    const [apartments, total] = await Promise.all([
      this.prisma.apartment.findMany({
        where,
        include: {
          images: { orderBy: { sortOrder: 'asc' } },
          location: true,
          features: true,
        },
        orderBy: [{ featured: 'desc' }, { publishedAt: 'desc' }],
        skip,
        take: limit,
      }),
      this.prisma.apartment.count({ where }),
    ]);

    return {
      data: apartments,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findFeatured(limit = 6) {
    return this.prisma.apartment.findMany({
      where: { status: 'ACTIVE', featured: true },
      include: {
        images: { orderBy: { sortOrder: 'asc' }, take: 1 },
        location: true,
      },
      take: limit,
      orderBy: { publishedAt: 'desc' },
    });
  }

  async findRecent(limit = 4) {
    return this.prisma.apartment.findMany({
      where: { status: 'ACTIVE' },
      include: {
        images: { orderBy: { sortOrder: 'asc' }, take: 1 },
        location: true,
      },
      take: limit,
      orderBy: { publishedAt: 'desc' },
    });
  }

  async findBySlug(slug: string) {
    const apartment = await this.prisma.apartment.findUnique({
      where: { slug },
      include: {
        images: { orderBy: { sortOrder: 'asc' } },
        location: true,
        features: true,
      },
    });

    if (!apartment || apartment.status === 'ARCHIVED') {
      throw new NotFoundException('Apartment not found');
    }

    await this.prisma.apartment.update({
      where: { id: apartment.id },
      data: { viewCount: { increment: 1 } },
    });

    await this.prisma.apartmentAnalytics.create({
      data: { apartmentId: apartment.id, event: 'view' },
    });

    return apartment;
  }

  async findSimilar(apartmentId: string, locationId: string, bedrooms: number) {
    return this.prisma.apartment.findMany({
      where: {
        status: 'ACTIVE',
        id: { not: apartmentId },
        OR: [{ locationId }, { bedrooms }],
      },
      include: {
        images: { where: { isPrimary: true }, take: 1 },
        location: true,
      },
      take: 3,
    });
  }

  async create(dto: CreateApartmentDto) {
    const slug = this.slugify(dto.title);
    const { features, imageUrls, nearbyLandmarks, ...data } = dto;

    return this.prisma.apartment.create({
      data: {
        ...data,
        slug,
        area: (await this.prisma.location.findUnique({ where: { id: dto.locationId } }))?.name || '',
        status: 'DRAFT',
        nearbyLandmarks: nearbyLandmarks as Prisma.InputJsonValue | undefined,
        features: features?.length
          ? { create: features.map((name) => ({ name })) }
          : undefined,
        images: imageUrls?.length
          ? { create: imageUrls.map((url, i) => ({ url, sortOrder: i, isPrimary: i === 0 })) }
          : undefined,
      },
      include: { images: true, features: true, location: true },
    });
  }

  async update(id: string, dto: UpdateApartmentDto) {
    const { features, imageUrls, nearbyLandmarks, ...data } = dto;

    if (features) {
      await this.prisma.apartmentFeature.deleteMany({ where: { apartmentId: id } });
      await this.prisma.apartmentFeature.createMany({
        data: features.map((name) => ({ apartmentId: id, name })),
      });
    }

    return this.prisma.apartment.update({
      where: { id },
      data: {
        ...data,
        nearbyLandmarks: nearbyLandmarks as Prisma.InputJsonValue | undefined,
        status: data.status as 'DRAFT' | 'ACTIVE' | 'SOLD' | 'ARCHIVED' | undefined,
        publishedAt: data.status === 'ACTIVE' ? new Date() : undefined,
        soldAt: data.status === 'SOLD' ? new Date() : undefined,
      },
      include: { images: true, features: true, location: true },
    });
  }

  async remove(id: string) {
    return this.prisma.apartment.update({
      where: { id },
      data: { status: 'ARCHIVED' },
    });
  }

  async getLocations() {
    return this.prisma.location.findMany({ orderBy: { sortOrder: 'asc' } });
  }

  async toggleSave(userId: string, apartmentId: string) {
    const existing = await this.prisma.savedApartment.findUnique({
      where: { userId_apartmentId: { userId, apartmentId } },
    });

    if (existing) {
      await this.prisma.savedApartment.delete({ where: { id: existing.id } });
      return { saved: false };
    }

    await this.prisma.savedApartment.create({ data: { userId, apartmentId } });
    return { saved: true };
  }
}
