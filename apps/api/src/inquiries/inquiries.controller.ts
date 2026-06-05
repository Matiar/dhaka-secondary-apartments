import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { InquiriesService } from './inquiries.service';
import { ContactInquiryDto } from '../apartments/dto/apartment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('inquiries')
@Controller('inquiries')
export class InquiriesController {
  constructor(private inquiriesService: InquiriesService) {}

  @Post('contact')
  createContact(@Body() dto: ContactInquiryDto) {
    return this.inquiriesService.createContact(dto);
  }

  @Get('visits')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  findVisitRequests(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.inquiriesService.findAllVisitRequests(page, limit);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.inquiriesService.findAllInquiries(page, limit);
  }

  @Patch('visits/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  updateVisitStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.inquiriesService.updateVisitStatus(id, status);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.inquiriesService.updateInquiryStatus(id, status);
  }
}
