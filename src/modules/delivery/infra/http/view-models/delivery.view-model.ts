import { Delivery } from 'src/modules/delivery/application/entities/delivery.entity';

export class DeliveryViewModel {
  static toHttp(delivery: Delivery) {
    return {
      id: delivery.id,
      orderId: delivery.orderId,
      userId: delivery.userId,
      productId: delivery.productId,
      quantityProduct: delivery.quantityProduct,
      address: {
        district: delivery.district,
        street: delivery.street,
        hourseNumber: delivery.hourseNumber,
        reference: delivery.reference,
      },
      createdAt: delivery.createdAt,
      startAt: delivery.startAt,
      endAt: delivery.endAt,
    };
  }
}
