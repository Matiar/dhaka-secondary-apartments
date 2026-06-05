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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const apartments_service_1 = require("./apartments.service");
const apartment_dto_1 = require("./dto/apartment.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const inquiries_service_1 = require("../inquiries/inquiries.service");
let ApartmentsController = class ApartmentsController {
    apartmentsService;
    inquiriesService;
    constructor(apartmentsService, inquiriesService) {
        this.apartmentsService = apartmentsService;
        this.inquiriesService = inquiriesService;
    }
    findAll(filters) {
        return this.apartmentsService.findAll(filters);
    }
    findFeatured() {
        return this.apartmentsService.findFeatured();
    }
    findRecent() {
        return this.apartmentsService.findRecent();
    }
    getLocations() {
        return this.apartmentsService.getLocations();
    }
    async findBySlug(slug) {
        const apartment = await this.apartmentsService.findBySlug(slug);
        const similar = await this.apartmentsService.findSimilar(apartment.id, apartment.locationId, apartment.bedrooms);
        return { ...apartment, similar };
    }
    createVisitRequest(id, dto, user) {
        return this.inquiriesService.createVisitRequest(id, dto, user?.id);
    }
    toggleSave(id, user) {
        return this.apartmentsService.toggleSave(user.id, id);
    }
    create(dto) {
        return this.apartmentsService.create(dto);
    }
    update(id, dto) {
        return this.apartmentsService.update(id, dto);
    }
    remove(id) {
        return this.apartmentsService.remove(id);
    }
};
exports.ApartmentsController = ApartmentsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [apartment_dto_1.ApartmentFilterDto]),
    __metadata("design:returntype", void 0)
], ApartmentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('featured'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ApartmentsController.prototype, "findFeatured", null);
__decorate([
    (0, common_1.Get)('recent'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ApartmentsController.prototype, "findRecent", null);
__decorate([
    (0, common_1.Get)('locations'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ApartmentsController.prototype, "getLocations", null);
__decorate([
    (0, common_1.Get)(':slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApartmentsController.prototype, "findBySlug", null);
__decorate([
    (0, common_1.Post)(':id/visit'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, apartment_dto_1.VisitRequestDto, Object]),
    __metadata("design:returntype", void 0)
], ApartmentsController.prototype, "createVisitRequest", null);
__decorate([
    (0, common_1.Post)(':id/save'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ApartmentsController.prototype, "toggleSave", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [apartment_dto_1.CreateApartmentDto]),
    __metadata("design:returntype", void 0)
], ApartmentsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, apartment_dto_1.UpdateApartmentDto]),
    __metadata("design:returntype", void 0)
], ApartmentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ApartmentsController.prototype, "remove", null);
exports.ApartmentsController = ApartmentsController = __decorate([
    (0, swagger_1.ApiTags)('apartments'),
    (0, common_1.Controller)('apartments'),
    __metadata("design:paramtypes", [apartments_service_1.ApartmentsService,
        inquiries_service_1.InquiriesService])
], ApartmentsController);
//# sourceMappingURL=apartments.controller.js.map