import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ApartmentsModule } from './apartments/apartments.module';
import { InquiriesModule } from './inquiries/inquiries.module';
import { ValuationsModule } from './valuations/valuations.module';
import { AdminModule } from './admin/admin.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [join(__dirname, '../../../.env'), '.env'],
    }),
    PrismaModule,
    AuthModule,
    ApartmentsModule,
    InquiriesModule,
    ValuationsModule,
    AdminModule,
    UploadModule,
  ],
})
export class AppModule {}
