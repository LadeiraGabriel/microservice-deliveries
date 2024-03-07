import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/shared/infra/database/database.module';
import { HttpDeliveryController } from './controllers/http-delivery.controller';
import { ProvidersModule } from 'src/shared/infra/providers/providers.module';
import { StartDeliveryUseCase } from '../../application/useCases/start-delivery.use-case';
import { FinalizeDeliveryUseCase } from '../../application/useCases/finalize-delivery.use-case';
import { DeliveryRespositoryInterface } from '../../application/repositories/delivery.repository';
import { OrderProvider } from '../../application/providers/order-provider';
import { ListDeliveryByStatusUseCase } from '../../application/useCases/list-delivery-by-status.use-case';

@Module({
  imports: [DatabaseModule, ProvidersModule],
  controllers: [HttpDeliveryController],

  providers: [
    {
      provide: ListDeliveryByStatusUseCase,
      useFactory: (deliveryRepository: DeliveryRespositoryInterface) => {
        return new ListDeliveryByStatusUseCase(deliveryRepository);
      },
      inject: [DeliveryRespositoryInterface],
    },

    {
      provide: StartDeliveryUseCase,
      useFactory: (
        deliveryRepository: DeliveryRespositoryInterface,
        orderProvider: OrderProvider,
      ) => {
        return new StartDeliveryUseCase(deliveryRepository, orderProvider);
      },
      inject: [DeliveryRespositoryInterface, OrderProvider],
    },

    {
      provide: FinalizeDeliveryUseCase,
      useFactory: (
        deliveryRepository: DeliveryRespositoryInterface,
        orderProvider: OrderProvider,
      ) => {
        return new FinalizeDeliveryUseCase(deliveryRepository, orderProvider);
      },
      inject: [DeliveryRespositoryInterface, OrderProvider],
    },
  ],
})
export class HttpDeliveryModule {}
