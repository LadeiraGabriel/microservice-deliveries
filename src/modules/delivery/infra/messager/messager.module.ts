import { AddOrderToDeliveryUseCase } from '@modules/delivery/application/useCases/add-order-to-delivery-use-case/add-order-to-delivery.use-case';
import { DeliveryRespositoryInterface } from '@modules/delivery/application/repositories/delivery.repository';
import { DatabaseModule } from '@shared/infra/database/database.module';
import { DeliveryController } from './controllers/delivery.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [DatabaseModule],
  controllers: [DeliveryController],
  providers: [
    {
      provide: AddOrderToDeliveryUseCase,
      useFactory: (deliveryRespository: DeliveryRespositoryInterface) => {
        return new AddOrderToDeliveryUseCase(deliveryRespository);
      },
      inject: [DeliveryRespositoryInterface],
    },
  ],
})
export class MessagerModule {}
