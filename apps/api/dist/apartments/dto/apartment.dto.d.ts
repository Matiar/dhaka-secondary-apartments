export declare class ApartmentFilterDto {
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
export declare class CreateApartmentDto {
    title: string;
    description: string;
    price: number;
    locationId: string;
    address: string;
    latitude: number;
    longitude: number;
    bedrooms: number;
    bathrooms: number;
    sizeSqft: number;
    floor: number;
    totalFloors?: number;
    buildingAge?: number;
    parking?: boolean;
    furnished?: boolean;
    lift?: boolean;
    ownershipType?: string;
    buildingName?: string;
    buildingInfo?: string;
    floorDetails?: string;
    ownershipDetails?: string;
    nearbyLandmarks?: unknown;
    featured?: boolean;
    features?: string[];
    imageUrls?: string[];
}
export declare class UpdateApartmentDto extends CreateApartmentDto {
    status?: string;
}
export declare class VisitRequestDto {
    name: string;
    phone: string;
    email?: string;
    message?: string;
    preferredDate?: string;
}
export declare class ContactInquiryDto {
    name: string;
    phone: string;
    email?: string;
    message?: string;
    apartmentId?: string;
}
