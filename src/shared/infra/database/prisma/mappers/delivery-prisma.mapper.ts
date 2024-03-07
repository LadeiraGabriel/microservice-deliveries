import { Delivery } from 'src/modules/delivery/application/entities/delivery.entity';
import { Delivery as RawDelivery } from '@prisma/client';

export class DeliveryPrismaMapper {
  static toPrisma(delivery: Delivery) {
    return {
      id: delivery.id,
      order_id: delivery.orderId,
      user_id: delivery.userId,
      product_id: delivery.productId,
      quantity_product: delivery.quantityProduct,
      district: delivery.district,
      street: delivery.street,
      house_number: delivery.hourseNumber,
      reference: delivery.reference,
      created_at: delivery.createdAt,
      start_at: delivery.startAt,
      end_at: delivery.endAt,
    };
  }

  static toDomain(rawDelivery: RawDelivery) {
    return new Delivery(
      {
        orderId: rawDelivery.order_id,
        userId: rawDelivery.user_id,
        productId: rawDelivery.product_id,
        quantityProduct: rawDelivery.quantity_product,
        district: rawDelivery.district,
        street: rawDelivery.street,
        hourseNumber: rawDelivery.house_number,
        reference: rawDelivery.reference,
        createdAt: rawDelivery.created_at,
        startAt: rawDelivery.start_at,
        endAt: rawDelivery.end_at,
      },
      rawDelivery.id,
    );
  }
}
