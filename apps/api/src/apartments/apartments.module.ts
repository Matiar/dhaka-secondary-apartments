import { Module, forwardRef } from '@nestjs/common';
import { ApartmentsService } from './apartments.service';
import { ApartmentsController } from './apartments.controller';
import { InquiriesModule } from '../inquiries/inquiries.module';

@Module({
  imports: [forwardRef(() => InquiriesModule)],
  controllers: [ApartmentsController],
  providers: [ApartmentsService],
  exports: [ApartmentsService],
})
export class ApartmentsModule {}
