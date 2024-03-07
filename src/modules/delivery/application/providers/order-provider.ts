type OrderData = {
  orderId: string;
};

export abstract class OrderProvider {
  abstract sendToOrderThatDeliveryHasStarted(
    orderData: OrderData,
  ): Promise<void>;
  abstract sendToOrderThatDeliveryHasBeenCompleted(
    orderData: OrderData,
  ): Promise<void>;
}
