"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const prisma_service_1 = require("../prisma/prisma.service");
let AuthService = class AuthService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async register(dto) {
        const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (existing)
            throw new common_1.ConflictException('Email already registered');
        const passwordHash = await bcrypt.hash(dto.password, 10);
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                name: dto.name,
                phone: dto.phone,
                passwordHash,
                role: 'BUYER',
            },
            select: { id: true, email: true, name: true, phone: true, role: true },
        });
        return { user, token: this.generateToken(user) };
    }
    async login(dto) {
        const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (!user || !user.passwordHash)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const valid = await bcrypt.compare(dto.password, user.passwordHash);
        if (!valid)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const { passwordHash, otpCode, ...safeUser } = user;
        return { user: safeUser, token: this.generateToken(safeUser) };
    }
    async requestOtp(dto) {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
        let user = await this.prisma.user.findFirst({
            where: { OR: [{ phone: dto.phone }, { email: dto.email }] },
        });
        if (user) {
            user = await this.prisma.user.update({
                where: { id: user.id },
                data: { otpCode: otp, otpExpiresAt: expiresAt },
            });
        }
        else if (dto.email && dto.name) {
            user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    name: dto.name,
                    phone: dto.phone,
                    otpCode: otp,
                    otpExpiresAt: expiresAt,
                    role: 'BUYER',
                },
            });
        }
        else {
            throw new common_1.BadRequestException('Email and name required for new users');
        }
        return { message: 'OTP sent successfully', otp: process.env.NODE_ENV === 'development' ? otp : undefined };
    }
    async verifyOtp(dto) {
        const user = await this.prisma.user.findFirst({
            where: { phone: dto.phone },
        });
        if (!user || user.otpCode !== dto.otp) {
            throw new common_1.UnauthorizedException('Invalid OTP');
        }
        if (user.otpExpiresAt && user.otpExpiresAt < new Date()) {
            throw new common_1.UnauthorizedException('OTP expired');
        }
        const updated = await this.prisma.user.update({
            where: { id: user.id },
            data: { otpCode: null, otpExpiresAt: null, phoneVerified: true },
        });
        const { passwordHash, otpCode, ...safeUser } = updated;
        return { user: safeUser, token: this.generateToken(safeUser) };
    }
    async getProfile(userId) {
        const user = await this.prisma.user.findUnique({
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
        if (!user)
            throw new common_1.UnauthorizedException();
        return user;
    }
    generateToken(user) {
        return this.jwtService.sign({ sub: user.id, email: user.email, role: user.role });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map