import { Either, failure, success } from 'src/shared/core/errors/either';
import { DeliveryRespositoryInterface } from '../../repositories/delivery.repository';
import { OrderProvider } from '../../providers/order-provider';
import { ResourceNotFoundError } from 'src/shared/core/errors/generics/resource-not-found.error';
import { ResourceConflictError } from 'src/shared/core/errors/generics/resource-conflict.error';
import { UnableSendOrderError } from './finalize-delivery.error';

type deliveryData = {
  deliveryId: string;
};

type Response = Either<ResourceNotFoundError | ResourceConflictError, null>;
export class FinalizeDeliveryUseCase {
  constructor(
    private deliveryRepository: DeliveryRespositoryInterface,
    private orderProvider: OrderProvider,
  ) {}
  async execute({ deliveryId }: deliveryData): Promise<Response> {
    const delivery = await this.deliveryRepository.findById(deliveryId);
    if (!delivery)
      return failure(new ResourceNotFoundError('delivery not found'));

    if (!delivery.startAt || delivery.endAt)
      return failure(
        new ResourceConflictError(
          'delivery has not started or already finished',
        ),
      );

    delivery.endAt = new Date();
    const sendToOrder =
      await this.orderProvider.sendToOrderThatDeliveryHasBeenCompleted({
        orderId: delivery.orderId,
      });
    if (!sendToOrder) return failure(new UnableSendOrderError());
    await this.deliveryRepository.save(delivery);

    return success(null);
  }
}
