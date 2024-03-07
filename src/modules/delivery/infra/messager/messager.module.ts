import { Module } from '@nestjs/common';
import { DeliveryRespositoryInterface } from 'src/modules/delivery/application/repositories/delivery.repository';
import { DatabaseModule } from '../../../../shared/infra/database/database.module';
import { AddOrderToDeliveryUseCase } from 'src/modules/delivery/application/useCases/add-order-to-delivery.use-case';
import { DeliveryController } from './controllers/delivery.controller';

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
