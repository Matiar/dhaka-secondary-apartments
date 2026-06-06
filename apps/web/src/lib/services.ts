import { Prisma } from '@prisma/client';
import { db } from '@/lib/db';

export interface ApartmentFilters {
  area?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  minSize?: number;
  maxSize?: number;
  parking?: boolean;
  furnished?: boolean;
  lift?: boolean;
  featured?: boolean;
  page?: number;
  limit?: number;
}

function slugify(title: string) {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .substring(0, 80) +
    '-' +
    Date.now().toString(36)
  );
}

export async function findAllApartments(filters: ApartmentFilters) {
  const {
    page = 1,
    limit = 12,
    area,
    minPrice,
    maxPrice,
    bedrooms,
    minSize,
    maxSize,
    parking,
    furnished,
    lift,
    featured,
  } = filters;
  const skip = (page - 1) * limit;

  const where: Prisma.ApartmentWhereInput = { status: 'ACTIVE' };

  if (area) where.location = { slug: area };
  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price.gte = minPrice;
    if (maxPrice) where.price.lte = maxPrice;
  }
  if (bedrooms) where.bedrooms = bedrooms;
  if (minSize || maxSize) {
    where.sizeSqft = {};
    if (minSize) where.sizeSqft.gte = minSize;
    if (maxSize) where.sizeSqft.lte = maxSize;
  }
  if (parking !== undefined) where.parking = parking;
  if (furnished !== undefined) where.furnished = furnished;
  if (lift !== undefined) where.lift = lift;
  if (featured !== undefined) where.featured = featured;

  const [apartments, total] = await Promise.all([
    db.apartment.findMany({
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
    db.apartment.count({ where }),
  ]);

  return {
    data: apartments,
    meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
  };
}

export async function findFeaturedApartments(limit = 6) {
  return db.apartment.findMany({
    where: { status: 'ACTIVE', featured: true },
    include: {
      images: { orderBy: { sortOrder: 'asc' }, take: 1 },
      location: true,
    },
    take: limit,
    orderBy: { publishedAt: 'desc' },
  });
}

export async function findRecentApartments(limit = 4) {
  return db.apartment.findMany({
    where: { status: 'ACTIVE' },
    include: {
      images: { orderBy: { sortOrder: 'asc' }, take: 1 },
      location: true,
    },
    take: limit,
    orderBy: { publishedAt: 'desc' },
  });
}

export async function findApartmentBySlug(slug: string) {
  const apartment = await db.apartment.findUnique({
    where: { slug },
    include: {
      images: { orderBy: { sortOrder: 'asc' } },
      location: true,
      features: true,
    },
  });

  if (!apartment || apartment.status === 'ARCHIVED') return null;

  await db.apartment.update({
    where: { id: apartment.id },
    data: { viewCount: { increment: 1 } },
  });

  await db.apartmentAnalytics.create({
    data: { apartmentId: apartment.id, event: 'view' },
  });

  const similar = await db.apartment.findMany({
    where: {
      status: 'ACTIVE',
      id: { not: apartment.id },
      OR: [{ locationId: apartment.locationId }, { bedrooms: apartment.bedrooms }],
    },
    include: {
      images: { where: { isPrimary: true }, take: 1 },
      location: true,
    },
    take: 3,
  });

  return { ...apartment, similar };
}

export async function getLocations() {
  return db.location.findMany({ orderBy: { sortOrder: 'asc' } });
}

export async function toggleSaveApartment(userId: string, apartmentId: string) {
  const existing = await db.savedApartment.findUnique({
    where: { userId_apartmentId: { userId, apartmentId } },
  });

  if (existing) {
    await db.savedApartment.delete({ where: { id: existing.id } });
    return { saved: false };
  }

  await db.savedApartment.create({ data: { userId, apartmentId } });
  return { saved: true };
}

export async function createApartment(data: Record<string, unknown>) {
  const { features, imageUrls, nearbyLandmarks, locationId, title, ...rest } = data as {
    features?: string[];
    imageUrls?: string[];
    nearbyLandmarks?: unknown;
    locationId: string;
    title: string;
    [key: string]: unknown;
  };

  const location = await db.location.findUnique({ where: { id: locationId } });

  return db.apartment.create({
    data: {
      ...rest,
      title,
      locationId,
      slug: slugify(title),
      area: location?.name || '',
      status: 'DRAFT',
      nearbyLandmarks: nearbyLandmarks as Prisma.InputJsonValue | undefined,
      features: features?.length
        ? { create: features.map((name) => ({ name })) }
        : undefined,
      images: imageUrls?.length
        ? { create: imageUrls.map((url, i) => ({ url, sortOrder: i, isPrimary: i === 0 })) }
        : undefined,
    } as unknown as Prisma.ApartmentCreateInput,
    include: { images: true, features: true, location: true },
  });
}

export async function updateApartment(id: string, data: Record<string, unknown>) {
  const { features, nearbyLandmarks, status, ...rest } = data as {
    features?: string[];
    nearbyLandmarks?: unknown;
    status?: string;
    [key: string]: unknown;
  };

  if (features) {
    await db.apartmentFeature.deleteMany({ where: { apartmentId: id } });
    await db.apartmentFeature.createMany({
      data: features.map((name) => ({ apartmentId: id, name })),
    });
  }

  return db.apartment.update({
    where: { id },
    data: {
      ...rest,
      nearbyLandmarks: nearbyLandmarks as Prisma.InputJsonValue | undefined,
      status: status as 'DRAFT' | 'ACTIVE' | 'SOLD' | 'ARCHIVED' | undefined,
      publishedAt: status === 'ACTIVE' ? new Date() : undefined,
      soldAt: status === 'SOLD' ? new Date() : undefined,
    },
    include: { images: true, features: true, location: true },
  });
}

export async function archiveApartment(id: string) {
  return db.apartment.update({ where: { id }, data: { status: 'ARCHIVED' } });
}

export async function createVisitRequest(
  apartmentId: string,
  data: { name: string; phone: string; email?: string; message?: string; preferredDate?: string },
  userId?: string
) {
  return db.visitRequest.create({
    data: {
      apartmentId,
      userId,
      name: data.name,
      phone: data.phone,
      email: data.email,
      message: data.message,
      preferredDate: data.preferredDate ? new Date(data.preferredDate) : undefined,
    },
  });
}

export async function createContactInquiry(data: {
  name: string;
  phone: string;
  email?: string;
  message?: string;
  apartmentId?: string;
}) {
  return db.inquiry.create({
    data: { ...data, type: 'CONTACT' },
  });
}

export async function createValuation(data: Record<string, unknown>) {
  return db.valuationRequest.create({ data: data as Prisma.ValuationRequestCreateInput });
}

export async function getDashboardStats() {
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
    db.apartment.count(),
    db.apartment.count({ where: { status: 'ACTIVE' } }),
    db.apartment.count({ where: { status: 'SOLD' } }),
    db.inquiry.count(),
    db.visitRequest.count(),
    db.valuationRequest.count(),
    db.valuationRequest.count({ where: { status: 'NEW' } }),
    db.apartment.findMany({
      where: { status: 'ACTIVE' },
      orderBy: { viewCount: 'desc' },
      take: 5,
      select: { id: true, title: true, slug: true, viewCount: true, price: true },
    }),
  ]);

  const recentInquiries = await db.inquiry.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { apartment: { select: { title: true } } },
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
  };
}

