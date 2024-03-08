import { AddOrderToDeliveryUseCase } from '@modules/delivery/application/useCases/add-order-to-delivery-use-case/add-order-to-delivery.use-case';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';

@Controller()
export class DeliveryController {
  constructor(
    private addOrderToDeliveryListUseCase: AddOrderToDeliveryUseCase,
  ) {}
  @MessagePattern('send_order')
  async addOrderInDelivery(@Payload() orderPayload) {
    await this.addOrderToDeliveryListUseCase.execute(orderPayload);
  }
}
