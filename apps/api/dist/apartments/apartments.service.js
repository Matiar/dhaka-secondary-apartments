"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ApartmentsService = class ApartmentsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    slugify(title) {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
            .substring(0, 80) + '-' + Date.now().toString(36);
    }
    async findAll(filters) {
        const { page = 1, limit = 12, area, minPrice, maxPrice, bedrooms, minSize, maxSize, parking, furnished, lift, featured } = filters;
        const skip = (page - 1) * limit;
        const where = { status: 'ACTIVE' };
        if (area)
            where.location = { slug: area };
        if (minPrice || maxPrice) {
            where.price = {};
            if (minPrice)
                where.price.gte = minPrice;
            if (maxPrice)
                where.price.lte = maxPrice;
        }
        if (bedrooms)
            where.bedrooms = bedrooms;
        if (minSize || maxSize) {
            where.sizeSqft = {};
            if (minSize)
                where.sizeSqft.gte = minSize;
            if (maxSize)
                where.sizeSqft.lte = maxSize;
        }
        if (parking !== undefined)
            where.parking = parking;
        if (furnished !== undefined)
            where.furnished = furnished;
        if (lift !== undefined)
            where.lift = lift;
        if (featured !== undefined)
            where.featured = featured;
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
    async findBySlug(slug) {
        const apartment = await this.prisma.apartment.findUnique({
            where: { slug },
            include: {
                images: { orderBy: { sortOrder: 'asc' } },
                location: true,
                features: true,
            },
        });
        if (!apartment || apartment.status === 'ARCHIVED') {
            throw new common_1.NotFoundException('Apartment not found');
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
    async findSimilar(apartmentId, locationId, bedrooms) {
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
    async create(dto) {
        const slug = this.slugify(dto.title);
        const { features, imageUrls, nearbyLandmarks, ...data } = dto;
        return this.prisma.apartment.create({
            data: {
                ...data,
                slug,
                area: (await this.prisma.location.findUnique({ where: { id: dto.locationId } }))?.name || '',
                status: 'DRAFT',
                nearbyLandmarks: nearbyLandmarks,
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
    async update(id, dto) {
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
                nearbyLandmarks: nearbyLandmarks,
                status: data.status,
                publishedAt: data.status === 'ACTIVE' ? new Date() : undefined,
                soldAt: data.status === 'SOLD' ? new Date() : undefined,
            },
            include: { images: true, features: true, location: true },
        });
    }
    async remove(id) {
        return this.prisma.apartment.update({
            where: { id },
            data: { status: 'ARCHIVED' },
        });
    }
    async getLocations() {
        return this.prisma.location.findMany({ orderBy: { sortOrder: 'asc' } });
    }
    async toggleSave(userId, apartmentId) {
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
};
exports.ApartmentsService = ApartmentsService;
exports.ApartmentsService = ApartmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ApartmentsService);
//# sourceMappingURL=apartments.service.js.map