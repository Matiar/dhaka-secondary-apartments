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
exports.InquiriesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let InquiriesService = class InquiriesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createVisitRequest(apartmentId, dto, userId) {
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
    async createContact(dto, userId) {
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
    async updateVisitStatus(id, status) {
        return this.prisma.visitRequest.update({ where: { id }, data: { status: status } });
    }
    async updateInquiryStatus(id, status) {
        return this.prisma.inquiry.update({ where: { id }, data: { status: status } });
    }
};
exports.InquiriesService = InquiriesService;
exports.InquiriesService = InquiriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InquiriesService);
//# sourceMappingURL=inquiries.service.js.map