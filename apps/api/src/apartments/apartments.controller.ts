import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ApartmentsService } from './apartments.service';
import {
  ApartmentFilterDto,
  CreateApartmentDto,
  UpdateApartmentDto,
  VisitRequestDto,
} from './dto/apartment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { InquiriesService } from '../inquiries/inquiries.service';

@ApiTags('apartments')
@Controller('apartments')
export class ApartmentsController {
  constructor(
    private apartmentsService: ApartmentsService,
    private inquiriesService: InquiriesService,
  ) {}

  @Get()
  findAll(@Query() filters: ApartmentFilterDto) {
    return this.apartmentsService.findAll(filters);
  }

  @Get('featured')
  findFeatured() {
    return this.apartmentsService.findFeatured();
  }

  @Get('recent')
  findRecent() {
    return this.apartmentsService.findRecent();
  }

  @Get('locations')
  getLocations() {
    return this.apartmentsService.getLocations();
  }

  @Get(':slug')
  async findBySlug(@Param('slug') slug: string) {
    const apartment = await this.apartmentsService.findBySlug(slug);
    const similar = await this.apartmentsService.findSimilar(
      apartment.id,
      apartment.locationId,
      apartment.bedrooms,
    );
    return { ...apartment, similar };
  }

  @Post(':id/visit')
  createVisitRequest(
    @Param('id') id: string,
    @Body() dto: VisitRequestDto,
    @CurrentUser() user?: { id: string },
  ) {
    return this.inquiriesService.createVisitRequest(id, dto, user?.id);
  }

  @Post(':id/save')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  toggleSave(@Param('id') id: string, @CurrentUser() user: { id: string }) {
    return this.apartmentsService.toggleSave(user.id, id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  create(@Body() dto: CreateApartmentDto) {
    return this.apartmentsService.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() dto: UpdateApartmentDto) {
    return this.apartmentsService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.apartmentsService.remove(id);
  }
}
