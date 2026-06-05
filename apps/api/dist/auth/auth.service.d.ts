import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto, LoginDto, OtpRequestDto, OtpVerifyDto } from './dto/auth.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(dto: RegisterDto): Promise<{
        user: {
            email: string;
            name: string;
            phone: string | null;
            id: string;
            role: import("@prisma/client").$Enums.UserRole;
        };
        token: string;
    }>;
    login(dto: LoginDto): Promise<{
        user: {
            email: string;
            name: string;
            phone: string | null;
            id: string;
            role: import("@prisma/client").$Enums.UserRole;
            emailVerified: boolean;
            phoneVerified: boolean;
            otpExpiresAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
        };
        token: string;
    }>;
    requestOtp(dto: OtpRequestDto): Promise<{
        message: string;
        otp: string | undefined;
    }>;
    verifyOtp(dto: OtpVerifyDto): Promise<{
        user: {
            email: string;
            name: string;
            phone: string | null;
            id: string;
            role: import("@prisma/client").$Enums.UserRole;
            emailVerified: boolean;
            phoneVerified: boolean;
            otpExpiresAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
        };
        token: string;
    }>;
    getProfile(userId: string): Promise<{
        email: string;
        name: string;
        phone: string | null;
        id: string;
        role: import("@prisma/client").$Enums.UserRole;
        createdAt: Date;
        savedApartments: ({
            apartment: {
                location: {
                    name: string;
                    id: string;
                    createdAt: Date;
                    featured: boolean;
                    latitude: number | null;
                    longitude: number | null;
                    slug: string;
                    sortOrder: number;
                    city: string;
                };
                images: {
                    id: string;
                    createdAt: Date;
                    isPrimary: boolean;
                    apartmentId: string;
                    sortOrder: number;
                    url: string;
                    alt: string | null;
                }[];
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                area: string;
                bedrooms: number;
                parking: boolean;
                furnished: boolean;
                lift: boolean;
                featured: boolean;
                description: string;
                title: string;
                price: number;
                locationId: string;
                address: string;
                latitude: number;
                longitude: number;
                bathrooms: number;
                sizeSqft: number;
                floor: number;
                totalFloors: number | null;
                buildingAge: number | null;
                ownershipType: string | null;
                buildingName: string | null;
                buildingInfo: string | null;
                floorDetails: string | null;
                ownershipDetails: string | null;
                nearbyLandmarks: import("@prisma/client/runtime/library").JsonValue | null;
                status: import("@prisma/client").$Enums.ApartmentStatus;
                slug: string;
                verified: boolean;
                viewCount: number;
                metaTitle: string | null;
                metaDescription: string | null;
                publishedAt: Date | null;
                soldAt: Date | null;
            };
        } & {
            id: string;
            createdAt: Date;
            apartmentId: string;
            userId: string;
        })[];
    }>;
    private generateToken;
}
