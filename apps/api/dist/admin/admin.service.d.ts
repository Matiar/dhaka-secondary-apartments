import { PrismaService } from '../prisma/prisma.service';
export declare class AdminService {
    private prisma;
    constructor(prisma: PrismaService);
    getDashboardStats(): Promise<{
        stats: {
            totalApartments: number;
            activeApartments: number;
            soldApartments: number;
            totalInquiries: number;
            totalVisits: number;
            totalValuations: number;
            newValuations: number;
        };
        mostViewed: {
            id: string;
            title: string;
            price: number;
            slug: string;
            viewCount: number;
        }[];
        recentInquiries: ({
            apartment: {
                title: string;
            } | null;
        } & {
            email: string | null;
            name: string;
            phone: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            type: import("@prisma/client").$Enums.InquiryType;
            status: import("@prisma/client").$Enums.InquiryStatus;
            message: string | null;
            apartmentId: string | null;
            userId: string | null;
        })[];
        viewsLast30Days: number;
    }>;
    getAllApartments(page?: number, limit?: number): Promise<{
        data: ({
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
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
        };
    }>;
    getUsers(page?: number, limit?: number): Promise<{
        data: {
            email: string;
            name: string;
            phone: string | null;
            id: string;
            role: import("@prisma/client").$Enums.UserRole;
            createdAt: Date;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
        };
    }>;
    getTestimonials(): Promise<{
        name: string;
        id: string;
        role: string | null;
        createdAt: Date;
        sortOrder: number;
        content: string;
        rating: number;
        avatarUrl: string | null;
        active: boolean;
    }[]>;
    getFaqs(): Promise<{
        id: string;
        createdAt: Date;
        sortOrder: number;
        active: boolean;
        question: string;
        answer: string;
    }[]>;
    getPublicContent(): Promise<{
        testimonials: {
            name: string;
            id: string;
            role: string | null;
            createdAt: Date;
            sortOrder: number;
            content: string;
            rating: number;
            avatarUrl: string | null;
            active: boolean;
        }[];
        faqs: {
            id: string;
            createdAt: Date;
            sortOrder: number;
            active: boolean;
            question: string;
            answer: string;
        }[];
        locations: {
            name: string;
            id: string;
            createdAt: Date;
            featured: boolean;
            latitude: number | null;
            longitude: number | null;
            slug: string;
            sortOrder: number;
            city: string;
        }[];
    }>;
}
