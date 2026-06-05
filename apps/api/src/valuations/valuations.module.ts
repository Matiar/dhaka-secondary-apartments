import { Module } from '@nestjs/common';
import { ValuationsService } from './valuations.service';
import { ValuationsController } from './valuations.controller';

@Module({
  controllers: [ValuationsController],
  providers: [ValuationsService],
  exports: [ValuationsService],
})
export class ValuationsModule {}
