import { Delivery } from '../entities/delivery.entity';

export abstract class DeliveryRespositoryInterface {
  abstract create(delivery: Delivery): Promise<void>;
  abstract save(delivery: Delivery): Promise<void>;
  abstract findById(id: string): Promise<Delivery | undefined>;
  abstract findByOrderId(orderId: string): Promise<Delivery | undefined>;
  abstract findAll(): Promise<Delivery[] | undefined>;
}
