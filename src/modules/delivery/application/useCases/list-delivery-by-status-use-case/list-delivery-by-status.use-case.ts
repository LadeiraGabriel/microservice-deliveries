import { Either, success } from 'src/shared/core/errors/either';
import { DeliveryRespositoryInterface } from '../../repositories/delivery.repository';
import { Delivery } from '../../entities/delivery.entity';

type DeliverysData = {
  status: 'pending' | 'active' | 'finish';
};

type Response = Either<null, Delivery[]>;

export class ListDeliveryByStatusUseCase {
  constructor(private deliveryRepository: DeliveryRespositoryInterface) {}
  async execute(deliveryData: DeliverysData): Promise<Response> {
    const { status } = deliveryData;
    const deliveries = await this.deliveryRepository.findAll();
    let deliveriesByStatus: Delivery[] = [];
    if (status === 'pending') {
      deliveriesByStatus = deliveries.filter((delivery) => !delivery.startAt);
    }

    if (status === 'active') {
      deliveriesByStatus = deliveries.filter(
        (delivery) => delivery.startAt && !delivery.endAt,
      );
    }

    if (status === 'finish') {
      deliveriesByStatus = deliveries.filter((delivery) => delivery.endAt);
    }

    return success(deliveriesByStatus);
  }
}
