import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ValuationsService } from './valuations.service';
import { CreateValuationDto } from './dto/valuation.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('valuations')
@Controller('valuations')
export class ValuationsController {
  constructor(private valuationsService: ValuationsService) {}

  @Post()
  create(@Body() dto: CreateValuationDto) {
    return this.valuationsService.create(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('status') status?: string,
  ) {
    return this.valuationsService.findAll(page, limit, status);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.valuationsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
    @Body('adminNotes') adminNotes?: string,
  ) {
    return this.valuationsService.updateStatus(id, status, adminNotes);
  }
}
