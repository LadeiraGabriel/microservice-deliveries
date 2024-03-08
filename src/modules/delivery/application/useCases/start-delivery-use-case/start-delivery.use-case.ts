import { Either, failure, success } from 'src/shared/core/errors/either';
import { DeliveryRespositoryInterface } from '../../repositories/delivery.repository';
import { OrderProvider } from '../../providers/order-provider';
import { ResourceNotFoundError } from 'src/shared/core/errors/generics/resource-not-found.error';
import { ResourceConflictError } from 'src/shared/core/errors/generics/resource-conflict.error';
import { UnableSendOrderError } from './start-delivery.error';

type deliveryData = {
  deliveryId: string;
};

type Response = Either<ResourceNotFoundError | ResourceConflictError, null>;
export class StartDeliveryUseCase {
  constructor(
    private deliveryRepository: DeliveryRespositoryInterface,
    private orderProvider: OrderProvider,
  ) {}
  async execute({ deliveryId }: deliveryData): Promise<Response> {
    const delivery = await this.deliveryRepository.findById(deliveryId);
    if (!delivery)
      return failure(new ResourceNotFoundError('delivery not found'));

    if (delivery.startAt)
      return failure(new ResourceConflictError('delivery already started'));

    delivery.startAt = new Date();
    const sendToOrder =
      await this.orderProvider.sendToOrderThatDeliveryHasStarted({
        orderId: delivery.orderId,
      });
    if (!sendToOrder) return failure(new UnableSendOrderError());
    await this.deliveryRepository.save(delivery);

    return success(null);
  }
}
