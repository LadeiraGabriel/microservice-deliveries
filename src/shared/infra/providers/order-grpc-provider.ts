import { Metadata } from '@grpc/grpc-js';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable, lastValueFrom } from 'rxjs';
import { OrderProvider } from 'src/modules/delivery/application/providers/order-provider';

interface OrderGrpcClient {
  SaveOnTheWayStatus(
    data: { orderId: string },
    metadata?: Metadata,
  ): Observable<any>;

  SaveFinishStatus(
    data: { orderId: string },
    metadata?: Metadata,
  ): Observable<any>;
}

type OrderData = {
  orderId: string;
};

@Injectable()
export class OrderGrpcProvider implements OnModuleInit, OrderProvider {
  constructor(@Inject('ORDERS_PACKAGE') private client: ClientGrpc) {}
  private orderGrpcClient: OrderGrpcClient;
  async onModuleInit() {
    this.orderGrpcClient = this.client.getService('OrderService');
  }

  async sendToOrderThatDeliveryHasStarted(
    orderData: OrderData,
  ): Promise<boolean> {
    const metadata = new Metadata();
    try {
      await lastValueFrom(
        this.orderGrpcClient.SaveOnTheWayStatus(orderData, metadata),
      );
      return true;
    } catch (error) {
      return false;
    }
  }
  async sendToOrderThatDeliveryHasBeenCompleted(
    orderData: OrderData,
  ): Promise<boolean> {
    const metadata = new Metadata();
    try {
      await lastValueFrom(
        this.orderGrpcClient.SaveFinishStatus(orderData, metadata),
      );
      return true;
    } catch (error) {
      return false;
    }
  }
}
