import { Either, success } from 'src/shared/core/errors/either';
import { Delivery } from '../../entities/delivery.entity';
import { DeliveryRespositoryInterface } from '../../repositories/delivery.repository';

export type AddressUserType = {
  district: string;
  street: string;
  houseNumber: number;
  reference: string | null;
};

type OrderData = {
  orderId: string;
  address: AddressUserType;
  productId: string;
  quantityProduct: number;
  userId: string;
};

type Response = Either<null, null>;

export class AddOrderToDeliveryUseCase {
  constructor(private deliveryRespository: DeliveryRespositoryInterface) {}
  async execute(orderData: OrderData): Promise<Response> {
    const { orderId, address, productId, quantityProduct, userId } = orderData;
    const delivery = new Delivery({
      orderId,
      district: address.district,
      street: address.street,
      hourseNumber: address.houseNumber,
      productId,
      quantityProduct,
      userId,
    });
    await this.deliveryRespository.create(delivery);
    return success(null);
  }
}
