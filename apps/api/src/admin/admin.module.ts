import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController, ContentController } from './admin.controller';

@Module({
  controllers: [AdminController, ContentController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
