import { IsOptional, IsString, IsInt, IsBoolean, Min, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ApartmentFilterDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  area?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  minPrice?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  maxPrice?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  bedrooms?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  minSize?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  maxSize?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  parking?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  furnished?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  lift?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  featured?: boolean;

  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ default: 12 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 12;
}

export class CreateApartmentDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @Type(() => Number)
  @IsInt()
  price: number;

  @IsString()
  locationId: string;

  @IsString()
  address: string;

  @Type(() => Number)
  latitude: number;

  @Type(() => Number)
  longitude: number;

  @Type(() => Number)
  @IsInt()
  bedrooms: number;

  @Type(() => Number)
  @IsInt()
  bathrooms: number;

  @Type(() => Number)
  @IsInt()
  sizeSqft: number;

  @Type(() => Number)
  @IsInt()
  floor: number;

  @IsOptional()
  @Type(() => Number)
  totalFloors?: number;

  @IsOptional()
  @Type(() => Number)
  buildingAge?: number;

  @IsOptional()
  @IsBoolean()
  parking?: boolean;

  @IsOptional()
  @IsBoolean()
  furnished?: boolean;

  @IsOptional()
  @IsBoolean()
  lift?: boolean;

  @IsOptional()
  @IsString()
  ownershipType?: string;

  @IsOptional()
  @IsString()
  buildingName?: string;

  @IsOptional()
  @IsString()
  buildingInfo?: string;

  @IsOptional()
  @IsString()
  floorDetails?: string;

  @IsOptional()
  @IsString()
  ownershipDetails?: string;

  @IsOptional()
  nearbyLandmarks?: unknown;

  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @IsOptional()
  features?: string[];

  @IsOptional()
  imageUrls?: string[];
}

export class UpdateApartmentDto extends CreateApartmentDto {
  @IsOptional()
  @IsEnum(['DRAFT', 'ACTIVE', 'SOLD', 'ARCHIVED'])
  status?: string;
}

export class VisitRequestDto {
  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  preferredDate?: string;
}

export class ContactInquiryDto {
  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsString()
  apartmentId?: string;
}
