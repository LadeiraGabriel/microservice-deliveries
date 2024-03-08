type OrderData = {
  orderId: string;
};

export abstract class OrderProvider {
  abstract sendToOrderThatDeliveryHasStarted(
    orderData: OrderData,
  ): Promise<boolean>;
  abstract sendToOrderThatDeliveryHasBeenCompleted(
    orderData: OrderData,
  ): Promise<boolean>;
}
