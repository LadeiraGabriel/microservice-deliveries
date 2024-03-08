import { DeliveryRespositoryInterface } from '@modules/delivery/application/repositories/delivery.repository';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { DeliveryPrismaRepository } from './prisma/repositories/delivery-prisma.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: DeliveryRespositoryInterface,
      useClass: DeliveryPrismaRepository,
    },
  ],
  exports: [DeliveryRespositoryInterface],
})
export class DatabaseModule {}