export async function getPublicContent() {
  const [testimonials, faqs, locations] = await Promise.all([
    db.testimonial.findMany({ where: { active: true }, orderBy: { sortOrder: 'asc' } }),
    db.faq.findMany({ where: { active: true }, orderBy: { sortOrder: 'asc' } }),
    db.location.findMany({ where: { featured: true }, orderBy: { sortOrder: 'asc' } }),
  ]);
  return { testimonials, faqs, locations };
}

export async function registerUser(data: {
  email: string;
  name: string;
  password: string;
  phone?: string;
}) {
  const bcrypt = await import('bcryptjs');
  const existing = await db.user.findUnique({ where: { email: data.email } });
  if (existing) throw new Error('Email already registered');

  const passwordHash = await bcrypt.hash(data.password, 10);
  return db.user.create({
    data: {
      email: data.email,
      name: data.name,
      phone: data.phone,
      passwordHash,
      role: 'BUYER',
    },
    select: { id: true, email: true, name: true, phone: true, role: true },
  });
}

export async function loginUser(email: string, password: string) {
  const bcrypt = await import('bcryptjs');
  const user = await db.user.findUnique({ where: { email } });
  if (!user?.passwordHash) throw new Error('Invalid credentials');

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw new Error('Invalid credentials');

  const { passwordHash, otpCode, ...safeUser } = user;
  return safeUser;
}

export async function getUserProfile(userId: string) {
  return db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      phone: true,
      role: true,
      createdAt: true,
      savedApartments: {
        include: {
          apartment: {
            include: { images: { where: { isPrimary: true }, take: 1 }, location: true },
          },
        },
      },
    },
  });
}
