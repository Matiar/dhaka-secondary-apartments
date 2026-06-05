import { InquiriesService } from './inquiries.service';
import { ContactInquiryDto } from '../apartments/dto/apartment.dto';
export declare class InquiriesController {
    private inquiriesService;
    constructor(inquiriesService: InquiriesService);
    createContact(dto: ContactInquiryDto): Promise<{
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
    }>;
    findVisitRequests(page?: number, limit?: number): Promise<{
        data: ({
            user: {
                email: string;
                name: string;
            } | null;
            apartment: {
                title: string;
                slug: string;
            };
        } & {
            email: string | null;
            name: string;
            phone: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("@prisma/client").$Enums.InquiryStatus;
            message: string | null;
            preferredDate: Date | null;
            apartmentId: string;
            userId: string | null;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
        };
    }>;
    findAll(page?: number, limit?: number): Promise<{
        data: ({
            apartment: {
                title: string;
                slug: string;
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
        meta: {
            total: number;
            page: number;
            limit: number;
        };
    }>;
    updateVisitStatus(id: string, status: string): Promise<{
        email: string | null;
        name: string;
        phone: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.InquiryStatus;
        message: string | null;
        preferredDate: Date | null;
        apartmentId: string;
        userId: string | null;
    }>;
    updateStatus(id: string, status: string): Promise<{
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
    }>;
}
