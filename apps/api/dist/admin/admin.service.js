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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AdminService = class AdminService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getDashboardStats() {
        const [totalApartments, activeApartments, soldApartments, totalInquiries, totalVisits, totalValuations, newValuations, mostViewed,] = await Promise.all([
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
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminService);
//# sourceMappingURL=admin.service.js.map